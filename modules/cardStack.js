// modules/cardStack.js
import { log, warn, ready } from './utils.js'

export function init() {
  ready(() => {
    log('🎴 Initialisation Card Stack Animation (GetHyped)')
    
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
        
        const pinDuration = window.innerHeight
        
        // Debug logs
        log(`Card ${index + 1}:`)
        log(`  - pinDuration: ${pinDuration}px`)
        log(`  - fade start: ${pinDuration * 0.75}px (75%)`)
        log(`  - fade end: ${pinDuration}px (100%)`)
        
        // Animation principale : scale + rotation 3D (0% → 100%)
        gsap.to(content, {
          rotationZ: (Math.random() - 0.5) * 10,
          scale: 0.7,
          rotationX: 40,
          ease: 'power1.in',
          scrollTrigger: {
            pin: wrapper,
            trigger: slide,
            start: 'top top',
            end: `+=${pinDuration}`,
            scrub: true,
            markers: false,
            id: `card-${index + 1}-main`
          }
        })
        
        // Fade out (75% → 100%)
        gsap.to(content, {
          autoAlpha: 0,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: slide,
            start: `top+=${pinDuration * 0.75} top`,
            end: `top+=${pinDuration} top`,
            scrub: true,
            markers: false,
            id: `card-${index + 1}-fade`
          }
        })
        
        log(`✅ Card ${index + 1} configurée`)
      }
    })
    
    log('✅ Card Stack animation initialisée')
  })
}