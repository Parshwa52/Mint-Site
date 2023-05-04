import { Mouse } from '@/components/mouse'
import { SoundButton } from '@/components/soundButton'
import { ThreeJSBackground } from '@/components/threeJSBackground'
import { PageLayout } from '@/layout/pageLayout'
import { HomepageCity } from '@/sections/city'
// custom components
import { HomepageHero } from '@/sections/hero'

export default function Home() {
  return (
    <PageLayout
      pageTitle='Pluto mint website'
      pageDesc='Cillum pariatur in Lorem consequat velit reprehenderit enim proident.'
    >
      <ThreeJSBackground />
      <HomepageHero />
      <HomepageCity />
      {/* <Mouse /> */}
      <SoundButton />
    </PageLayout>
  )
}
