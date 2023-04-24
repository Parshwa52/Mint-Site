// React
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
// gsap
import gsap from 'gsap'
// Rainbow & Wagmi
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
// Custom components
import { useGlobalContext } from '@/provider/globalProvider'
import { Q2MaskCanvas } from './q2MaskCanvas'
// Images imports
import img1 from '@/assets/placements/1_Cloud1.png'
import img2 from '@/assets/placements/2_Cloud2.png'
import img3 from '@/assets/placements/3_Cloud3.png'
import img4 from '@/assets/placements/4_Base.png'
import img5 from '@/assets/placements/5_Cloud4.png'
import img6 from '@/assets/placements/6_Cloud5.png'
import img7 from '@/assets/placements/7_Cloud6.png'
import img8 from '@/assets/placements/8_Cloud7.png'
import img9 from '@/assets/placements/9_Cloud8.png'
import img10 from '@/assets/placements/13_Octopus_leftmost_Building.png'
import img11 from '@/assets/placements/14_Octopus_rightmost_Building.png'
import img12 from '@/assets/placements/11_Octopus_left_Building.png'
import img13 from '@/assets/placements/12_Octopus_right_Building.png'
import img14 from '@/assets/placements/10_Octopus_Building.png'
import img15 from '@/assets/placements/15_Triangular_Building.png'
import img16 from '@/assets/placements/16_Ground_Bridge_Lab_Building.png'
import img17 from '@/assets/placements/17_Studio_Building.png'
import img18 from '@/assets/placements/18_Mushroom_Building.png'
import img19 from '@/assets/placements/19_Whale_Building.png'
import img20 from '@/assets/placements/20_Crayon_Building.png'
import img21 from '@/assets/placements/21_Tall_Building.png'
import img22 from '@/assets/placements/22_Frog_Building.png'
import img23 from '@/assets/placements/23_White_Building.png'
import img24 from '@/assets/placements/24_FLO_Building.png'
import img25 from '@/assets/placements/25_POP_Building.png'
import img26 from '@/assets/placements/26_Characters.png'
import img27 from '@/assets/placements/27_Green_Structure.png'
import img28 from '@/assets/placements/28_Cars_smokes_lines.png'
import img29 from '@/assets/placements/29_Clouds9.png'
import img30 from '@/assets/placements/30_Clouds10.png'
import img31 from '@/assets/placements/31_Clouds11.png'
import img32 from '@/assets/placements/32_Clouds12.png'
import img33 from '@/assets/placements/33_Clouds13.png'
import img34 from '@/assets/placements/34_Clouds14.png'
import img35 from '@/assets/placements/35_Clouds15.png'
import img36 from '@/assets/logo.png'
import ConnectWallet from '../ui/ConnectWallet'

