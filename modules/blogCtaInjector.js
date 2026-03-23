// modules/blogCtaInjector.js
import { log, warn, ready } from './utils.js'

const CTA_SELECTOR = '.all_article-cta'
const LIST_SELECTOR = '.all-article_list'
const ITEM_SELECTOR = '.w-dyn-item'

function insertCTA() {
  const cta = document.querySelector(CTA_SELECTOR)
  if (!cta) {
    warn('⚠️ CTA introuvable (' + CTA_SELECTOR + ')')
    return
  }

  const list = document.querySelector(LIST_SELECTOR)
  if (!list) {
    warn('⚠️ Collection list introuvable (' + LIST_SELECTOR + ')')
    return
  }

  // Retirer le CTA de sa position actuelle
  if (cta.parentNode) {
    cta.parentNode.removeChild(cta)
  }

  // Récupérer uniquement les items visibles (Finsweet cache les autres via display:none)
  const items = Array.from(list.querySelectorAll(ITEM_SELECTOR))
    .filter(el => el.style.display !== 'none')

  log('📋 ' + items.length + ' articles visibles')

  if (!items.length) return

  // Insérer avant le 5ème item (position 5), ou après le dernier si moins de 5
  if (items[4]) {
    items[4].before(cta)
  } else {
    items[items.length - 1].after(cta)
  }
  cta.style.display = 'block'

  log('✅ CTA inséré en position 5')
}

export function init() {
  ready(() => {
    log('📰 Initialisation Blog CTA Injector')

    // Injection initiale
    insertCTA()

    // MutationObserver sur la liste pour détecter les changements de page Finsweet
    const list = document.querySelector(LIST_SELECTOR)
    if (!list) return

    let observerTimeout
    const observer = new MutationObserver((_, obs) => {
      obs.disconnect()
      clearTimeout(observerTimeout)
      observerTimeout = setTimeout(() => {
        insertCTA()
        log('🔄 DOM changé — réinjection CTA')
        obs.observe(list, { childList: true, subtree: true })
      }, 0)
    })

    observer.observe(list, { childList: true, subtree: true })

    log('✅ Blog CTA Injector initialisé')
  })
}
