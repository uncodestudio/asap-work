// modules/verticalSlider.js
import Splide from '@splidejs/splide'
import '@splidejs/splide/dist/css/splide.min.css'
import { log, ready } from './utils.js'

export function init() {
  ready(() => {
    log('🎠 Initialisation Vertical Slider')
    
    const sliders = document.querySelectorAll('.splide-vertical-infinite')
    
    if (!sliders.length) {
      log('⏭️ Aucun slider vertical trouvé')
      return
    }
    
    sliders.forEach(slider => {
      const splide = new Splide(slider, {
        type: 'loop',
        direction: 'ttb',
        height: '648px',
        perPage: 9,
        perMove: 1,
        focus: 5,
        
        autoplay: true,
        interval: 3000,
        speed: 800,
        
        pauseOnHover: true,
        pauseOnFocus: true,
        
        gap: '4px',
        arrows: false,
        pagination: false,
        drag: true,
        wheel: false,
        trimSpace: false,
        waitForTransition: true,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      })
      
      // ==========================================
      // Gérer .is-active basé sur la classe Splide
      // ==========================================
      splide.on('mounted move', () => {
        const slides = slider.querySelectorAll('.splide__slide')
        
        slides.forEach(slide => {
          const item = slide.querySelector('.splide-vertical-infinite_item')
          
          if (item) {
            // Copier la classe .is-active de Splide
            if (slide.classList.contains('is-active')) {
              item.classList.add('is-active')
            } else {
              item.classList.remove('is-active')
            }
          }
        })
      })
      
      splide.mount()
      
      log('✅ Slider vertical monté')
    })
    
    log('✅ Vertical Slider initialisé')
  })
}