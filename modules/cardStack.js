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
    
    // ==========================================
    // ATTENDRE LE CHARGEMENT DES IMAGES
    // ==========================================
    const images = section.querySelectorAll('img')
    let imagesLoaded = 0
    const totalImages = images.length
    
    function checkImagesLoaded() {
      imagesLoaded++
      if (imagesLoaded === totalImages) {
        log('✅ Toutes les images chargées, refresh ScrollTrigger')
        ScrollTrigger.refresh()
      }
    }
    
    // Attacher les listeners sur les images
    if (totalImages > 0) {
      images.forEach(img => {
        if (img.complete) {
          checkImagesLoaded()
        } else {
          img.addEventListener('load', checkImagesLoaded)
          img.addEventListener('error', checkImagesLoaded)
        }
      })
    }
    
    // ==========================================
    // SETUP ANIMATIONS
    // ==========================================
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
        
        log(`Card ${index + 1}:`)
        log(`  - pinDuration: ${pinDuration}px`)
        log(`  - fade start: ${pinDuration * 0.75}px (75%)`)
        
        // Animation principale : scale + rotation 3D
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
            markers: true,
            id: `card-${index + 1}-main`,
            invalidateOnRefresh: true, // ← Recalcule au refresh
          }
        })
        
        // Fade out
        gsap.to(content, {
          autoAlpha: 0,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: slide,
            start: `top+=${pinDuration * 0.75} top`,
            end: `top+=${pinDuration} top`,
            scrub: true,
            markers: true,
            id: `card-${index + 1}-fade`,
            invalidateOnRefresh: true, // ← Recalcule au refresh
          }
        })
        
        log(`✅ Card ${index + 1} configurée`)
      }
    })
    
    // ==========================================
    // REFRESH ADDITIONNEL
    // ==========================================
    
    // Refresh après fonts loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        log('✅ Fonts chargées, refresh ScrollTrigger')
        ScrollTrigger.refresh()
      })
    }
    
    // Refresh après un délai (fallback)
    setTimeout(() => {
      log('✅ Refresh final après délai')
      ScrollTrigger.refresh()
    }, 500)
    
    // Refresh au resize
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh()
    })
    
    log('✅ Card Stack animation initialisée')
  })
}