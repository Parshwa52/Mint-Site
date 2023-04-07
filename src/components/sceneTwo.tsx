// React
import { useEffect, useMemo, useRef } from 'react'
// gsap
import gsap from 'gsap'
import Image from 'next/image'
import { Split } from '@/utils/split'
import { Q2MaskCanvas } from './q2MaskCanvas'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import ConnectWallet from './ui/ConnectWallet'

export const SceneTwo = () => {
  const scene2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // pin section 1 - fade out
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '#home-hero',
            endTrigger: '#home-city',
            start: 'bottom bottom',
            end: 'top top',
            scrub: true,
          },
          defaults: {
            ease: 'none',
          },
        })
        .to(
          '.scene-bg canvas',
          {
            autoAlpha: 0,
            duration: 100,
          },
          0
        )
        .fromTo(
          '.scene-bg',
          {
            background:
              'linear-gradient(#000000 10%, #000000 40%, #000000 65%, #000000 100%)',
          },
          {
            duration: 66,
            background:
              'linear-gradient(#000000 10%, #1B2947 40%, #2A425F 65%, #89DFF7 100%)',
          },
          0
        )
        .to(
          '.scene-bg',
          {
            duration: 33,
            background:
              'linear-gradient(#1B2947 10%, #1B2947 40%, #2A425F 65%, #89DFF7 100%)',
          },
          34
        )
        .to(
          '.scene-bg',
          {
            duration: 34,
            background:
              'linear-gradient(#89DFF7 10%, #89DFF7 40%, #89DFF7 65%, #89DFF7 100%)',
          },
          64
        )
      // pin section 2 - fade in
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '#home-city',
            start: 'top top',
            end: '+=4000',
            pin: true,
            scrub: true,
          },
          defaults: {
            willChange: 'transform, opacity',
            duration: 25,
            stagger: {
              amount: 15,
            },
            ease: 'power1',
          },
        })
        .from(
          '.clouds > *',
          {
            yPercent: -50,
            autoAlpha: 0,
          },
          0
        )
        .from(
          '.city-container .buildings-center > *',
          {
            yPercent: 100,
            stagger: 10,
          },
          0
        )
        .from(
          '.city-container .buildings-right > *',
          {
            xPercent: 100,
            stagger: 10,
          },
          5
        )
        .from(
          '.city-container .buildings-left > *',
          {
            xPercent: -100,
            stagger: 10,
          },
          5
        )
        .from(
          '.city-container .buildings-right > *',
          {
            // xPercent: 100,
            yPercent: 100,
            stagger: 10,
          },
          10
        )
        .from(
          '.city-container .buildings-left > *',
          {
            // xPercent: -100,
            yPercent: 100,
            stagger: 10,
          },
          10
        )
        .from(
          '.city-container .cars > *',
          {
            yPercent: 100,
            duration: 20,
          },
          20
        )
        .from(
          '.city-container .background > *',
          {
            autoAlpha: 0,
            duration: 60,
            ease: 'power1.inOut',
            // yPercent: 50,
            // stagger: 10,
          },
          20
        )
        .fromTo(
          '.city-container .buildings-logo > *',
          {
            autoAlpha: 0,
            yPercent: -100,
          },
          {
            autoAlpha: 1,
            yPercent: 2,
            duration: 30,
            ease: 'expo',
          },
          '>-75%'
        )
        .addLabel('cityBuilded', '>+50')
        .from(
          '.city-container .buildings-glow > *',
          {
            autoAlpha: 0,
            duration: 25,
            ease: 'back.inOut',
          },
          'cityBuilded-=20'
        )
        .to(
          '.city-container .buildings-logo > *',
          {
            yPercent: -50,
            autoAlpha: 0,
            duration: 15,
            ease: 'power1.in',
          },
          'cityBuilded'
        )
        // .to(
        //   '.city-container',
        //   {
        //     willChange: 'filter',
        //     filter: 'blur(2px)',
        //     duration: 25,
        //     ease: 'expo.inOut',
        //   },
        //   'cityBuilded'
        // )
        .from(
          '.q2-container',
          {
            yPercent: 100,
            duration: 25,
            ease: 'expo.inOut',
          },
          'cityBuilded'
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className='scene scene-2' ref={scene2}>
      <div className='city-container'>
        <div className='background'>
          <Building src='/assets/buildings/pluto-background.png' />
        </div>
        <div className='clouds'>
          <Building src='/assets/clouds/2_Clouds1.png' />
          <Building src='/assets/clouds/3_Clouds2.png' />
          <Building src='/assets/clouds/10_Clouds3.png' />
        </div>
        <div className='buildings buildings-center'>
          <Building src='/assets/buildings/pluto-building-14.png' />
        </div>
        <div className='buildings cars'>
          <Building src='/assets/buildings/pluto-cars.png' />
        </div>
        <div className='buildings buildings-left'>
          <Building src='/assets/buildings/pluto-building-9.png' />
          <Building src='/assets/buildings/pluto-building-11.png' />
          <Building src='/assets/buildings/pluto-building-13.png' />
          <Building src='/assets/clouds/16_Clouds4.png' />

          <Building src='/assets/buildings/pluto-building-7.png' />
          <Building src='/assets/buildings/pluto-building-8.png' />
          <Building src='/assets/buildings/pluto-building-3.png' />
        </div>
        <div className='buildings buildings-right'>
          <Building src='/assets/buildings/pluto-building-6.png' />
          <Building src='/assets/buildings/pluto-building-15.png' />
          <Building src='/assets/buildings/pluto-building-2.png' />
          <Building src='/assets/buildings/pluto-building-12.png' />
          <Building src='/assets/clouds/20_Clouds5.png' />
          <Building src='/assets/buildings/pluto-building-10.png' />
          <Building src='/assets/buildings/pluto-building-5.png' />
          <Building src='/assets/buildings/pluto-building-1.png' />
          <Building src='/assets/buildings/pluto-building-4.png' />
        </div>
        <div className='buildings buildings-glow'>
          <Building src='/assets/buildings/pluto-glow.png' />
        </div>
        <div className='buildings buildings-logo'>
          <Building src='/assets/buildings/pluto-logo.png' />
        </div>
      </div>
      <div className='q2-container'>
        <div>
          <Image
            src='/assets/sunbeam_2.png'
            alt='Q2 mascot'
            fill
            priority
            className='q2'
            sizes='(max-width: 768px) 50vw, (max-width: 1200px) 75vw, 100vw'
            style={{
              objectFit: 'contain',
            }}
          />
          <div className='q2-mask-container'>
            <div className='mask-canvas'>
              <Q2MaskCanvas />
            </div>
          </div>
          <div className='q2-mask-wallet'>{/* <ConnectWallet /> */}</div>
        </div>
      </div>
    </div>
  )
}

const Building = ({ src, className }: { src: string; className?: string }) => {
  return (
    <div className='building-container'>
      <img className='building' alt='building' src={src} />
      {/* <Image
        src={src}
        alt='building'
        fill
        className='building'
        style={{
          objectFit: 'cover',
        }}
      /> */}
    </div>
  )
}
