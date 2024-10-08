// React
import { useEffect } from 'react'
import { useRouter } from 'next/router'
// Smooth scroll
import Lenis from '@studio-freight/lenis'
// Gsap
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
// Custom components
import SEO from '@/components/SEO'
import { useGlobalContext } from '@/provider/globalProvider'
import { AspectRatioManager } from '@/components/aspectRatioManager'
import { Mouse } from '@/components/mouse'

interface pageProps {
  pageTitle?: string
  pageDesc?: string
  children: React.ReactNode | React.ReactNode[]
}

export const PageLayout = (props: pageProps) => {
  const { setScrollLenis } = useGlobalContext()
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
    // init smooth scroll
    const lenis = new Lenis({
      normalizeWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    lenis.stop()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    setScrollLenis(lenis)

    return () => {
      // destroy and init scroller every time page is changed, in case there will be more pages in future
      lenis.destroy()
      // update the global value
      setScrollLenis(null)
    }
  }, [router])

  return (
    <main>
      <SEO title={props.pageTitle || 'Pluto'} desc={props.pageDesc || ''} />
      <AspectRatioManager />
      <Mouse />
      {props.children}
    </main>
  )
}
