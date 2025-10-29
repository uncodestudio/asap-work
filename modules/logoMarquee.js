// Module Text Marquee - Version seamless avec modifiers
export function init() {
  if (typeof gsap === 'undefined') return

  document.querySelectorAll('.marquee').forEach(marquee => {
    const content = marquee.firstElementChild
    if (!content) return

    // Duplication pour boucle infinie
    content.innerHTML += content.innerHTML

    // Respect prefers-reduced-motion
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Direction et vitesse
    const isRight = marquee.dataset.direction === 'right'
    const speed = +marquee.dataset.speed || 15

    // Force GPU
    gsap.set(content, { 
      force3D: true,
      xPercent: isRight ? -50 : 0
    })

    if (isRight) {
      // Droite → Gauche avec wrap seamless
      const tl = gsap.to(content, {
        xPercent: 0,
        duration: speed,
        ease: 'none',
        repeat: -1,
        modifiers: {
          xPercent: gsap.utils.wrap(-50, 0)
        }
      })
      marquee.onmouseenter = () => tl.pause()
      marquee.onmouseleave = () => tl.play()
    } else {
      // Gauche → Droite avec wrap seamless
      const tl = gsap.to(content, {
        xPercent: -50,
        duration: speed,
        ease: 'none',
        repeat: -1,
        modifiers: {
          xPercent: gsap.utils.wrap(0, -50)
        }
      })
      marquee.onmouseenter = () => tl.pause()
      marquee.onmouseleave = () => tl.play()
    }
  })
}