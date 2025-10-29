// main.js - Lazy Loading Auto-Detection
(function() {
  'use strict';
  
  console.log('🚀 Initialisation du site...');
  
  // ==========================================
  // CONFIGURATION DÉTECTION
  // ==========================================
  const moduleDetectors = {
    sliders: {
      selector: '.splide',
      modulePath: './modules/sliders.js',
      initFn: 'initSliders'
    },
    scrollNav: {
      selector: '.bootcamp_snap-scroll, .section_snap-scroll',
      modulePath: './modules/scrollNav.js',
      initFn: 'initScrollNav'
    },
    scrollTo: {
      selector: '.button-form, .fs-radio_field',
      modulePath: './modules/scrollTo.js',
      initFn: 'initScrollTo'
    },
    counters: {
      selector: '.counterup',
      modulePath: './modules/counters.js',
      initFn: 'initCounters'
    },
    svg: {
      selector: '.svg-code',
      modulePath: './modules/svg.js',
      initFn: 'initSVG'
    },
    cmsTabs: {
      selector: '.cms-list',
      modulePath: './modules/cmsTabs.js',
      initFn: 'initCMSTabs'
    }
  };
  
  // ==========================================
  // LAZY LOADING CONDITIONNEL
  // ==========================================
  const loadPromises = [];
  let modulesLoaded = 0;
  let modulesSkipped = 0;
  
  Object.keys(moduleDetectors).forEach(moduleName => {
    const config = moduleDetectors[moduleName];
    const elementExists = document.querySelector(config.selector);
    
    if (elementExists) {
      console.log(`📦 Chargement ${moduleName}.js...`);
      
      const promise = import(config.modulePath)
        .then(module => {
          if (module[config.initFn]) {
            module[config.initFn]();
            modulesLoaded++;
          } else {
            console.error(`❌ Fonction ${config.initFn} introuvable dans ${moduleName}.js`);
          }
        })
        .catch(error => {
          console.error(`❌ Erreur chargement ${moduleName}.js:`, error);
        });
      
      loadPromises.push(promise);
    } else {
      console.log(`⏭️  Skip ${moduleName}.js (aucun élément "${config.selector}")`);
      modulesSkipped++;
    }
  });
  
  // ==========================================
  // FINALISATION
  // ==========================================
  if (loadPromises.length === 0) {
    console.log('ℹ️  Aucun module nécessaire sur cette page');
    console.log('✅ Site initialisé !');
  } else {
    Promise.all(loadPromises)
      .then(() => {
        console.log(`✅ ${modulesLoaded} module(s) chargé(s), ${modulesSkipped} skippé(s)`);
        console.log('✅ Site initialisé avec succès !');
      })
      .catch(error => {
        console.error('❌ Erreur lors de l\'initialisation:', error);
      });
  }
  
})();