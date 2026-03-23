// main.js
import { init as initSearch } from './modules/searchBar.js'
import { init as initLogoMarquee } from './modules/logoMarquee.js'
import { init as initTestimoniesVertical } from './modules/testimoniesVertical.js'
import { init as initCommunityCards } from './modules/communityCards.js'
import { init as initCardStack } from './modules/cardStack.js'
import { init as initSplideVertical } from './modules/splideVertical.js'
import { init as initFaqAccordion } from './modules/faqAccordion.js'
import { init as initTalkAboutCarousel } from './modules/talkAboutCarousel.js'
import { init as initBlogCtaInjector } from './modules/blogCtaInjector.js'
import { init as initCategoriesSlider } from './modules/categoriesSlider.js'
import { init as initSearchBlog } from './modules/searchBlog.js'
import { init as initSearchQueryDisplay } from './modules/searchQueryDisplay.js'
import { init as initSearchModal } from './modules/searchModal.js'
import { init as initTableOfContents } from './modules/tableOfContents.js'

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
  },
  blogCtaInjector: {
    selector: '.all-article_list',
    initFn: initBlogCtaInjector
  },
  categoriesSlider: {
    selector: '.splide-categories',
    initFn: initCategoriesSlider
  },
  searchBlog: {
    selector: '#searchBlog',
    initFn: initSearchBlog
  },
  searchQueryDisplay: {
    selector: '[data-search-query]',
    initFn: initSearchQueryDisplay
  },
  searchModal: {
    selector: '.blog_search-modal-wrapper',
    initFn: initSearchModal
  },
  tableOfContents: {
    selector: '[data-toc="list"]',
    initFn: initTableOfContents
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