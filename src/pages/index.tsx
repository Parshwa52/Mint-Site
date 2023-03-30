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
      <HomepageHero />
      <HomepageCity />
    </PageLayout>
  )
}
