// React
import { useEffect } from 'react'
import { useRouter } from 'next/router'
// Smooth scroll
import Lenis from '@studio-freight/lenis'
// Gsap
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
// Custom components
import SEO from '@/components/SEO'

interface pageProps {
  pageTitle?: string
  pageDesc?: string
  children: React.ReactNode | React.ReactNode[]
}

export const PageLayout = (props: pageProps) => {
  const router = useRouter()

  useEffect(() => {
    // init smooth scroll
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      // destroy and init scroller every time page is changed, in case there will be more pages in future
      lenis.destroy()
      // update the global value
    }
  }, [router])

  return (
    <main>
      <SEO title={props.pageTitle || 'Pluto'} desc={props.pageDesc || ''} />
      {props.children}
    </main>
  )
}
