// main.js
import { init as initSearch } from './modules/searchBar.js'
import { init as initLogoMarquee } from './modules/logoMarquee.js'
import { init as initTestimoniesVertical } from './modules/testimoniesVertical.js'
import { init as initCommunityCards } from './modules/communityCards.js'
import { init as initCardStack } from './modules/cardStack.js'
import { init as initSplideVertical } from './modules/splideVertical.js'
import { init as initFaqAccordion } from './modules/faqAccordion.js'
import { init as initTalkAboutCarousel } from './modules/talkAboutCarousel.js'

console.log('🚀 Initialisation du site...')

const moduleDetectors = {
  search: {
    selector: '#searchInput',
    initFn: initSearch
  },
  logoMarquee: {
    selector: '.marquee',
    initFn: initLogoMarquee
  },
  testimoniesVertical: {
    selector: '.splide-testimonies-vertical',
    initFn: initTestimoniesVertical
  },
  communityCards: {
    selector: '.layout-community_list-wrapper',
    initFn: initCommunityCards
  },
  cardStack: {
    selector: '.card-wrapper_animation',
    initFn: initCardStack
  },
  splideVertical: {
    selector: '.splide-vertical-infinite',
    initFn: initSplideVertical
  },
  faqAccordion: {
    selector: '.faq_accordion',
    initFn: initFaqAccordion
  },
  talkAboutCarousel: {
    selector: '.talk-about_item',
    initFn: initTalkAboutCarousel
  }
}

let modulesLoaded = 0
let modulesSkipped = 0

Object.keys(moduleDetectors).forEach((moduleName) => {
  const config = moduleDetectors[moduleName]
  const elementExists = document.querySelector(config.selector)
  
  if (elementExists) {
    console.log(`📦 Init ${moduleName}...`)
    try {
      config.initFn()
      modulesLoaded++
    } catch (error) {
      console.error(`❌ Erreur ${moduleName}:`, error)
    }
  } else {
    console.log(`⏭️ Skip ${moduleName}`)
    modulesSkipped++
  }
})

console.log(`✅ ${modulesLoaded} module(s) chargé(s), ${modulesSkipped} skippé(s)`)
console.log('✅ Site initialisé !')