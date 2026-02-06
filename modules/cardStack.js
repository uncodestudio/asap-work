// modules/cardStack.js
import { log, warn, ready } from './utils.js'

export function init() {
  ready(() => {
    log('🎴 Initialisation Card Stack Animation')
    
    if (typeof ScrollTrigger === 'undefined' || typeof gsap === 'undefined') {
      warn('⚠️ GSAP ou ScrollTrigger pas chargé')
      return
    }
    
    const slides = document.querySelectorAll('.card-stack_slide')
    
    if (slides.length < 2) {
      warn('⚠️ Minimum 2 slides nécessaires')
      return
    }
    
    log(`🎴 ${slides.length} slides trouvées`)
    
    // ==========================================
    // ATTENDRE 3 SECONDES AVANT DE SETUP
    // ==========================================
    log('⏳ Attente de 3 secondes...')
    
    setTimeout(() => {
      log('✅ 3 secondes écoulées, setup des animations')
      
      slides.forEach((slide, index) => {
        const isLast = index === slides.length - 1
        const wrapper = slide.querySelector('.card-stack_wrapper')
        const content = slide.querySelector('.card-stack_content')
        
        if (!wrapper || !content) {
          warn(`⚠️ Wrapper ou content manquant dans slide ${index + 1}`)
          return
        }
        
        if (!isLast) {
          
          // Rotation aléatoire pré-calculée
          const randomRotation = (Math.random() - 0.5) * 10
          
          // ==========================================
          // PIN + SCALE (0% → 100%)
          // ==========================================
          gsap.to(content, {
            rotationZ: randomRotation,
            scale: 0.7,
            rotationX: 40,
            ease: 'power1.in',
            scrollTrigger: {
              trigger: slide,
              pin: wrapper,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              markers: false,
            }
          })
          
          // ==========================================
          // FADE (75% → 100%)
          // ==========================================
          gsap.to(content, {
            autoAlpha: 0,
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: slide,
              start: 'top+=75% top',
              end: 'bottom top',
              scrub: true,
              markers: false,
            }
          })
          
          log(`✅ Card ${index + 1} configurée`)
        }
      })
      
      // Refresh après setup
      ScrollTrigger.refresh()
      log('✅ Card Stack animation initialisée')
      
    }, 3000) // ← 3 secondes
    
  })
}