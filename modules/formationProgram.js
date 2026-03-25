// modules/formationProgram.js
import { log, warn, ready } from './utils.js'

export function init() {
  ready(() => {
    log('📚 Initialisation Formation Program Accordion')

    if (typeof gsap === 'undefined') {
      warn('⚠️ GSAP pas chargé')
      return
    }

    const items = document.querySelectorAll('.formation-program_item')

    if (!items.length) {
      log('⏭️ Aucun .formation-program_item trouvé')
      return
    }

    log('✅ ' + items.length + ' item(s) trouvé(s)')

    items.forEach((item, index) => {
      const trigger = item.querySelector('.formation-program_top-content')
      const content = item.querySelector('.formation-program_bottom_wrapper')
      const verticalLine = item.querySelector('.formation-program-icon_vertical-line')

      if (!trigger || !content) {
        warn('⚠️ Item ' + (index + 1) + ' incomplet')
        return
      }

      // État initial : fermé
      gsap.set(content, { height: 0, overflow: 'hidden', force3D: true })

      function toggle() {
        const isOpen = item.classList.contains('is-open')

        if (isOpen) {
          item.classList.remove('is-open')
          gsap.to(content, { height: 0, duration: 0.4, ease: 'power2.inOut' })
          if (verticalLine) gsap.to(verticalLine, { rotation: 0, duration: 0.3, ease: 'power2.inOut' })
          log('🔽 Item ' + (index + 1) + ' fermé')
        } else {
          item.classList.add('is-open')
          gsap.to(content, { height: 'auto', duration: 0.4, ease: 'power2.inOut' })
          if (verticalLine) gsap.to(verticalLine, { rotation: -90, duration: 0.3, ease: 'power2.inOut' })
          log('🔼 Item ' + (index + 1) + ' ouvert')
        }
      }

      trigger.addEventListener('click', toggle)
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggle()
        }
      })
    })

    log('✅ Formation Program Accordion initialisé')
  })
}
