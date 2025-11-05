// Module Card Scroll Activation
// Ajoute .is-active à la card qui passe le milieu du viewport
// Une seule card active à la fois

export function init() {
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  const log = isDev ? console.log : () => {}
  const warn = isDev ? console.warn : () => {}

  log('🎯 Card Scroll Activation - Initialisation')

  // Vérifier GSAP et ScrollTrigger
  if (typeof gsap === 'undefined') {
    warn('❌ GSAP manquant - Card Scroll désactivé')
    return
  }

  if (typeof ScrollTrigger === 'undefined') {
    warn('❌ ScrollTrigger manquant - Card Scroll désactivé')
    return
  }

  // Trouver toutes les cards
  const cards = document.querySelectorAll('.card-6_card-item')

  if (!cards.length) {
    warn('❌ Aucune .card-6_card-item trouvée')
    return
  }

  log(`✅ ${cards.length} cards détectées`)

  // Créer un ScrollTrigger pour chaque card
  cards.forEach((card, index) => {
    ScrollTrigger.create({
      trigger: card,
      start: 'top center', // Scroll DOWN : quand le TOP de la card touche le milieu de l'écran
      end: 'bottom center', // Scroll UP : quand le BOTTOM de la card touche le milieu de l'écran
      
      // Callback quand la card entre (scroll down)
      // = TOP de la card touche le milieu de l'écran
      onEnter: () => {
        removeAllActive()
        card.classList.add('is-active')
        log(`✅ Card ${index + 1} active (scroll down - top hit center)`)
      },
      
      // Callback quand on scroll vers le haut (scroll up)
      // = BOTTOM de la card touche le milieu de l'écran
      onEnterBack: () => {
        removeAllActive()
        card.classList.add('is-active')
        log(`✅ Card ${index + 1} active (scroll up - bottom hit center)`)
      },

      // Marqueurs de debug (uniquement en dev)
      markers: isDev ? {
        startColor: "green",
        endColor: "red",
        fontSize: "12px",
        indent: 20
      } : false
    })
  })

  // Fonction pour retirer .is-active de toutes les cards
  function removeAllActive() {
    cards.forEach(card => {
      card.classList.remove('is-active')
    })
  }

  log('✅ Card Scroll Activation initialisé avec succès')
}

// Fonction de nettoyage
export function cleanup() {
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  const log = isDev ? console.log : () => {}

  // Kill tous les ScrollTriggers
  ScrollTrigger.getAll().forEach(st => {
    if (st.vars.trigger && st.vars.trigger.classList.contains('card-6_card-item')) {
      st.kill()
    }
  })

  log('🧹 Card Scroll Activation nettoyé')
}