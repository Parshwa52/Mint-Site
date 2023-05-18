import { ThreeJSBackground } from '@/components/threeJSBackground'
import { PageLayout } from '@/layout/pageLayout'
import { HomepageCity } from '@/sections/city'
import { UI } from '@/components/scene1/ui'
// custom components
import { HomepageHero } from '@/sections/hero'
import { AudioManager } from '@/components/audioManager'
import Modal from '@/components/ui/Modal'

export default function Home() {
  return (
    <PageLayout
      pageTitle='Pluto mint website'
      pageDesc='Cillum pariatur in Lorem consequat velit reprehenderit enim proident.'
    >
      <ThreeJSBackground />
      <HomepageHero />
      <HomepageCity />
      <UI />
      <Modal />
    </PageLayout>
  )
}
