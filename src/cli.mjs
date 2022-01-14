#!/usr/bin/env node

import generateSite from '@antora/site-generator'
import chokidar from 'chokidar'
import execa from 'execa'
import express from 'express'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import mkdirp from 'mkdirp'
import serveIndex from 'serve-index'
import { dirSync, setGracefulCleanup } from 'tmp'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { BuildTask } from './BuildTask.mjs'
import { generatePlaybook } from './generatePlaybook.mjs'

const cwdDir = process.cwd()
setGracefulCleanup()

async function runBuild(playbookPath, outDir, fetch = false) {
  console.time('Build')
  try {
    await generateSite(
      [
        '--playbook',
        playbookPath,
        '--to-dir',
        outDir,
        ...(fetch ? ['--fetch'] : []),
      ],
      process.env,
    )
    return true
  } catch (error) {
    console.error(error)
    return false
  } finally {
    console.timeEnd('Build')
  }
}

function main() {
  yargs(hideBin(process.argv))
    .demandCommand()
    .strict()
    .help()
    .command(['$0', 'dev'], 'Start a development server', {}, (argv) => {
      if (!existsSync('docs/antora.yml')) {
        console.error(
          'ERROR: `docs/antora.yml` not found. Run `dtinth-docs init <name>` to generate it.',
        )
        process.exit(1)
      }

      const tmpDir = dirSync()
      const playbookPath = tmpDir.name + '/antora-playbook.json'
      const outDir = tmpDir.name + '/build/site'
      console.log(
        'Generating documentation to temporary directory, %s',
        tmpDir.name,
      )

      const app = express()
      app.use(async (req, res, next) => {
        await rebuildTask.promise
        next()
      })
      app.use(express.static(outDir))
      app.use(serveIndex(outDir))
      app.listen(9090, () => {
        console.log('http://localhost:9090/')
      })

      const playbook = generatePlaybook({
        source: [
          {
            url: cwdDir,
            branches: 'HEAD',
            start_path: 'docs',
          },
        ],
      })
      writeFileSync(playbookPath, JSON.stringify(playbook, null, 2))

      const rebuildTask = new BuildTask(async () => {
        runBuild(playbookPath, outDir)
      })

      chokidar.watch('docs').on('all', (event, path) => {
        rebuildTask.trigger()
      })
    })
    .command(
      'init <name>',
      'Initializes Antora files',
      {
        name: {
          description: 'The name of the project',
        },
      },
      async (argv) => {
        mkdirp.sync('docs/modules/ROOT/pages')
        if (!existsSync('docs/antora.yml')) {
          writeFileSync(
            'docs/antora.yml',
            [
              `name: ${argv.name}`,
              `version: master`,
              `title: '${argv.name}'`,
              `nav:`,
              `  - modules/ROOT/nav.adoc`,
            ].join('\n'),
          )
        }
        if (!existsSync('docs/modules/ROOT/pages/index.adoc')) {
          writeFileSync(
            'docs/modules/ROOT/pages/index.adoc',
            [`= ${argv.name}`].join('\n'),
          )
        }
        if (!existsSync('docs/modules/ROOT/nav.adoc')) {
          writeFileSync(
            'docs/modules/ROOT/nav.adoc',
            [`* xref:index.adoc[]`].join('\n'),
          )
        }
      },
    )
    .command(
      'build',
      'Build the documentation for all projects',
      {
        fetch: {
          description: 'Whether to fetch the latest versions of all projects',
          type: 'boolean',
          default: false,
        },
      },
      async (argv) => {
        const tmpDir = dirSync()
        const playbookPath = tmpDir.name + '/antora-playbook.json'
        const outDir = process.cwd() + '/build/site'
        console.log('Playbook path: %s', playbookPath)
        console.log('Output directory: %s', outDir)

        const { sources } = await import('./sources.mjs')
        const playbook = generatePlaybook({
          source: sources,
          production: true,
        })
        console.log(JSON.stringify(playbook, null, 2))
        writeFileSync(playbookPath, JSON.stringify(playbook, null, 2))
        if (!(await runBuild(playbookPath, outDir, argv.fetch))) {
          process.exitCode = 1
        }
      },
    )
    .command(
      'link',
      'Generate a link to the documentation.',
      {},
      async (argv) => {
        const contents = readFileSync('docs/antora.yml', 'utf8')

        // XXX: Gonna parse YAML with a regexp for now
        const name = /name: (.*)/.exec(contents)[1] // thanks copilot

        const url = `https://docs.dt.in.th/${name}/index.html`
        const imageUrl = `https://ss.dt.in.th/api/screenshots/docs-${name}__index.png`
        console.log(
          `For more information, check out the [project documention page](${url}).`,
        )
        console.log(``)
        console.log(`[![Project documention page](${imageUrl})](${url})`)
      },
    )
    .command('deploy', 'Deploy the new site.', {}, async (argv) => {
      await execa(
        'gh',
        ['workflow', 'run', 'pages.yml', '--repo', 'dtinth/docs'],
        { stdio: 'inherit' },
      )
    })
    .parse()
}

main()
