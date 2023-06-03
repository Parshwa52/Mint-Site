import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGlobalContext } from '@/provider/globalProvider'
import { useRouter } from 'next/router'

export const Mouse = () => {
  const router = useRouter()
  const { isSoundEnabled, setSoundStatus } = useGlobalContext()
  const pointerTl: any = useRef()
  const clickingTl: any = useRef()
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
    const isMobile =
      /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
      /Android/i.test(navigator.userAgent) ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0

    if (isMobile) {
      gsap.set(ball, { autoAlpha: 0 })
      return
    }

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
          '.center-normal.dot',
          {
            autoAlpha: 0,
          },
          0
        )
      clickingTl.current = gsap
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
        .to(
          '.mouse-center',
          {
            rotate: 90,
          },
          1
        )
        .to(
          '.center-normal.border',
          {
            autoAlpha: 0,
          },
          1
        )

      window.addEventListener('click', () => {
        clickingTl.current.restart()
      })
    })

    return () => ctx.revert()
  }, [pointerTl, clickingTl])

  const handleClick = () => {
    console.log('clicked')
    setSoundStatus(true)
    window.removeEventListener('click', handleClick)
  }

  useEffect(() => {
    if (router.asPath !== '/') {
      gsap.set(['.mouse-wave', '.mouse-wave-text'], { display: 'none' })
      gsap.set(
        [
          '#mouse .border-top .border-background',
          '#mouse .border-bottom .border-background',
        ],
        {
          scaleX: 1,
        }
      )
    }
    if (!soundTl.current && router.asPath === '/') {
      gsap.fromTo(
        '.mouse-wave li',
        {
          scaleY: 0.1,
        },
        {
          scaleY: 1,
          duration: 0.75,
          repeat: -1,
          yoyo: true,
          stagger: {
            grid: 'auto',
            from: 'center',
            amount: 0.5,
          },
          ease: 'back.inOut',
        }
      )
      soundTl.current = gsap
        .timeline({
          defaults: {
            ease: 'back.inOut',
            duration: 1.5,
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

      window.addEventListener('click', handleClick)
    }

    if (isSoundEnabled && soundTl.current && router.asPath === '/') {
      soundTl.current.reverse()
    }
  }, [soundTl, isSoundEnabled, router])

  return (
    <div id='mouse'>
      <div className='mouse-decoration'>
        <div className='mouse-left-border border-top'>
          <div className='border-background'></div>
        </div>
        <div className='mouse-left-border border-bottom'>
          <div className='border-background'></div>
        </div>
        <div className='mouse-right-border'></div>
      </div>
      <div className='mouse-container'>
        <div className='mouse-center'>
          <div className='center-normal dot'></div>
          {/* Pointer */}
          <div className='center-normal border'></div>
        </div>
        {/* Sound */}
        <p className='mouse-wave-text text-top'>Click for</p>
        <p className='mouse-wave-text text-bottom'>Sound</p>
        <ul className='mouse-center mouse-wave'>
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
        {/* Scroll */}
        <div className='mouse-center mouse-scroll'>Scroll</div>
        {/* Drag */}
        <p className='mouse-drag-text text-top'>+</p>
        <p className='mouse-drag-text text-bottom'>-</p>
        <p className='mouse-drag-text text-center'>Drag</p>
      </div>
    </div>
  )
}
