// Module Masonry - Layout Pinterest avec ordre HTML respecté
// Utilise Masonry.js pour un vrai effet masonry

export function init() {
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  const log = isDev ? console.log : () => {}
  const warn = isDev ? console.warn : () => {}

  log('🧱 Masonry - Initialisation')

  // Vérifier que Masonry est chargé
  if (typeof Masonry === 'undefined') {
    warn('❌ Masonry.js manquant - Module désactivé')
    warn('💡 Ajoute dans Webflow Custom Code: <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>')
    return
  }

  // Trouver tous les grids masonry
  const grids = document.querySelectorAll('[data-masonry]')

  if (!grids.length) {
    warn('❌ Aucun [data-masonry] trouvé')
    return
  }

  log(`✅ ${grids.length} grid(s) masonry détecté(s)`)

  grids.forEach((grid, index) => {
    // Désactiver sur mobile si l'option est activée
    const disableMobile = grid.getAttribute('data-masonry-disable-mobile') === 'true'
    
    if (disableMobile && window.innerWidth < 768) {
      log(`📱 Grid ${index + 1} : Masonry désactivé sur mobile`)
      return
    }

    // Options personnalisables via data-attributes
    const itemSelector = grid.getAttribute('data-masonry-item') || '.masonry-item'
    const columnWidth = parseInt(grid.getAttribute('data-masonry-column-width')) || null
    const gutter = parseInt(grid.getAttribute('data-masonry-gutter')) || 20
    const fitWidth = grid.getAttribute('data-masonry-fit-width') === 'true'
    const percentPosition = grid.getAttribute('data-masonry-percent') === 'true'

    log(`🔧 Grid ${index + 1} config:`, {
      itemSelector,
      columnWidth,
      gutter,
      fitWidth,
      percentPosition
    })

    // Vérifier qu'il y a des items
    const items = grid.querySelectorAll(itemSelector)
    if (!items.length) {
      warn(`❌ Grid ${index + 1} : aucun item trouvé avec le sélecteur "${itemSelector}"`)
      return
    }

    log(`✅ Grid ${index + 1} : ${items.length} items trouvés`)

    // Configuration Masonry
    const masonryConfig = {
      itemSelector: itemSelector,
      gutter: gutter,
      percentPosition: percentPosition,
      transitionDuration: '0.3s'
    }

    // Ajouter columnWidth si spécifié
    if (columnWidth) {
      masonryConfig.columnWidth = columnWidth
    }

    // Centrer la grid si fitWidth
    if (fitWidth) {
      masonryConfig.fitWidth = true
      grid.style.margin = '0 auto'
    }

    // Initialiser Masonry
    const msnry = new Masonry(grid, masonryConfig)

    log(`✅ Grid ${index + 1} : Masonry initialisé`)

    // Attendre que les images soient chargées avant de relayout
    // (évite les overlaps)
    if (typeof imagesLoaded !== 'undefined') {
      imagesLoaded(grid, () => {
        msnry.layout()
        log(`✅ Grid ${index + 1} : Images chargées, layout mis à jour`)
      })
    } else {
      // Fallback : attendre un peu et relayout
      setTimeout(() => {
        msnry.layout()
        log(`✅ Grid ${index + 1} : Layout mis à jour (fallback)`)
      }, 500)
    }

    // Stocker l'instance pour cleanup
    grid._masonryInstance = msnry
    grid._masonryDisableMobile = disableMobile

    // Re-layout au resize (debounced)
    let resizeTimeout
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        // Si disable mobile activé, check la largeur
        if (disableMobile) {
          if (window.innerWidth < 768 && msnry) {
            // Destroy masonry sur mobile
            msnry.destroy()
            grid._masonryInstance = null
            log(`📱 Grid ${index + 1} : Masonry détruit (mobile)`)
          } else if (window.innerWidth >= 768 && !grid._masonryInstance) {
            // Recréer masonry au-dessus de mobile
            grid._masonryInstance = new Masonry(grid, masonryConfig)
            log(`💻 Grid ${index + 1} : Masonry réactivé (desktop/tablet)`)
          }
        }
        
        // Relayout si instance existe
        if (grid._masonryInstance) {
          grid._masonryInstance.layout()
          log(`🔄 Grid ${index + 1} : Layout mis à jour (resize)`)
        }
      }, 250)
    })
  })

  log('✅ Masonry initialisé avec succès')
}

// Fonction de nettoyage
export function cleanup() {
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  const log = isDev ? console.log : () => {}

  document.querySelectorAll('[data-masonry]').forEach(grid => {
    if (grid._masonryInstance) {
      grid._masonryInstance.destroy()
      log('🧹 Instance Masonry nettoyée')
    }
  })
}

// Fonction helper pour relayout (si besoin depuis l'extérieur)
export function relayout() {
  document.querySelectorAll('[data-masonry]').forEach(grid => {
    if (grid._masonryInstance) {
      grid._masonryInstance.layout()
    }
  })
}