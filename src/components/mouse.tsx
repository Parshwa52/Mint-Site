import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGlobalContext } from '@/provider/globalProvider'

export const Mouse = () => {
  // const [cursorStyle, setCursorStyle] = useState('auto')
  const pointerTl: any = useRef()
  const soundTl: any = useRef()
  let cursorStyle = 'auto'

  const handleMouseStatus = (e: any) => {
    const localCursorStyle = getComputedStyle(e.target).cursor
    if (cursorStyle !== localCursorStyle) {
      if (localCursorStyle === 'pointer' && cursorStyle !== 'pointer') {
        pointerTl.current.play()
      }
      if (localCursorStyle !== 'pointer' && cursorStyle === 'pointer') {
        pointerTl.current.reverse()
      }
      cursorStyle = localCursorStyle
    }
  }

  useEffect(() => {
    const ball = document.querySelector('#mouse') as HTMLDivElement

    const ctx = gsap.context(() => {
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
        handleMouseStatus(e)
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

      pointerTl.current = gsap
        .timeline({
          paused: true,
          defaults: {
            ease: 'back.inOut',
          },
        })
        .from(
          '.mouse-center',
          {
            rotate: -90,
          },
          0
        )
        .from(
          '.center-normal.border',
          {
            autoAlpha: 0,
          },
          0
        )

      soundTl.current = gsap
        .timeline({
          paused: true,
          defaults: {
            ease: 'back.inOut',
          },
        })
        .to(
          '.center-normal.dot',
          {
            scale: 0,
          },
          0
        )
        .from(
          '.mouse-wave-text',
          {
            autoAlpha: 0,
          },
          0
        )
        .from(
          '.mouse-wave',
          {
            autoAlpha: 0,
          },
          0
        )
    })

    return () => ctx.revert()
  }, [pointerTl, soundTl])

  return (
    <div id='mouse'>
      <div className='mouse-decoration'>
        <div className='mouse-left-border'></div>
        <div className='mouse-right-border'></div>
      </div>
      <div className='mouse-container'>
        <div className='mouse-center'>
          <div className='center-normal dot'></div>
          {/* Pointer */}
          <div className='center-normal border border-top'></div>
          <div className='center-normal border border-bottom'></div>
        </div>
        {/* Sound */}
        <p className='mouse-wave-text text-top'>Click for</p>
        <p className='mouse-wave-text text-bottom'>sound</p>
        <ul className='mouse-center mouse-wave'>
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
    </div>
  )
}
