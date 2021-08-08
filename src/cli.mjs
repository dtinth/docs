#!/usr/bin/env node

import generateSite from '@antora/site-generator-default'
import chokidar from 'chokidar'
import express from 'express'
import { existsSync, writeFileSync } from 'fs'
import { dirname } from 'path'
import serveIndex from 'serve-index'
import { dirSync, setGracefulCleanup } from 'tmp'
import { fileURLToPath } from 'url'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { BuildTask } from './BuildTask.mjs'
import { uiBundleFileName } from './ui.mjs'
import mkdirp from 'mkdirp'

const packageDir = dirname(dirname(fileURLToPath(import.meta.url)))
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

/**
 * @param {object} options
 * @param {any[]} options.source
 * @param {boolean} [options.production]
 */
function generatePlaybook(options) {
  return {
    site: {
      title: 'docs.dt.in.th',
      robots: 'allow',
      ...(options.production
        ? {
            start_page: 'docs::index.adoc',
            url: 'https://docs.dt.in.th',
            keys: {
              google_analytics: 'UA-4343503-11',
            },
          }
        : {}),
    },
    content: {
      sources: options.source,
    },
    ui: {
      bundle: {
        url: `${packageDir}/${uiBundleFileName}`,
      },
    },
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
          'ERROR: `docs/antora.yml` not found. Run `dtinth-docs-dev init <name>` to generate it.',
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
            ].join('\n'),
          )
        }
        if (!existsSync('docs/modules/ROOT/pages/index.adoc')) {
          writeFileSync(
            'docs/modules/ROOT/pages/index.adoc',
            [`= ${argv.name}`].join('\n'),
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
    .parse()
}

main()
