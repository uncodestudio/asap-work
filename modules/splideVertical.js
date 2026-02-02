// modules/verticalSlider.js
import Splide from '@splidejs/splide'
import '@splidejs/splide/dist/css/splide.min.css'
import { log } from './utils.js'

export function init() {
  log('🎠 Initialisation Vertical Slider')
  
  const sliders = document.querySelectorAll('.splide-vertical-infinite')
  
  if (!sliders.length) {
    log('⏭️ Aucun slider vertical trouvé')
    return
  }
  
  sliders.forEach(slider => {
    const splide = new Splide(slider, {
      type: 'loop',              // Loop infini
      direction: 'ttb',          // Top to bottom (vertical)
      height:'648px',  // Hauteur du container
      perPage: 9,        // 5 slides visibles
      perMove: 1,                // Change 1 slide à la fois
      focus: 'center',           // Focus sur le slide central

      // AUTOPLAY (ce que tu veux)
      autoplay: true,            // Active l'autoplay
      interval: 3000,            // 3 secondes par slide (ajuste selon tes besoins)
      speed: 800,                // Vitesse de transition (800ms)
      
      pauseOnHover: true,        // Pause au survol
      pauseOnFocus: true,
      
      gap: '4px',               // Espace entre slides
      arrows: false,             // Pas de flèches
      pagination: false,         // Pas de pagination
      drag: true,                // Drag activé
      wheel: false,              // Pas de scroll molette
      trimSpace: false,
      waitForTransition: true,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)', // Easing smooth
    })
    
    // Gérer la classe .is-active sur les items
    splide.on('mounted move', () => {
      const slides = slider.querySelectorAll('.splide__slide')
      
      slides.forEach(slide => {
        const item = slide.querySelector('.splide-vertical-infinite_item')
        
        if (item) {
          item.classList.remove('is-active')
          
          if (slide.classList.contains('is-active')) {
            item.classList.add('is-active')
          }
        }
      })
    })
    
    splide.mount()
    
    log('✅ Slider vertical monté (autoplay)')
  })
  
  log('✅ Vertical Slider initialisé')
}