#!/usr/bin/env node

import express from 'express'
import chokidar from 'chokidar'
import execa from 'execa'
import {dirSync, setGracefulCleanup} from 'tmp'
import {writeFileSync} from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url'
import serveIndex from 'serve-index'  

setGracefulCleanup()

const tmpDir = dirSync()

let active

const docsDir = dirname(fileURLToPath(import.meta.url))
const cwdDir = process.cwd()

const playbookPath = tmpDir.name + '/antora-playbook.yml'
const outDir = tmpDir.name + '/build/site'

const app = express()

app.use(express.static(outDir))
app.use(serveIndex(outDir))
app.listen(9090, () => {
  console.log('http://localhost:9090/')
})

writeFileSync(playbookPath, `site:
  title: '@dtinth’s documentation site'
  # start_page: docs::index.adoc
  robots: allow
content:
  sources:
  - url: ${cwdDir}
    branches: HEAD
    start_path: docs
ui:
  bundle:
    url: ${docsDir}/ui-bundle-637d0a7.zip
`)

chokidar.watch('docs').on('all', (event, path) => {
  trigger()
});

function trigger () {
  if (!active) {
    const current = {
      needsBuildAgain: false,
      started: false,
      async build() {
        try {
          current.started = true
          await runBuild()
        } finally {
          active = null
          if (current.needsBuildAgain) {
            trigger()
          }
        }
      }
    }
    setTimeout(() => current.build(), 100)
    active = current
  } else if (active.started) {
    active.needsBuildAgain = true
  }
}

async function runBuild  () {
  console.time('Generate')
  await execa(
    './node_modules/.bin/antora',
    ['generate', '--to-dir', outDir, playbookPath],
    { reject: false, stdio: 'inherit', cwd: docsDir }
  )
  console.timeEnd('Generate')
}