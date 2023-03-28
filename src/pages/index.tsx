import { PageLayout } from '@/layout/pageLayout'
// custom components
import { HomepageHero } from '@/sections/hero'

export default function Home() {
  return (
    <PageLayout
      pageTitle='Pluto mint website'
      pageDesc='Cillum pariatur in Lorem consequat velit reprehenderit enim proident.'
    >
      <HomepageHero />
    </PageLayout>
  )
}
