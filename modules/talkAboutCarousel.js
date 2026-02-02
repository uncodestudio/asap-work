// modules/talkAboutCarousel.js
import { log, warn, ready } from './utils.js'

export function init() {
  ready(() => {
    log('💬 Initialisation Talk About Carousel')
    
    if (window.innerWidth < 992) {
      log('⏭️ Mobile detected - carousel désactivé')
      return
    }
    
    if (typeof gsap === 'undefined') {
      warn('⚠️ GSAP pas chargé')
      return
    }
    
    const items = document.querySelectorAll('.talk-about_item')
    
    if (!items.length) {
      log('⏭️ Aucun talk-about item trouvé')
      return
    }
    
    log(`✅ ${items.length} items trouvés`)
    
    let currentIndex = 0
    let autoTimer = null
    let isHovered = false
    let isDestroyed = false
    let currentLineTween = null
    
    const DURATION = 10 // Durée en secondes
    const FADE_DELAY = 0.4
    
    /**
     * Set active item
     */
    function setActive(index) {
      if (isDestroyed) return
      
      // IMPORTANT : Tuer l'ancienne animation de ligne
      if (currentLineTween) {
        currentLineTween.kill()
        currentLineTween = null
      }
      
      items.forEach((item, i) => {
        const isActive = i === index
        const paragraph = item.querySelector('.talk-about_paragraph')
        const arrow = item.querySelector('.talk-about_arrow-wrapper')
        const line = item.querySelector('.talk-about_loading-line')
        
        item.classList.toggle('is-open', isActive)
        if (paragraph) paragraph.classList.toggle('is-open', isActive)
        if (arrow) arrow.classList.toggle('is-open', isActive)
        
        // Reset TOUTES les lignes instantanément
        if (line) {
          gsap.killTweensOf(line) // Tuer toutes les animations en cours
          gsap.set(line, { width: '0%' }) // Reset instantané
        }
        
        // Animate paragraph
        if (paragraph) {
          if (isActive) {
            gsap.set(paragraph, { display: 'block' })
            gsap.to(paragraph, { 
              opacity: 1, 
              duration: 0.2, 
              delay: FADE_DELAY 
            })
          } else {
            gsap.to(paragraph, {
              opacity: 0,
              duration: 0.2,
              onComplete: () => gsap.set(paragraph, { display: 'none' })
            })
          }
        }
      })
      
      currentIndex = index
      log(`📍 Item ${index + 1} activé`)
    }
    
    /**
     * Start auto-rotation timer
     */
    function startTimer() {
      if (isHovered || isDestroyed) return
      
      const line = items[currentIndex]?.querySelector('.talk-about_loading-line')
      
      if (line) {
        // Animation de la ligne UNIQUEMENT pour l'item actif
        currentLineTween = gsap.to(line, {
          width: '100%',
          duration: DURATION,
          ease: 'none',
          onComplete: () => {
            // Quand la barre atteint 100%, changer de slide
            if (!isHovered && !isDestroyed) {
              setActive((currentIndex + 1) % items.length)
              startTimer() // Relancer pour la prochaine
            }
          }
        })
      }
      
      log(`⏱️ Timer démarré (${DURATION}s)`)
    }
    
    /**
     * Stop auto-rotation
     */
    function stopTimer() {
      // Tuer le tween en cours
      if (currentLineTween) {
        currentLineTween.kill()
        currentLineTween = null
      }
      
      // Reset la ligne active
      const line = items[currentIndex]?.querySelector('.talk-about_loading-line')
      if (line) {
        gsap.set(line, { width: '0%' })
      }
      
      log('⏸️ Timer stoppé')
    }
    
    /**
     * Cleanup
     */
    function destroy() {
      isDestroyed = true
      stopTimer()
      
      items.forEach((item) => {
        const newItem = item.cloneNode(true)
        item.parentNode.replaceChild(newItem, item)
      })
      
      log('🗑️ Carousel détruit')
    }
    
    // Event listeners
    items.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        isHovered = true
        stopTimer()
        setActive(index)
      })
      
      item.addEventListener('mouseleave', () => {
        isHovered = false
        setTimeout(() => {
          if (!isHovered && !isDestroyed) {
            startTimer()
          }
        }, 100)
      })
    })
    
    // Handle resize
    const handleResize = () => {
      if (window.innerWidth < 992 && !isDestroyed) {
        destroy()
      }
    }
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('beforeunload', destroy)
    
    // Init
    setActive(0)
    startTimer()
    
    log('✅ Carousel initialisé')
  })
}