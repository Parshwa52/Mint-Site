import { PageLayout } from '@/layout/pageLayout'
import { UI } from '@/components/scene1/ui'
import ThreeJSLoading from '@/components/threeJSLoading'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import VideoScreen from '@/components/videoScreen'

const Mint = () => {
  const [state, setState] = useState(false)

  useEffect(() => {
    gsap.to('body', {
      autoAlpha: 1,
      duration: 1.5,
      ease: 'expo',
    })
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

  useEffect(() => {
    setTimeout(() => {
      fadeOut()
    }, 5000)
  }, [])

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
