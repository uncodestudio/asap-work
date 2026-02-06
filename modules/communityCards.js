// modules/communityCards.js
import { log, warn, ready } from './utils.js'

export function init() {
  ready(() => {
    log('👥 Initialisation Community Cards Animation')
    
    // ==========================================
    // MOBILE : Pas d'animation, tout ouvert
    // ==========================================
    if (window.innerWidth < 768) {
      log('📱 Mobile détecté - Pas d\'animation, tout ouvert')
      
      const wrapper = document.querySelector('.layout-community_list-wrapper')
      if (!wrapper) return
      
      const items = wrapper.querySelectorAll('.layout-community_item')
      
      // Tout ouvrir immédiatement
      items.forEach(item => {
        const content = item.querySelector('.layout-community_content')
        const image = item.querySelector('.layout-community_item_image')
        
        item.classList.add('is-revealed')
        if (content) content.classList.add('is-revealed')
        if (image) image.classList.add('is-revealed')
      })
      
      log(`✅ ${items.length} items ouverts (mobile)`)
      return
    }
    
    // ==========================================
    // DESKTOP : Animation par liste
    // ==========================================
    if (typeof ScrollTrigger === 'undefined') {
      warn('⚠️ ScrollTrigger pas chargé')
      return
    }
    
    const wrapper = document.querySelector('.layout-community_list-wrapper')
    
    if (!wrapper) {
      log('⏭️ Wrapper community pas trouvé')
      return
    }
    
    const lists = wrapper.querySelectorAll('.layout-community_list')
    
    if (!lists.length) {
      warn('⚠️ Aucune liste trouvée dans le wrapper')
      return
    }
    
    log(`📋 ${lists.length} liste(s) trouvée(s) (desktop)`)
    
    lists.forEach((list, listIndex) => {
      const items = list.querySelectorAll('.layout-community_item')
      
      if (!items.length) {
        warn(`⚠️ Aucun item dans la liste ${listIndex + 1}`)
        return
      }
      
      const revealAllItems = () => {
        items.forEach((item) => {
          const content = item.querySelector('.layout-community_content')
          const image = item.querySelector('.layout-community_item_image')
          
          item.classList.add('is-revealed')
          if (content) content.classList.add('is-revealed')
          if (image) image.classList.add('is-revealed')
        })
        log(`✅ Liste ${listIndex + 1}: ${items.length} items révélés`)
      }
      
      const hideAllItems = () => {
        items.forEach((item) => {
          const content = item.querySelector('.layout-community_content')
          const image = item.querySelector('.layout-community_item_image')
          
          item.classList.remove('is-revealed')
          if (content) content.classList.remove('is-revealed')
          if (image) image.classList.remove('is-revealed')
        })
        log(`🔽 Liste ${listIndex + 1}: ${items.length} items masqués`)
      }
      
      // ScrollTrigger Desktop uniquement
      ScrollTrigger.create({
        trigger: list,
        start: 'top 50%',
        end: 'bottom 10%',
        onEnter: revealAllItems,
        onLeave: hideAllItems,
        onEnterBack: revealAllItems,
        onLeaveBack: hideAllItems,
        id: `desktop-list-${listIndex + 1}`,
      })
      
      log(`✅ Desktop trigger créé pour liste ${listIndex + 1}`)
    })
    
    log('✅ Community Cards animation initialisée (desktop only)')
  })
}