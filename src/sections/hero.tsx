import { useEffect } from 'react'
// custom components
import { Background } from '@/components/backgroundOne'
import { SceneOne } from '@/components/sceneOne'
import { ThreeJSBackground } from '@/components/threeJSBackground'

export const HomepageHero = () => {
  useEffect(() => {}, [])
  return (
    <section id='home-hero'>
      {/* <Background /> */}
      {/* <ThreeJSBackground /> */}
      <SceneOne />
    </section>
  )
}
