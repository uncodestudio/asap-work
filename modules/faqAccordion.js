// modules/faqAccordion.js
import { log, warn, ready } from './utils.js'

export function init() {
  ready(() => {
    log('❓ Initialisation FAQ Accordion')
    
    if (typeof gsap === 'undefined') {
      warn('⚠️ GSAP pas chargé')
      return
    }
    
    const accordions = document.querySelectorAll('.faq_accordion')
    
    if (!accordions.length) {
      log('⏭️ Aucun FAQ accordion trouvé')
      return
    }
    
    log(`✅ ${accordions.length} FAQs trouvées`)
    
    accordions.forEach((accordion, index) => {
      const question = accordion.querySelector('.faq_question')
      const answer = accordion.querySelector('.faq_answer')
      const icon = accordion.querySelector('.faq_icon-wrapper')
      
      if (!question || !answer) {
        warn(`⚠️ FAQ ${index + 1} incomplète`)
        return
      }
      
      // GPU acceleration
      gsap.set(answer, { force3D: true })
      
      // État initial : fermé
      gsap.set(answer, { height: 0, overflow: 'hidden' })
      accordion.classList.remove('is-open')
      if (icon) icon.classList.remove('is-open')
      
      // Toggle function
      function toggle() {
        const isOpen = accordion.classList.contains('is-open')
        
        if (isOpen) {
          // Fermer
          accordion.classList.remove('is-open')
          if (icon) icon.classList.remove('is-open')
          
          gsap.to(answer, {
            height: 0,
            duration: 0.4,
            ease: 'power2.inOut'
          })
          
          log(`🔽 FAQ ${index + 1} fermée`)
        } else {
          // Ouvrir
          accordion.classList.add('is-open')
          if (icon) icon.classList.add('is-open')
          
          gsap.to(answer, {
            height: 'auto',
            duration: 0.4,
            ease: 'power2.inOut'
          })
          
          log(`🔼 FAQ ${index + 1} ouverte`)
        }
      }
      
      // Click handler
      question.style.cursor = 'pointer'
      question.addEventListener('click', toggle)
      
      // Accessibilité
      question.setAttribute('role', 'button')
      question.setAttribute('tabindex', '0')
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggle()
        }
      })
    })
    
    log('✅ FAQ Accordion initialisé')
  })
}