export const SceneTwo = () => {
  const { isSoundEnabled, scrollLenis, soundsArray } = useGlobalContext()
  // const { isConnecting, isConnected, isDisconnected } = useAccount()
  const scene2 = useRef<HTMLDivElement>(null)
  const [currExpression, setCurrExpression] = useState(0)

  useEffect(() => {
    let interval: any
    if (currExpression === 0 || currExpression === 1) {
      interval = setInterval(() => {
        if (currExpression === 0) setCurrExpression(1)
        else if (currExpression === 1) setCurrExpression(5)
      }, 1000)
    }
    if (currExpression === 5 || currExpression === 6 || currExpression === 7) {
      interval = setInterval(() => {
        if (currExpression === 5) setCurrExpression(6)
        else if (currExpression === 6) setCurrExpression(7)
        else if (currExpression === 7) setCurrExpression(0)
      }, 1500)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currExpression])

  // useEffect(() => {
  //   console.log('wallet is connecting ', isConnecting)
  //   console.log('wallet is connected ', isConnected)
  //   console.log('wallet is disconnected ', isDisconnected)
  // }, [isConnecting, isConnected, isDisconnected])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // clouds animation
      const cloudsTl = gsap.timeline({
        paused: true,
        repeat: -1,
        reversed: true,
      })

      gsap.utils.toArray('.clouds > *').forEach((cloud: any, i) => {
        cloudsTl.fromTo(
          cloud,
          {
            xPercent: -100,
          },
          {
            xPercent: 100,
            willChange: 'transform',
            duration: 10,
            ease: 'power1.inOut',
          },
          i / 4
        )
      })
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
              'linear-gradient(rgba(0, 0, 0,1) 0%, rgba(0, 0, 0,1) 25%, rgba(0, 0, 0,1) 50%, rgba(0, 0, 0,1) 75%, rgba(0, 0, 0,1) 100%))',
          },
          {
            duration: 75,
            background:
              'linear-gradient(rgba(27, 41, 71) 0%, rgba(42, 66, 95) 25%, rgba(66, 106, 133, 1) 50%, rgba(90, 145, 171,1) 75%, rgba(114, 184, 209,1) 100%)',
          },
          0
        )
        .to(
          '.scene-bg',
          {
            duration: 25,
            background:
              'linear-gradient(rgba(42, 66, 95) 0%, rgba(66, 106, 133, 1) 25%, rgba(90, 145, 171,1) 50%, rgba(114, 184, 209,1) 75%, rgba(173,232,244,1) 100%)',
          },
          25
        )
        .to(
          '.scene-bg',
          {
            duration: 25,
            background:
              'linear-gradient(rgba(90, 145, 171,1) 0%, rgba(114, 184, 209,1) 25%, rgba(126, 204, 228,1) 50%, rgba(137, 223, 247,1) 75%, rgba(137, 223, 247,1) 100%)',
          },
          50
        )
        .to(
          '.scene-bg',
          {
            duration: 25,
            background:
              'linear-gradient(rgba(137, 223, 247,1) 0%, rgba(137, 223, 247,1) 25%, rgba(137, 223, 247,1) 50%, rgba(137, 223, 247,1) 75%, rgba(137, 223, 247,1) 100%)',
          },
          75
        )
      // pin section 2 - fade in
      if (soundsArray.length > 0) {
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
              willChange: 'transform,opacity',
              duration: 25,
              stagger: {
                amount: 15,
              },
              ease: 'power1',
            },
          })
          .to(
            soundsArray[0],
            {
              volume: 0,
              duration: 30,
            },
            0
          )
          .fromTo(
            soundsArray[1],
            { volume: 0 },
            {
              volume: 0.5,
              duration: 30,
            },
            0
          )
          .from(
            '.clouds > *',
            {
              autoAlpha: 0,
              scale: 1.25,
            },
            0
          )
          .call(
            () => {
              cloudsTl.reversed() ? cloudsTl.play() : cloudsTl.reverse()
            },
            undefined,
            1
          )
          .from(
            '.background > *',
            {
              yPercent: 100,
              autoAlpha: 0,
              scale: 1.25,
            },
            7.5
          )
          // .to(
          //   '.city-container',
          //   {
          //     '--filter': 1.5,
          //     willChange: 'none',
          //     stagger: 0,
          //     ease: 'none',
          //   },
          //   20
          // )
          .from(
            '.city-container .buildings-center > *',
            {
              yPercent: 100,
              stagger: 10,
              scale: 1.25,
            },
            20
          )
          .from(
            '.city-container .buildings-center-left > *',
            {
              xPercent: -100,
              stagger: -10,
              scale: 1.25,
            },
            30
          )
          .from(
            '.city-container .buildings-center-right > *',
            {
              xPercent: 100,
              stagger: -10,
              scale: 1.25,
            },
            30
          )
          .addLabel('buildingsCenterDone', '>-15')
          .from(
            '.city-container .buildings-left > *',
            {
              xPercent: -100,
              stagger: 10,
              scale: 1.7,
            },
            'buildingsCenterDone-=5'
          )
          .from(
            '.city-container .buildings-right > *',
            {
              xPercent: 100,
              stagger: 7.5,
              scale: 1.7,
            },
            'buildingsCenterDone-=5'
          )
          .from(
            '.q2-container',
            {
              yPercent: 100,
              duration: 100,
              ease: 'power1',
            },
            'buildingsCenterDone+=10'
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
            'buildingsCenterDone+=10'
          )
          .from(
            '.city-container .buildings-hover-left > *',
            {
              yPercent: 100,
              xPercent: -50,
              duration: 50,
            },
            'buildingsCenterDone+=30'
          )
          .from(
            '.city-container .buildings-hover-right > *',
            {
              yPercent: 100,
              xPercent: 50,
              duration: 50,
            },
            'buildingsCenterDone+=30'
          )
          .addLabel('buildingsDone', 'buildingsCenterDone+=80')
          .to(
            '.city-container .buildings-logo > *',
            {
              yPercent: -100,
              duration: 45,
              ease: 'power1.inOut',
            },
            'buildingsDone'
          )
          // .from(
          //   '.q2-container',
          //   {
          //     yPercent: 100,
          //     duration: 45,
          //     ease: 'expo.inOut',
          //   },
          //   'buildingsDone'
          // )
          .to(
            '.city-container',
            {
              willChange: 'filter',
              filter: 'blur(2px)',
              stagger: 0,
              duration: 25,
              ease: 'none',
            },
            '>-25%'
          )
      }
    })

    return () => ctx.revert()
  }, [scrollLenis, soundsArray])

  useEffect(() => {
    if (soundsArray.length > 0) {
      if (isSoundEnabled) {
        // sound ambient space
        soundsArray[1].muted = false
        soundsArray[1].play()
      } else {
        // sound ambient space
        soundsArray[1].muted = true
        soundsArray[1].pause()
      }
    }
  }, [isSoundEnabled, soundsArray])

  function doSuccessAnimation() {
    // 2 = success
    setCurrExpression(2)
  }

  function doTransactionAnimation() {
    // 4 = transaction
    setCurrExpression(4)
  }

  function doFailureAnimation() {
    // 3 = failure
    setCurrExpression(3)
  }

  return (
    <div className='scene scene-2' ref={scene2}>
      <div className='city-container'>
        <div className='clouds'>
          <Building src={img1} />
          <Building src={img2} />
          <Building src={img3} />
        </div>
        <div className='background'>
          <Building src={img4} />
        </div>
        <div className='clouds'>
          <Building src={img5} />
          <Building src={img6} />
          <Building src={img7} />
          <Building src={img8} />
          <Building src={img9} />
        </div>
        <div className='buildings buildings-center-right'>
          <Building src={img11} />
          <Building src={img13} />
        </div>
        <div className='buildings buildings-center-left'>
          <Building src={img10} />
          <Building src={img12} />
        </div>
        <div className='buildings buildings-left'>
          <Building src={img15} />
        </div>
        <div className='buildings buildings-right'>
          <Building src={img21} />
        </div>
        <div className='buildings buildings-center'>
          <Building src={img14} />
        </div>
        <div className='buildings buildings-center'>
          <Building src={img16} />
        </div>
        <div className='buildings buildings-left'>
          <Building src={img18} />
          <Building src={img23} />
          <Building src={img25} />
        </div>
        <div className='buildings buildings-right'>
          <Building src={img17} />
          <Building src={img19} />
          <Building src={img20} />
          <Building src={img22} />
          <Building src={img24} />
          <Building src={img26} />
          <Building src={img27} />
        </div>
        <div className='buildings buildings-center'>
          <Building src={img28} />
        </div>
        <div className='buildings buildings-hover-left'>
          <Building src={img30} />
          <Building src={img32} />
          <Building src={img33} />
          <Building src={img34} />
        </div>
        <div className='buildings buildings-hover-right'>
          <Building src={img29} />
          <Building src={img31} />
          <Building src={img35} />
        </div>
        <div className='buildings buildings-logo'>
          <Building src={img36} />
        </div>
      </div>
      <div className='q2-container'>
        <div className='scene'>
          <div className='scene-exp-img-mask'>
            <Q2MaskCanvas currExp={currExpression} />
          </div>
          <Image
            src='/assets/q2/q2_body.png'
            alt='Q2 mascot'
            fill
            priority
            sizes='(max-width: 768px) 50vw, (max-width: 1200px) 75vw, 80vw'
            loading='eager'
            style={{
              objectFit: 'contain',
              objectPosition: 'center bottom',
            }}
          />
          <Image
            src='/assets/q2/q2_band.png'
            alt='Q2 band'
            fill
            priority
            sizes='(max-width: 768px) 50vw, (max-width: 1200px) 75vw, 80vw'
            loading='eager'
            className='main-img-band'
            style={{
              objectFit: 'contain',
              objectPosition: 'center bottom',
            }}
          />
          <div className='scene-wallet-mask'>
            <ConnectWallet />
          </div>
        </div>
      </div>
      {/*  */}
      <div className='buttons-container'>
        <button onClick={() => doSuccessAnimation()}>Success animation</button>
        <button onClick={() => doTransactionAnimation()}>
          Transaction animation
        </button>
        <button onClick={() => doFailureAnimation()}>Failure animation</button>
        <button onClick={() => setCurrExpression(0)}>Reset animation</button>
      </div>
    </div>
  )
}

const Building = ({ src, className }: { src: any; className?: string }) => {
  return (
    <Image
      src={src}
      alt='building'
      className='building-container'
      sizes='(max-width: 768px) 50vw, (max-width: 1200px) 65vw, 75vw'
      style={{
        objectFit: 'cover',
      }}
    />
  )
}
