import { useEffect } from 'react'
import { gsap } from 'gsap'
export const SoundButton = () => {
  useEffect(() => {
    const button = document.querySelector('#sound-button') as HTMLDivElement

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      button.style.display = 'block'
    }

    const ctx = gsap.context(() => {
      const waves = gsap
        .timeline({
          repeat: -1,
          yoyo: true,
          defaults: {
            duration: 0.75,
            stagger: {
              amount: 0.5,
            },
            ease: 'expo.inOut',
          },
        })
        .to(
          '#sound-button .button-wave li',
          {
            scaleY: 0.25,
          },
          0
        )
        .to(
          '#sound-button .button-wave li',
          {
            scaleY: 1,
          },
          0.75
        )
    })
  }, [])

  return (
    <div id='sound-button'>
      <ul className='button-wave'>
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
    </div>
  )
}
