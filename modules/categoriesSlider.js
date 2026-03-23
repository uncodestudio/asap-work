// modules/categoriesSlider.js
import Splide from '@splidejs/splide'
import { log, ready } from './utils.js'

export function init() {
  ready(() => {
    log('🗂️ Initialisation Categories Slider')

    const sliders = document.querySelectorAll('.splide-categories')

    if (!sliders.length) {
      log('⏭️ Aucun slider catégories trouvé')
      return
    }

    sliders.forEach(slider => {
      const splide = new Splide(slider, {
        type: 'slide',
        perPage: 3,
        perMove: 1,
        gap: '16px',
        padding: { left: '0', right: '80px' }, // pas de padding gauche (géré par le container Webflow), peek droite uniquement au départ
        arrows: false,
        pagination: false,
        drag: true,
        snap: true,
        breakpoints: {
          991: {
            perPage: 2,
            padding: { left: '0', right: '60px' },
          },
          767: {
            perPage: 1,
            padding: { left: '0', right: '60px' },
          },
        },
      })

      // Barre de scroll horizontale
      const progressBar = slider.querySelector('.splide-categories_progress-bar')

      if (progressBar) {
        splide.on('mounted move', () => {
          const end = splide.Components.Controller.getEnd()
          const rate = end > 0 ? splide.index / end : 0
          progressBar.style.width = (rate * 100) + '%'
        })
      }

      splide.mount()

      // Overflow visible pour que les slides dépassent des deux côtés du container
      const track = slider.querySelector('.splide__track')
      if (track) track.style.overflow = 'visible'

      log('✅ Slider catégories monté')
    })

    log('✅ Categories Slider initialisé')
  })
}