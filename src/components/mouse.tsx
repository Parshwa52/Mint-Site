import { useEffect } from 'react'
import { gsap } from 'gsap'

export const Mouse = () => {
  useEffect(() => {
    const ball = document.querySelector('#mouse') as HTMLDivElement

    const ctx = gsap.context(() => {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        ball.style.display = 'none'
      } else {
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
            '#mouse .mouse-wave li',
            {
              scaleY: 0.25,
            },
            0
          )
          .to(
            '#mouse .mouse-wave li',
            {
              scaleY: 1,
            },
            0.75
          )

        gsap.set(ball, { xPercent: -50, yPercent: -50 })
        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        const mouse = { x: pos.x, y: pos.y }
        const speed = 0.2
        let isActive = false

        const xSet = gsap.quickSetter(ball, 'x', 'px')
        const ySet = gsap.quickSetter(ball, 'y', 'px')

        window.addEventListener('resize', () => {
          pos.x = window.innerWidth / 2
          pos.y = window.innerHeight / 2
          mouse.x = pos.x
          mouse.y = pos.y
        })

        window.addEventListener('mousemove', (e) => {
          mouse.x = e.x
          mouse.y = e.y
        })

        window.addEventListener('click', () => {
          const audio = document.querySelector(
            '#mouse audio'
          ) as HTMLAudioElement
          if (audio) audio.play()
          gsap.timeline().set('#sound-button', { display: 'block' }).fromTo(
            '#sound-button',
            { scale: 0 },
            {
              scale: 1,
              ease: 'back.inOut',
            }
          )
          gsap.to(ball, {
            scale: 0,
            duration: 1.25,
            ease: 'back.inOut',
            onComplete: () => {
              waves.kill()
              isActive = false
            },
          })
        })

        gsap.ticker.add(() => {
          // adjust speed for higher refresh monitors
          if (!isActive) {
            const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio())
            pos.x += (mouse.x - pos.x) * dt
            pos.y += (mouse.y - pos.y) * dt
            xSet(pos.x)
            ySet(pos.y)
          }
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div id='mouse'>
      <div>
        <ul className='mouse-wave'>
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
        <audio
          src='/assets/sounds/Space-Ambience.mp3'
          style={{ display: 'none' }}
        ></audio>
      </div>
      <p>Click for sound</p>
    </div>
  )
}
