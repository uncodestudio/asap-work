// modules/utils.js

/**
 * Utilitaires partagés entre modules
 */

// Détection mode dev/prod
export const isDev = import.meta.env.DEV

// Logs conditionnels (actifs uniquement en dev)
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
 * Debounce function
 */
export function debounce(func, wait = 300) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function
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