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
    
    lists.forEach((list, listIndex) => {
      const items = list.querySelectorAll('.layout-community_item')
      
      if (!items.length) {
        warn(`⚠️ Aucun item dans la liste ${listIndex + 1}`)
        return
      }
      
      const revealItems = () => {
        // Tous en même temps - pas de setTimeout
        items.forEach((item) => {
          const content = item.querySelector('.layout-community_content')
          const image = item.querySelector('.layout-community_item_image')
          
          item.classList.add('is-revealed')
          if (content) content.classList.add('is-revealed')
          if (image) image.classList.add('is-revealed')
        })
        log(`✅ Liste ${listIndex + 1}: ${items.length} items révélés`)
      }
      
      const hideItems = () => {
        // Tous en même temps - pas de setTimeout
        items.forEach((item) => {
          const content = item.querySelector('.layout-community_content')
          const image = item.querySelector('.layout-community_item_image')
          
          item.classList.remove('is-revealed')
          if (content) content.classList.remove('is-revealed')
          if (image) image.classList.remove('is-revealed')
        })
        log(`🔽 Liste ${listIndex + 1}: ${items.length} items masqués`)
      }
      
      ScrollTrigger.create({
        trigger: list,
        start: 'top 50%',
        end: 'bottom 10%',
        onEnter: revealItems,
        onLeave: hideItems,
        onEnterBack: revealItems,
        onLeaveBack: hideItems,
        // markers: true,
      })
      
      log(`✅ ScrollTrigger créé pour liste ${listIndex + 1} (${items.length} items)`)
    })
    
    log('✅ Community Cards animation initialisée')
  })
}