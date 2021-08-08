import { dirname } from 'path'
import { fileURLToPath } from 'url'

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
  {
    url: 'https://github.com/dtinth/dtinth.tools-android.git',
    branches: 'main',
    start_path: 'docs',
  },
  {
    url: 'https://github.com/dtinth/encrypted.git',
    branches: 'main',
    start_path: 'docs',
  },
]
