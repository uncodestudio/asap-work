// Module Radio Button Active - Version data-attributes
// Ajoute .is-active au parent quand le radio est checked

export function init() {
  const radios = document.querySelectorAll('[data-radio-button]')
  if (!radios.length) return

  function updateActive(radio) {
    // Enlever .is-active de tous les radios du même groupe
    document.querySelectorAll(`[data-radio-button][name="${radio.name}"]`).forEach(r => {
      const field = r.closest('[data-radio-field]')
      if (field) field.classList.remove('is-active')
    })
    
    // Ajouter .is-active au parent du radio coché
    const field = radio.closest('[data-radio-field]')
    if (field) field.classList.add('is-active')
  }

  // Init + Events
  radios.forEach(radio => {
    if (radio.checked) updateActive(radio)
    radio.addEventListener('change', () => updateActive(radio))
  })
}

export function cleanup() {
  document.querySelectorAll('[data-radio-field].is-active').forEach(el => {
    el.classList.remove('is-active')
  })
}