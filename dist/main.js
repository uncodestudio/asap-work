(function() {
  console.log("🚀 Initialisation du site...");
  const moduleDetectors = {
    search: {
      selector: "#searchInput",
      modulePath: "./modules/searchBar.js",
      initFn: "init"
    },
    logoMarquee: {
      selector: ".marquee",
      modulePath: "./modules/logoMarquee.js",
      initFn: "init"
    },
    testimoniesVertical: {
      selector: ".splide-testimonies-vertical",
      modulePath: "./modules/testimoniesVertical.js",
      initFn: "init"
    },
    communityCards: {
      selector: ".layout-community_list-wrapper",
      modulePath: "./modules/communityCards.js",
      initFn: "init"
    },
    cardStack: {
      selector: ".card-wrapper_animation",
      modulePath: "./modules/cardStack.js",
      initFn: "init"
    },
    splideVertical: {
      selector: ".splide-vertical-infinite",
      modulePath: "./modules/splideVertical.js",
      initFn: "init"
    },
    faqAccordion: {
      selector: ".faq_accordion",
      modulePath: "./modules/faqAccordion.js",
      initFn: "init"
    },
    talkAboutCarousel: {
      selector: ".talk-about_item",
      modulePath: "./modules/talkAboutCarousel.js",
      initFn: "init"
    }
  };
  const loadPromises = [];
  let modulesLoaded = 0;
  let modulesSkipped = 0;
  Object.keys(moduleDetectors).forEach((moduleName) => {
    const config = moduleDetectors[moduleName];
    const elementExists = document.querySelector(config.selector);
    if (elementExists) {
      console.log(`📦 Chargement ${moduleName}.js...`);
      const promise = import(config.modulePath).then((module) => {
        if (module[config.initFn]) {
          module[config.initFn]();
          modulesLoaded++;
        } else {
          console.error(`❌ Fonction ${config.initFn} introuvable dans ${moduleName}.js`);
        }
      }).catch((error) => {
        console.error(`❌ Erreur chargement ${moduleName}.js:`, error);
      });
      loadPromises.push(promise);
    } else {
      console.log(`⏭️  Skip ${moduleName}.js (aucun élément "${config.selector}")`);
      modulesSkipped++;
    }
  });
  if (loadPromises.length === 0) {
    console.log("ℹ️  Aucun module nécessaire sur cette page");
    console.log("✅ Site initialisé !");
  } else {
    Promise.all(loadPromises).then(() => {
      console.log(`✅ ${modulesLoaded} module(s) chargé(s), ${modulesSkipped} skippé(s)`);
      console.log("✅ Site initialisé avec succès !");
    }).catch((error) => {
      console.error("❌ Erreur lors de l'initialisation:", error);
    });
  }
})();
