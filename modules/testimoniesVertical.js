// modules/testimoniesVertical.js
import Splide from '@splidejs/splide'
import '@splidejs/splide/dist/css/splide.min.css'
import { log, warn } from './utils.js'

export function init() {
  log('💬 Initialisation Testimonies Vertical Slider')
  
  const sliders = document.querySelectorAll('.splide-testimonies-vertical')
  
  if (!sliders.length) {
    log('⏭️ Aucun slider testimonies trouvé')
    return
  }
  
  sliders.forEach(slider => {
    new Splide(slider, {
      type: 'loop',
      direction: 'ttb',        // Top to bottom (vertical)
      height: '400px',         // Ajuste selon ta hauteur de carte
      autoplay: true,
      interval: 6000,          // 6 secondes par avis
      speed: 1200,              // Vitesse de transition
      pauseOnHover: true,      // Pause au survol
      pauseOnFocus: true,
      arrows: false,           // Pas de flèches
      pagination: false,       // Pas de pagination
      perPage: 1,
      gap: 0,
      drag: false,             // Désactive le drag
      wheel: false,            // Désactive la molette
      waitForTransition: true,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    }).mount()
    
    log('✅ Testimonies slider vertical monté')
  })
}