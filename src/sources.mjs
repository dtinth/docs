import { dirname } from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'

const packageDir = dirname(dirname(fileURLToPath(import.meta.url)))

export const sources = [
  {
    url: packageDir,
    branches: 'HEAD',
    start_path: 'home',
  },
  {
    url: packageDir,
    branches: 'HEAD',
    start_path: 'docs',
  },
]

async function fetchDocumentationProjects() {
  const baseUrl = 'https://sheet.spacet.me'
  const sheetId = '1kFc9bDizrANULuVSUuHYiZENdPzXZpXvuUWlbZbF_uU'
  const sheetName = 'Docs'
  const endpoint = `${baseUrl}/${sheetId}/${sheetName}.json`
  const {
    data: { values },
  } = await axios.get(endpoint)
  const [header, ...rows] = values
  return rows.map((row) => {
    const entries = header.map((key, i) => [key, row[i]])
    return Object.fromEntries(entries)
  })
}

for (const p of await fetchDocumentationProjects()) {
  if (p.enabled === 'TRUE') {
    sources.push({
      url: p.url,
      branches: p.branches,
      start_path: 'docs',
    })
  }
}
