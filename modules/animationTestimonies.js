// Module Testimonials - Switch témoignages avec animations
export function init() {
  console.log('🎬 Testimonials - Initialisation')

  // Vérifier GSAP
  if (typeof gsap === 'undefined') {
    console.warn('❌ GSAP manquant - Testimonials désactivé')
    return
  }

  // Trouver la section
  const section = document.querySelector('.section_testimonies-1')
  if (!section) {
    console.warn('❌ Section .section_testimonies-1 introuvable')
    return
  }

  console.log('✅ Section testimonials trouvée')

  // Récupérer tous les éléments
  const cards = section.querySelectorAll('.testimonies-1_card-item')
  const blocks = section.querySelectorAll('.testimonies-1_block-content')

  if (!cards.length || !blocks.length) {
    console.warn('❌ Cards ou blocks manquants')
    return
  }

  console.log(`✅ ${cards.length} cards et ${blocks.length} blocks trouvés`)

  // État initial : activer le premier
  const firstCard = cards[0]
  const firstBlock = blocks[0]
  
  firstCard.classList.add('is-active')
  firstBlock.classList.add('is-active')
  
  // Cacher tous les autres blocks
  blocks.forEach((block, index) => {
    if (index === 0) {
      gsap.set(block, { autoAlpha: 1 })
    } else {
      gsap.set(block, { autoAlpha: 0 })
    }
  })

  console.log('✅ Premier témoignage activé par défaut')

  // Click handler sur chaque card
  cards.forEach((card, cardIndex) => {
    card.addEventListener('click', () => {
      const cardId = card.getAttribute('data-testimonial-id')
      
      if (!cardId) {
        console.warn(`❌ Card ${cardIndex + 1} n'a pas d'attribut data-testimonial-id`)
        return
      }

      console.log(`🎯 Click sur card: ${cardId}`)

      // Trouver le block correspondant
      const targetBlock = Array.from(blocks).find(block => 
        block.getAttribute('data-testimonial-id') === cardId
      )

      if (!targetBlock) {
        console.warn(`❌ Aucun block trouvé pour ID: ${cardId}`)
        return
      }

      // Si déjà actif, ne rien faire
      if (targetBlock.classList.contains('is-active')) {
        console.log('ℹ️  Déjà actif, skip')
        return
      }

      // Retirer is-active de toutes les cards
      cards.forEach(c => c.classList.remove('is-active'))
      
      // Ajouter is-active sur card cliquée
      card.classList.add('is-active')

      // Animation de transition des blocks
      const currentBlock = section.querySelector('.testimonies-1_block-content.is-active')
      
      if (currentBlock) {
        // Fade out current
        gsap.to(currentBlock, {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            currentBlock.classList.remove('is-active')
          }
        })
      }

      // Fade in target
      gsap.to(targetBlock, {
        autoAlpha: 1,
        duration: 0.3,
        delay: 0.3,
        ease: 'power2.inOut',
        onStart: () => {
          targetBlock.classList.add('is-active')
        }
      })

      console.log(`✅ Transition vers: ${cardId}`)
    })

    // Accessibilité : support clavier
    card.setAttribute('role', 'button')
    card.setAttribute('tabindex', '0')
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        card.click()
      }
    })
  })

  console.log('✅ Testimonials module initialisé')
}