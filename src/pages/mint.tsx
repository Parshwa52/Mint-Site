import { PageLayout } from '@/layout/pageLayout'
import { UI } from '@/components/scene1/ui'
import ThreeJSLoading from '@/components/threeJSLoading'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import VideoScreen from '@/components/videoScreen'
import { useGlobalContext } from '@/provider/globalProvider'

const Mint = () => {
  const [state, setState] = useState(false)
  const { setSoundStatus } = useGlobalContext()

  useEffect(() => {
    setTimeout(() => {
      fadeOut()
      hideDrag()
    }, 10000)
    showDrag()

    gsap.set('#mouse .mouse-decoration .border-background', {
      scaleX: 1,
    })

    gsap.to('body', {
      autoAlpha: 1,
      duration: 1.5,
      ease: 'expo',
    })

    gsap.set('.ui-world', { display: 'block' })
  }, [])

  useEffect(() => {
    setSoundStatus(true)

    const audio = document.querySelector('#audio-1') as HTMLAudioElement

    audio.play()
  }, [])

  function fadeOut() {
    gsap.to('.backround', {
      autoAlpha: 0,
      ease: 'expo.inOut',
      duration: 1.5,
      onComplete: () => {
        setState(true)
        setTimeout(() => {
          gsap.fromTo(
            '.video',
            {
              autoAlpha: 0,
            },
            {
              autoAlpha: 1,
              ease: 'expo.inOut',
              duration: 1.5,
            }
          )
        }, 500)
      },
    })
  }

  function showDrag() {
    gsap
      .timeline()
      .set('.mouse-drag-text', {
        display: 'block',
      })
      .fromTo(
        '.mouse-drag-text',
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          ease: 'expo',
        }
      )
      .to('#mouse .dot', {
        autoAlpha: 0,
        ease: 'expo',
      })
  }

  function hideDrag() {
    gsap
      .timeline()
      .to('.mouse-drag-text', {
        autoAlpha: 0,
        ease: 'expo.in',
      })
      .set('.mouse-drag-text', {
        display: 'none',
      })
  }

  return (
    <PageLayout pageTitle='Pluto mint - Minted' pageDesc='Congratulations'>
      <UI visible />
      {state ? <></> : <ThreeJSLoading />}
      {state ? <VideoScreen /> : <></>}
    </PageLayout>
  )
}

export default Mint
