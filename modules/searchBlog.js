// modules/searchBlog.js
import { log, warn } from './utils.js'

export function init() {
  log('🔍 Initialisation Search Blog')

  const searchInput = document.getElementById('searchBlog')
  const searchButton = document.getElementById('searchBlogButton')
  const searchForm = document.getElementById('wf-form-search-blog')

  if (!searchInput) {
    warn('⚠️ Éléments search blog introuvables')
    return
  }

  function handleSearch(e) {
    e.preventDefault()

    const query = searchInput.value.trim()

    if (!query) {
      warn('⚠️ Recherche vide')
      searchInput.focus()
      return
    }

    const encodedQuery = encodeURIComponent(query)
    window.location.href = `/blog-recherche?*_contain=${encodedQuery}`

    log('✅ Redirection vers:', `/blog-recherche?*_contain=${encodedQuery}`)
  }

  // Click sur bouton
  if (searchButton) {
    searchButton.addEventListener('click', handleSearch)
  }

  // Entrée dans l'input
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  })

  // Support du form
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch)
  }

  log('✅ Search Blog initialisé')
}
