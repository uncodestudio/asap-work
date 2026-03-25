// modules/formationNav.js
import { log, ready } from './utils.js'

export function init() {
  ready(() => {
    log('🧭 Initialisation Formation Nav')

    const links = document.querySelectorAll('.formation-nav_link')

    if (!links.length) {
      log('⏭️ Aucun .formation-nav_link trouvé')
      return
    }

    function syncCurrent() {
      links.forEach(link => {
        const wrapper = link.querySelector('.formation-nav_wrapper')
        const isActive = link.classList.contains('w--current')

        if (wrapper) wrapper.classList.toggle('is-current', isActive)

        // Mobile : scroll horizontal de la nav vers le lien actif
        if (isActive) {
          link.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
          log('📍 Actif : ' + link.getAttribute('href'))
        }
      })
    }

    // Sync initiale
    syncCurrent()

    // Observer les changements de classe sur chaque lien (Webflow ajoute/retire w--current)
    const observer = new MutationObserver(syncCurrent)

    links.forEach(link => {
      observer.observe(link, { attributes: true, attributeFilter: ['class'] })
    })

    log('✅ Formation Nav initialisée')
  })
}
