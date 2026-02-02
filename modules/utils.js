// modules/utils.js

/**
 * Détection mode production
 */
const isDev = false // En prod, Terser va supprimer tout ce qui dépend de ça

// Logs (supprimés automatiquement en prod par Terser)
export const log = isDev ? console.log.bind(console) : () => {}
export const warn = isDev ? console.warn.bind(console) : () => {}
export const error = isDev ? console.error.bind(console) : () => {}

/**
 * Attendre que le DOM soit prêt
 */
export function ready(callback) {
  if (document.readyState !== 'loading') {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', callback)
  }
}

/**
 * Debounce
 */
export function debounce(func, wait = 300) {
  let timeout
  return function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle
 */
export function throttle(func, limit = 300) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}