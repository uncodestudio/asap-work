// Module Typewriter - Phrases complètes - VERSION PROPRE
// Écrit et efface toute la phrase à chaque loop - FIX GLITCH

export function init() {
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  const log = isDev ? console.log : () => {}
  const warn = isDev ? console.warn : () => {}

  log('⌨️ Typewriter Phrases - Initialisation')

  // Vérifier GSAP
  if (typeof gsap === 'undefined') {
    warn('❌ GSAP manquant - Typewriter désactivé')
    return
  }

  // Vérifier prefers-reduced-motion (accessibilité)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (prefersReducedMotion) {
    log('♿ prefers-reduced-motion détecté - Animation simplifiée')
  }

  // Trouver tous les éléments typewriter
  const typewriters = document.querySelectorAll('[data-typewriter-phrase]')

  if (!typewriters.length) {
    warn('❌ Aucun typewriter trouvé')
    return
  }

  log(`✅ ${typewriters.length} typewriter(s) détecté(s)`)

  typewriters.forEach((element, index) => {
    // Récupérer les phrases depuis l'attribut data-typewriter-phrases
    const phrasesAttr = element.getAttribute('data-typewriter-phrases')
    
    if (!phrasesAttr) {
      warn(`❌ Typewriter ${index + 1} : attribut data-typewriter-phrases manquant`)
      return
    }

    // Parser les phrases (séparées par des virgules)
    const phrases = phrasesAttr.split(',').map(phrase => phrase.trim())

    if (!phrases.length) {
      warn(`❌ Typewriter ${index + 1} : aucune phrase trouvée`)
      return
    }

    log(`✅ Typewriter ${index + 1} : ${phrases.length} phrases`)

    // Options personnalisables via data-attributes
    const typeSpeed = parseFloat(element.getAttribute('data-typewriter-speed')) || 0.08
    const deleteSpeed = parseFloat(element.getAttribute('data-typewriter-delete-speed')) || 0.04
    const pauseAfterType = parseFloat(element.getAttribute('data-typewriter-pause')) || 2
    const pauseAfterDelete = parseFloat(element.getAttribute('data-typewriter-pause-delete')) || 0.5

    // Si prefers-reduced-motion, on affiche juste la première phrase
    if (prefersReducedMotion) {
      element.textContent = phrases[0]
      log(`♿ Typewriter ${index + 1} : affichage statique ("${phrases[0]}")`)
      return
    }

    // Sauvegarder le contenu initial (pour SEO)
    const initialContent = element.textContent.trim()
    
    // Créer la structure HTML : texte + curseur
    const textSpan = document.createElement('span')
    textSpan.className = 'typewriter-text'
    
    const cursorSpan = document.createElement('span')
    cursorSpan.className = 'typewriter-cursor'
    cursorSpan.textContent = '|'

    // Vider l'élément et ajouter les spans
    element.innerHTML = ''
    element.appendChild(textSpan)
    element.appendChild(cursorSpan)
    
    // Afficher le contenu initial SEO
    textSpan.textContent = initialContent || phrases[0]

    log(`✅ Structure typewriter créée`)

    // Timeline maître
    const masterTL = gsap.timeline()

    // PHASE 1 : Affichage initial SEO (une seule fois)
    masterTL.to({}, { duration: pauseAfterType })
    
    // Effacer le contenu initial
    const initialLetters = (initialContent || phrases[0]).split('')
    for (let i = initialLetters.length; i > 0; i--) {
      const currentIndex = i // Capture dans closure
      masterTL.call(() => {
        textSpan.textContent = (initialContent || phrases[0]).substring(0, currentIndex - 1)
      }, null, `+=${deleteSpeed}`)
    }
    
    masterTL.to({}, { duration: pauseAfterDelete })

    // PHASE 2 : Timeline qui loop (toutes les phrases)
    const loopTL = gsap.timeline({ repeat: -1 })

    phrases.forEach((phrase, phraseIndex) => {
      // Écrire la phrase
      for (let i = 1; i <= phrase.length; i++) {
        const currentIndex = i // Capture dans closure
        loopTL.call(() => {
          textSpan.textContent = phrase.substring(0, currentIndex)
        }, null, `+=${typeSpeed}`)
      }

      // Pause après écriture
      loopTL.to({}, { duration: pauseAfterType })

      // Effacer la phrase
      for (let i = phrase.length; i > 0; i--) {
        const currentIndex = i // Capture dans closure
        loopTL.call(() => {
          textSpan.textContent = phrase.substring(0, currentIndex - 1)
        }, null, `+=${deleteSpeed}`)
      }

      // Pause après effacement
      loopTL.to({}, { duration: pauseAfterDelete })

      log(`✅ Phrase ${phraseIndex + 1} ajoutée : "${phrase}"`)
    })

    // Ajouter la loop à la timeline maître
    masterTL.add(loopTL)

    log(`✅ Typewriter ${index + 1} : Timeline créée`)

    // Stocker pour cleanup
    element._typewriterTimeline = masterTL
  })

  log('✅ Typewriter Phrases initialisé avec succès')
}

// Fonction de nettoyage globale
export function cleanup() {
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  const log = isDev ? console.log : () => {}

  document.querySelectorAll('[data-typewriter-phrase]').forEach(el => {
    if (el._typewriterTimeline) {
      el._typewriterTimeline.kill()
      log('🧹 Timeline typewriter nettoyée')
    }
  })
}