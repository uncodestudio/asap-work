// Module Accordion - Mode single par groupe + open avec value
// Version avec classe is-open pour CSS (rotation icône)

export function init() {
  // Logs conditionnels (ou version sans Vite)
  const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV
  const log = isDev ? console.log : () => {}
  const warn = isDev ? console.warn : () => {}

  log('🎬 Accordion - Initialisation')

  // Vérifier GSAP
  if (typeof gsap === 'undefined') {
    warn('❌ GSAP manquant - Accordion désactivé')
    return
  }

  // Trouver tous les accordéons via data-attribute
  const accordions = document.querySelectorAll('[data-accordion]')

  if (!accordions.length) {
    warn('❌ Aucun accordéon trouvé')
    return
  }

  log(`✅ ${accordions.length} accordéons détectés`)

  // Configuration de chaque accordéon
  accordions.forEach((accordion, index) => {
    const trigger = accordion.querySelector('[data-accordion-trigger]')
    const content = accordion.querySelector('[data-accordion-content]')
    const icon = accordion.querySelector('[data-accordion-icon]')

    if (!trigger || !content) {
      warn(`❌ Accordéon ${index + 1} incomplet (manque trigger ou content)`)
      return
    }

    // GPU acceleration pour performance
    gsap.set(content, { force3D: true })

    // Récupérer le groupe (optionnel)
    const group = accordion.getAttribute('data-accordion-group')
    
    // Vérifier si doit être ouvert par défaut (value "true")
    const openValue = accordion.getAttribute('data-accordion-open')
    const isDefaultOpen = openValue === 'true'

    // État initial
    if (isDefaultOpen) {
      // Ouvert par défaut
      accordion.classList.add('is-open')
      if (icon) icon.classList.add('is-open')
      
      gsap.set(content, { height: 'auto', overflow: 'hidden' })
      content.setAttribute('aria-hidden', 'false')
      trigger.setAttribute('aria-expanded', 'true')
      log(`✅ Accordéon ${index + 1} ouvert par défaut`)
    } else {
      // Fermé par défaut
      accordion.classList.remove('is-open')
      if (icon) icon.classList.remove('is-open')
      
      gsap.set(content, { height: 0, overflow: 'hidden' })
      content.setAttribute('aria-hidden', 'true')
      trigger.setAttribute('aria-expanded', 'false')
    }

    // Fonction toggle
    function toggleAccordion() {
      const isOpen = accordion.classList.contains('is-open')

      if (isOpen) {
        // Fermer cet accordéon
        accordion.classList.remove('is-open')
        if (icon) icon.classList.remove('is-open')
        
        gsap.to(content, {
          height: 0,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            content.setAttribute('aria-hidden', 'true')
          }
        })

        trigger.setAttribute('aria-expanded', 'false')
        log(`🔽 Accordéon ${index + 1} fermé`)
      } else {
        // Fermer tous les accordéons DU MÊME GROUPE
        if (group) {
          // Trouver tous les accordéons du même groupe
          const groupAccordions = document.querySelectorAll(`[data-accordion-group="${group}"]`)
          
          groupAccordions.forEach((item) => {
            if (item === accordion) return // Skip l'accordéon actuel

            const itemTrigger = item.querySelector('[data-accordion-trigger]')
            const itemContent = item.querySelector('[data-accordion-content]')
            const itemIcon = item.querySelector('[data-accordion-icon]')

            item.classList.remove('is-open')
            if (itemIcon) itemIcon.classList.remove('is-open')
            
            gsap.to(itemContent, {
              height: 0,
              duration: 0.3,
              ease: 'power2.inOut',
              onComplete: () => {
                itemContent.setAttribute('aria-hidden', 'true')
              }
            })

            itemTrigger.setAttribute('aria-expanded', 'false')
          })

          log(`🔄 Fermé les autres accordéons du groupe "${group}"`)
        }

        // Ouvrir cet accordéon
        accordion.classList.add('is-open')
        if (icon) icon.classList.add('is-open')
        
        gsap.to(content, {
          height: 'auto',
          duration: 0.3,
          ease: 'power2.inOut',
          onStart: () => {
            content.setAttribute('aria-hidden', 'false')
          }
        })

        trigger.setAttribute('aria-expanded', 'true')
        log(`🔼 Accordéon ${index + 1} ouvert`)
      }
    }

    // Click handler
    trigger.style.cursor = 'pointer'
    trigger.addEventListener('click', toggleAccordion)

    // Accessibilité clavier
    trigger.setAttribute('role', 'button')
    trigger.setAttribute('tabindex', '0')
    
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleAccordion()
      }
    })
  })

  log('✅ Accordion initialisé avec succès')
}