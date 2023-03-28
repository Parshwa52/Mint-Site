import type { AppProps } from 'next/app'
// Gsap register plugins
import gsap from 'gsap'
import { Flip } from 'gsap/dist/Flip'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(Flip) // remove if not needed
gsap.registerPlugin(ScrollTrigger)

import '@/styles/globals.sass'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
