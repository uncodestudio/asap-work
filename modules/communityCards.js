// modules/communityCards.js
import { log, warn, ready } from './utils.js'

export function init() {
  ready(() => {
    log('👥 Initialisation Community Cards Animation')
    
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
    
    log(`📋 ${lists.length} liste(s) trouvée(s)`)
    
    // Détection mobile
    const isMobile = () => window.innerWidth < 768
    
    lists.forEach((list, listIndex) => {
      const items = list.querySelectorAll('.layout-community_item')
      
      if (!items.length) {
        warn(`⚠️ Aucun item dans la liste ${listIndex + 1}`)
        return
      }
      
      // ==========================================
      // DESKTOP : Animation par liste (tous ensemble)
      // ==========================================
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
      
      // ScrollTrigger Desktop (trigger = liste)
      const desktopTrigger = ScrollTrigger.create({
        trigger: list,
        start: 'top 50%',
        end: 'bottom 10%',
        onEnter: revealAllItems,
        onLeave: hideAllItems,
        onEnterBack: revealAllItems,
        onLeaveBack: hideAllItems,
      })
      
      log(`✅ Desktop trigger créé pour liste ${listIndex + 1}`)
      
      // ==========================================
      // MOBILE : Animation par item (un par un)
      // ==========================================
      const mobileTriggers = []
      
      items.forEach((item, itemIndex) => {
        const content = item.querySelector('.layout-community_content')
        const image = item.querySelector('.layout-community_item_image')
        
        const revealItem = () => {
          item.classList.add('is-revealed')
          if (content) content.classList.add('is-revealed')
          if (image) image.classList.add('is-revealed')
          log(`✅ Item ${itemIndex + 1} révélé`)
        }
        
        const hideItem = () => {
          item.classList.remove('is-revealed')
          if (content) content.classList.remove('is-revealed')
          if (image) image.classList.remove('is-revealed')
          log(`🔽 Item ${itemIndex + 1} masqué`)
        }
        
        // ScrollTrigger Mobile (trigger = item individuel)
        const itemTrigger = ScrollTrigger.create({
          trigger: item,
          start: 'top 70%',
          end: 'bottom 30%',
          onEnter: revealItem,
          onLeave: hideItem,
          onEnterBack: revealItem,
          onLeaveBack: hideItem,
        })
        
        mobileTriggers.push(itemTrigger)
      })
      
      log(`✅ ${mobileTriggers.length} mobile triggers créés pour liste ${listIndex + 1}`)
      
      // ==========================================
      // GESTION RESPONSIVE (enable/disable triggers)
      // ==========================================
      const updateTriggers = () => {
        if (isMobile()) {
          // Mobile : désactive liste, active items
          desktopTrigger.disable()
          mobileTriggers.forEach(t => t.enable())
          log(`📱 Mode mobile activé pour liste ${listIndex + 1}`)
        } else {
          // Desktop : active liste, désactive items
          desktopTrigger.enable()
          mobileTriggers.forEach(t => t.disable())
          log(`💻 Mode desktop activé pour liste ${listIndex + 1}`)
        }
      }
      
      // Init au chargement
      updateTriggers()
      
      // Update au resize (avec debounce)
      let resizeTimeout
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
          ScrollTrigger.refresh()
          updateTriggers()
        }, 200)
      })
    })
    
    log('✅ Community Cards animation initialisée (responsive)')
  })
}