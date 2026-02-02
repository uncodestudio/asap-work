// modules/cardStack.js
import { log, warn, ready } from './utils.js'

export function init() {
  ready(() => {
    log('🎴 Initialisation Card Stack Animation (GetHyped Real)')
    
    if (typeof ScrollTrigger === 'undefined' || typeof gsap === 'undefined') {
      warn('⚠️ GSAP ou ScrollTrigger pas chargé')
      return
    }
    
    const section = document.querySelector('.card-stacking_list')
    
    if (!section) {
      log('⏭️ Section card-stacking_list pas trouvée')
      return
    }
    
    const slides = section.querySelectorAll('.card-stack_slide')
    
    if (slides.length < 2) {
      warn('⚠️ Minimum 2 slides nécessaires')
      return
    }
    
    log(`🎴 ${slides.length} slides trouvées`)
    
    slides.forEach((slide, index) => {
      const isLast = index === slides.length - 1
      const wrapper = slide.querySelector('.card-stack_wrapper')
      const content = slide.querySelector('.card-stack_content')
      
      if (!wrapper || !content) {
        warn(`⚠️ Wrapper ou content manquant dans slide ${index + 1}`)
        return
      }
      
      // Toutes les cards sauf la dernière
      if (!isLast) {
        
        // Animation principale : scale + rotation 3D
        gsap.to(content, {
          rotationZ: (Math.random() - 0.5) * 10,  // Rotation aléatoire ±5°
          scale: 0.7,                              // Scale down à 70%
          rotationX: 40,                           // Perspective 3D
          ease: 'power1.in',
          scrollTrigger: {
            pin: wrapper,                          // Pin le wrapper
            trigger: slide,
            start: 'top top',
            end: `+=${window.innerHeight}`,        // Pin pendant 1 viewport
            scrub: true,
            // markers: true,
          }
        })
        
        // Fade out progressif (75% → 100%)
        const pinDuration = window.innerHeight
        
        gsap.to(content, {
          autoAlpha: 0,                            // Fade + visibility
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: slide,
            start: `top+=${pinDuration * 0.75} top`,
            end: `top+=${pinDuration} top`,
            scrub: true,
            // markers: true,
          }
        })
        
        log(`📌 Slide ${index + 1} configurée`)
      }
    })
    
    log('✅ Card Stack animation initialisée')
  })
}