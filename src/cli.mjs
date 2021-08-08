#!/usr/bin/env node

import generateSite from '@antora/site-generator-default'
import chokidar from 'chokidar'
import express from 'express'
import { writeFileSync } from 'fs'
import { dirname } from 'path'
import serveIndex from 'serve-index'
import { dirSync, setGracefulCleanup } from 'tmp'
import { fileURLToPath } from 'url'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { BuildTask } from './BuildTask.mjs'
import { uiBundleFileName } from './ui.mjs'

const packageDir = dirname(dirname(fileURLToPath(import.meta.url)))
const cwdDir = process.cwd()
setGracefulCleanup()

async function runBuild(playbookPath, outDir) {
  console.time('Build')
  try {
    await generateSite(['--playbook', playbookPath, '--to-dir', outDir], {})
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
      'build',
      'Build the documentation for all projects',
      {},
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
        if (!(await runBuild(playbookPath, outDir))) {
          process.exitCode = 1
        }
      },
    )
    .parse()
}

main()
