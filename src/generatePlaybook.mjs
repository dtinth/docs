import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { uiBundleFileName } from './ui.mjs'
const packageDir = dirname(dirname(fileURLToPath(import.meta.url)))

/**
 * @param {object} options
 * @param {any[]} options.source
 * @param {boolean} [options.production]
 */
export function generatePlaybook(options) {
  return {
    site: {
      title: 'docs.dt.in.th',
      robots: 'allow',
      ...(options.production
        ? {
            start_page: 'home::index.adoc',
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
