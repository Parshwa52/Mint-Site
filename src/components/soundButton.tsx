import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGlobalContext } from '@/provider/globalProvider'

export const SoundButton = () => {
  const { isSoundEnabled, setSoundStatus } = useGlobalContext()
  const soundTl = useRef<GSAPTimeline>()
  const latestVolume = useRef<number[]>([])

  useEffect(() => {
    const button = document.querySelector('#sound-button') as HTMLDivElement

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      button.style.display = 'block'
    }

    soundTl.current = gsap
      .timeline({
        repeat: -1,
        yoyo: true,
        paused: true,
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
  }, [])

  useEffect(() => {
    if (soundTl.current) {
      if (isSoundEnabled) {
        soundTl.current.play()
        const audios = document.querySelectorAll('audio')
        audios.forEach((audio, i) => {
          latestVolume.current.push(audio.volume)
          audio.volume = latestVolume.current[i]
        })
      } else {
        soundTl.current.pause()
        const audios = document.querySelectorAll('audio')
        audios.forEach((audio) => {
          latestVolume.current.push(audio.volume)
          audio.volume = 0
        })
        gsap.to('#sound-button .button-wave li', {
          scaleY: 0.25,
          duration: 0.75,
          stagger: {
            amount: 0.5,
          },
          ease: 'expo.inOut',
        })
      }
    }
  }, [soundTl, isSoundEnabled])

  return (
    <div
      id='sound-button'
      onClick={() => {
        setSoundStatus(!isSoundEnabled)
      }}
    >
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
