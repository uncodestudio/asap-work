// modules/scrollNav.js - VERSION FINALE
export function initScrollNav() {
  // Vérifier dépendances
  if (typeof gsap === 'undefined' || !window.ScrollTrigger) {
    console.error('❌ GSAP ou ScrollTrigger non chargé');
    return;
  }
  
  if (!gsap.plugins.scrollTo) {
    console.error('❌ GSAP ScrollToPlugin non chargé');
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  console.log('📜 Module ScrollNav - Initialisation...');
  
  // ==========================================
  // DÉTECTION
  // ==========================================
  
  const sections = document.querySelectorAll('.section_snap-scroll');
  const links = document.querySelectorAll('.menu-scroll_link');
  
  if (!sections.length) {
    console.log('   ℹ️  Aucune section .section_snap-scroll détectée');
    return;
  }
  
  if (!links.length) {
    console.warn('⚠️  Sections trouvées mais aucun lien .menu-scroll_link');
    return;
  }
  
  console.log(`   ✅ ${sections.length} section(s), ${links.length} lien(s)`);
  
  // ==========================================
  // MISE À JOUR LIENS ACTIFS
  // ==========================================
  function updateActiveLink(activeIndex) {
    links.forEach((link, index) => {
      link.classList.toggle('is-active', index === activeIndex);
    });
  }
  
  // ==========================================
  // SCROLLTRIGGER POUR CHAQUE SECTION
  // ==========================================
  sections.forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      end: 'bottom bottom',
      onEnter: () => updateActiveLink(index),
      onEnterBack: () => updateActiveLink(index),
      onLeaveBack: () => {
        if (index > 0) updateActiveLink(index - 1);
      }
    });
  });
  
  // ==========================================
  // SMOOTH SCROLL AU CLIC
  // ==========================================
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.menu-scroll_link');
    if (!link) return;
    
    e.preventDefault();
    const targetId = link.getAttribute('href');
    
    if (!targetId || targetId === '#') return;
    
    gsap.to(window, {
      scrollTo: { y: targetId },
      duration: 1,
      ease: "power2.inOut"
    });
  });
  
  console.log(`📜 Module ScrollNav - ✅ ${sections.length} section(s) configurée(s)`);
  
  // ==========================================
  // REFRESH SCROLLTRIGGER
  // ==========================================
  if (!window.__scrollNavRefreshAttached) {
    window.__scrollNavRefreshAttached = true;
    
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
      console.log('📜 ScrollTrigger rafraîchi (load)');
      
      setTimeout(() => {
        ScrollTrigger.refresh();
        console.log('📜 ScrollTrigger rafraîchi (delayed)');
      }, 1000);
    });
  }
}