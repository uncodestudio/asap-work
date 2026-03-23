// modules/searchModal.js
import { log, warn, ready } from './utils.js'

export function init() {
  ready(() => {
    log('🔍 Initialisation Search Modal')

    const modal = document.querySelector('.blog_search-modal-wrapper')
    const triggers = document.querySelectorAll('[data-modal="open"]')

    if (!modal) {
      warn('⚠️ .blog_search-modal-wrapper introuvable')
      return
    }

    if (!triggers.length) {
      warn('⚠️ Aucun [data-modal="open"] trouvé')
      return
    }

    // Ouvrir
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        modal.style.display = 'flex'
        log('✅ Modal ouverte')
      })
    })

    // Fermer en cliquant sur le fond (pas sur le contenu enfant)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none'
        log('✅ Modal fermée')
      }
    })

    log('✅ Search Modal initialisée')
  })
}
