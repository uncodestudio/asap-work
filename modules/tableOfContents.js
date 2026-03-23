// modules/tableOfContents.js
import { log, warn, ready } from './utils.js'

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function init() {
  ready(() => {
    log('📋 Initialisation Table of Contents')

    const content = document.querySelector('[data-toc="content"]')
    const list = document.querySelector('[data-toc="list"]')
    const linkTemplate = document.querySelector('[data-toc="link"]')

    if (!content || !list || !linkTemplate) {
      warn('⚠️ Éléments TOC manquants (content, list ou link)')
      return
    }

    // Cacher le template, il sert juste de modèle de style
    linkTemplate.style.display = 'none'

    const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6')

    if (!headings.length) {
      warn('⚠️ Aucun titre trouvé dans [data-toc="content"]')
      return
    }

    log('📋 ' + headings.length + ' titre(s) trouvé(s)')

    // Compteur pour éviter les doublons de slug
    const slugCount = {}

    headings.forEach(heading => {
      const text = heading.textContent.trim()
      let slug = slugify(text)

      // Dédoublonnage
      if (slugCount[slug] !== undefined) {
        slugCount[slug]++
        slug = slug + '-' + slugCount[slug]
      } else {
        slugCount[slug] = 0
      }

      // Injecter l'id sur le heading
      heading.id = slug

      // Cloner le template link
      const link = linkTemplate.cloneNode(true)
      link.textContent = text
      link.href = '#' + slug
      link.style.display = ''
      link.removeAttribute('data-toc')

      list.appendChild(link)

      log('✅ Lien créé : ' + text + ' → #' + slug)
    })

    log('✅ Table of Contents générée')
  })
}
