import { useEffect } from 'react'
// custom components
import { Background } from '@/components/backgroundOne'
import { SceneOne } from '@/components/sceneOne'

export const HomepageHero = () => {
  useEffect(() => {}, [])
  return (
    <section id='home-hero'>
      <Background />
      <SceneOne />
    </section>
  )
}
