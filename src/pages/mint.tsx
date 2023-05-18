import { PageLayout } from '@/layout/pageLayout'
import { UI } from '@/components/scene1/ui'
import ThreeJSLoading from '@/components/threeJSLoading'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import VideoScreen from '@/components/videoScreen'

const Mint = () => {
  const [state, setState] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      fadeOut()
      hideDrag()
    }, 10000)
    showDrag()

    gsap.to('body', {
      autoAlpha: 1,
      duration: 1.5,
      ease: 'expo',
    })

    gsap.set('.ui-world', { display: 'block' })
  }, [])

  function fadeOut() {
    gsap.to('.backround', {
      autoAlpha: 0,
      ease: 'expo.inOut',
      duration: 1.5,
      onComplete: () => {
        // gsap.set('.background', { display: 'none' })
        setState(true)
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
      .to('#mouse .dot', {
        autoAlpha: 1,
        ease: 'expo.in',
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
