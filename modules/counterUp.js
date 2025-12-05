// Module CounterUp - Animation des chiffres au scroll
// Utilise GSAP + ScrollTrigger pour animer les compteurs

export function init() {
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  const log = isDev ? console.log : () => {}
  const warn = isDev ? console.warn : () => {}

  log('🔢 CounterUp - Initialisation')

  // Vérifier GSAP et ScrollTrigger
  if (typeof gsap === 'undefined') {
    warn('❌ GSAP manquant - CounterUp désactivé')
    return
  }

  if (typeof ScrollTrigger === 'undefined') {
    warn('❌ ScrollTrigger manquant - CounterUp désactivé')
    return
  }

  // Trouver la section trigger
  const section = document.querySelector('.section_chiffres-1')

  if (!section) {
    warn('❌ Section .section_chiffres-1 introuvable')
    return
  }

  // Trouver tous les compteurs dans la section
  const counters = section.querySelectorAll('.counterup')

  if (!counters.length) {
    warn('❌ Aucun .counterup trouvé dans .section_chiffres-1')
    return
  }

  log(`✅ ${counters.length} compteur(s) détecté(s)`)

  // Initialiser chaque compteur
  counters.forEach((counter, index) => {
    // Récupérer la valeur cible
    const targetText = counter.textContent.trim()
    
    // Parser la valeur (supporte 100, 1K, 1M, etc.)
    let targetValue = parseFloat(targetText.replace(/[^0-9.-]/g, ''))
    
    // Gérer les suffixes K, M, B
    if (targetText.includes('K') || targetText.includes('k')) {
      targetValue *= 1000
    } else if (targetText.includes('M') || targetText.includes('m')) {
      targetValue *= 1000000
    } else if (targetText.includes('B') || targetText.includes('b')) {
      targetValue *= 1000000000
    }

    if (isNaN(targetValue)) {
      warn(`❌ Compteur ${index + 1} : valeur invalide "${targetText}"`)
      return
    }

    // Récupérer le suffixe (%, K, +, etc.)
    const suffix = targetText.replace(/[0-9.,\s-]/g, '')

    log(`✅ Compteur ${index + 1} : ${targetValue} (suffix: "${suffix}")`)

    // Initialiser à 0
    counter.textContent = '0' + suffix

    // Créer l'animation avec ScrollTrigger
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%', // Déclenche quand la section arrive à 80% du viewport
      onEnter: () => {
        // Objet pour animer
        const obj = { value: 0 }

        gsap.to(obj, {
          value: targetValue,
          duration: 2, // 2 secondes d'animation
          ease: 'power2.out',
          onUpdate: () => {
            // Formater le nombre
            let displayValue = Math.round(obj.value)

            // Ajouter séparateurs de milliers
            displayValue = displayValue.toLocaleString('fr-FR')

            // Ajouter le suffixe
            counter.textContent = displayValue + suffix
          }
        })

        log(`🔼 Compteur ${index + 1} animé vers ${targetValue}`)
      },
      once: true // Animation une seule fois
    })
  })

  log('✅ CounterUp initialisé avec succès')
}

// Fonction de nettoyage
export function cleanup() {
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  const log = isDev ? console.log : () => {}

  // Kill tous les ScrollTriggers du module
  ScrollTrigger.getAll().forEach(st => {
    if (st.vars.trigger && st.vars.trigger.classList.contains('section_chiffres-1')) {
      st.kill()
    }
  })

  log('🧹 CounterUp nettoyé')
}