// modules/search.js
import { log, warn } from './utils.js'

export function init() {
  log('🔍 Initialisation Search')
  
  const searchInput = document.getElementById('searchInput')
  const searchButton = document.getElementById('searchButton')
  const searchForm = searchInput?.closest('form') // Détecte auto le form parent
  
  if (!searchInput || !searchButton) {
    warn('⚠️ Éléments search introuvables')
    return
  }
  
  function handleSearch(e) {
    e.preventDefault()
    
    const query = searchInput.value.trim()
    
    // Ne rien faire si recherche vide
    if (!query) {
      warn('⚠️ Recherche vide')
      searchInput.focus()
      return
    }
    
    // Encoder et rediriger avec ?*=
    const encodedQuery = encodeURIComponent(query)
    window.location.href = `/annonces?*=${encodedQuery}`
    
    log('✅ Redirection vers:', `/annonces?*=${encodedQuery}`)
  }
  
  // Click sur bouton
  searchButton.addEventListener('click', handleSearch)
  
  // Entrée dans l'input
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  })
  
  // Support du form si présent
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch)
  }
  
  log('✅ Search initialisé')
}