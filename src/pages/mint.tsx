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
      .from('.mouse-drag-text', {
        autoAlpha: 0,
        ease: 'expo',
      })
  }

  function hideDrag() {
    gsap
      .timeline()
      .from('.mouse-drag-text', {
        autoAlpha: 0,
        ease: 'expo',
      })
      .set('.mouse-drag-text', {
        display: 'block',
      })
  }

  return (
    <PageLayout
      pageTitle='Pluto mint - Minted'
      pageDesc='Cillum pariatur in Lorem consequat velit reprehenderit enim proident.'
    >
      <UI visible />

      {state ? <></> : <ThreeJSLoading />}
      {state ? <VideoScreen /> : <></>}
    </PageLayout>
  )
}

export default Mint
