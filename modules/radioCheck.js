// Module Radio Button Active - Version légère
// Ajoute .is-active au parent (.radio_field) quand le radio est checked

export function init() {
  const radios = document.querySelectorAll('.radio_button')
  if (!radios.length) return

  function updateActive(radio) {
    // Enlever .is-active de tous les radios du même groupe
    document.querySelectorAll(`.radio_button[name="${radio.name}"]`).forEach(r => {
      r.closest('.radio_field')?.classList.remove('is-active')
    })
    
    // Ajouter .is-active au parent du radio coché
    radio.closest('.radio_field')?.classList.add('is-active')
  }

  // Init + Events
  radios.forEach(radio => {
    if (radio.checked) updateActive(radio)
    radio.addEventListener('change', () => updateActive(radio))
  })
}

export function cleanup() {
  document.querySelectorAll('.radio_field.is-active').forEach(el => {
    el.classList.remove('is-active')
  })
}