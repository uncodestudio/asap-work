// modules/searchQueryDisplay.js
import { log, warn, ready } from './utils.js'

export function init() {
  ready(() => {
    log('🔎 Initialisation Search Query Display')

    const params = new URLSearchParams(window.location.search)
    const query = params.get('*_contain')

    if (!query) {
      warn('⚠️ Pas de query *_contain dans l\'URL')
      return
    }

    const decoded = decodeURIComponent(query)
    log('🔎 Query trouvée:', decoded)

    const targets = document.querySelectorAll('[data-search-query]')

    if (!targets.length) {
      warn('⚠️ Aucun élément [data-search-query] trouvé')
      return
    }

    targets.forEach(el => {
      el.textContent = decoded
    })

    log('✅ Query injectée dans ' + targets.length + ' élément(s)')
  })
}
