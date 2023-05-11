// React
import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
// gsap
import gsap from 'gsap'
// Rainbow & Wagmi
import ConnectWallet from '../ui/ConnectWallet'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
// THREE
import { Canvas } from '@react-three/fiber'
import {
  PerspectiveCamera,
  RenderTexture,
  useTexture,
  Html,
} from '@react-three/drei'
import { PlaneGeometry } from 'three'
// Custom components
import { useGlobalContext } from '@/provider/globalProvider'
// Images imports
import img1 from '@/assets/placements/1_Cloud1.png'
import img2 from '@/assets/placements/2_Cloud2.png'
import img3 from '@/assets/placements/3_Cloud3.png'
import img4 from '@/assets/placements/4_Base.png'
import img4extra from '@/assets/placements/4_Base_blurred.png'
import img5 from '@/assets/placements/5_Cloud4.png'
import img6 from '@/assets/placements/6_Cloud5.png'
// import img7 from '@/assets/placements/7_Cloud6.png'
// import img8 from '@/assets/placements/8_Cloud7.png'
// import img9 from '@/assets/placements/9_Cloud8.png'
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

export const SceneTwo = () => {
  const { scrollLenis, soundsArray } = useGlobalContext()
  const scene2 = useRef<HTMLDivElement>(null)
  const entryTl = useRef<any>()
  const failureTl = useRef<any>()
  const successTl = useRef<any>()
  const transactTl = useRef<any>()
  const [q2, setQ2] = useState<any>(null)
  const [currExpression, setCurrExpression] = useState(0)
  const updater = {
    entryExp: 0,
    failureExp: 0,
    successExp: 0,
    transactionExp: 0,
  }

  // function wheel(event: WheelEvent) {
  //   let delta = 0
  //   if (event.deltaY) {
  //     delta = event.deltaY / 120
  //   } else if (event.detail) {
  //     delta = -event.detail / 3
  //   }

  //   if (delta < 0) {
  //     delta = -1
  //   } else if (delta > 0) {
  //     delta = 1
  //   }

  //   console.log(delta)

  //   if (event.preventDefault) {
  //     event.preventDefault()
  //     window.scrollTo(0, document.body.scrollTop + delta)
  //   }
  // }

  // function controlSpeed(enable: boolean) {
  //   // remove
  //   scrollLenis?.start()
  //   window.addEventListener('wheel', wheel, { passive: false })
  // }

  // scene building

  useEffect(() => {
    // scrollLenis?.start()
    const ctx = gsap.context(() => {
      // clouds animation
      // const cloudsTl = gsap.timeline({
      //   paused: true,
      //   repeat: -1,
      //   reversed: true,
      // })

      gsap.fromTo(
        '.clouds',
        {
          xPercent: -100,
        },
        {
          xPercent: 100,
          duration: 20,
          repeat: -1,
          ease: 'none',
        }
      )

      // gsap.utils.toArray('.clouds > *').forEach((cloud: any, i) => {
      //   gsap.fromTo(
      //     cloud,
      //     {
      //       xPercent: -100,
      //     },
      //     {
      //       xPercent: 100,
      //       duration: 20,
      //       ease: 'none',
      //       repeat: -1,
      //       delay: i * 2,
      //     }
      //   )
      // })
      // pin section 1 - fade out
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '#home-city',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            refreshPriority: 98,
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
        .to(
          ['#audio-0', '#audio-1'],
          {
            volume: 0,
            duration: 50,
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
        .from('#audio-2', { volume: 0, duration: 50 }, 50)

      // pin section 2 - fade in
      if (q2) {
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
          .from(
            q2.position,
            {
              y: -8,
              duration: 100,
              ease: 'power1',
            },
            0
          )
          .to(
            '#mouse .border-background',
            {
              scaleX: 1,
              ease: 'none',
              duration: 100,
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
          .from(
            '.background > *:first-child',
            {
              yPercent: 100,
              stagger: 0,
              autoAlpha: 0,
              scale: 1.25,
            },
            7.5
          )
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
            '.background > *:last-child',
            {
              autoAlpha: 0,
            },
            27.5
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
          // .from(
          //   q2.position,
          //   {
          //     y: -8,
          //     duration: 100,
          //     ease: 'power1',
          //   },
          //   'buildingsCenterDone+=10'
          // )
          .from(
            '.city-container .buildings-logo > *',
            {
              autoAlpha: 0,
              yPercent: -100,
              duration: 30,
              ease: 'expo',
            },
            'buildingsCenterDone+=10'
          )
          .from(
            '.city-container .buildings-hover-left > *',
            {
              xPercent: -100,
              duration: 50,
            },
            'buildingsCenterDone+=30'
          )
          .from(
            '.city-container .buildings-hover-right > *',
            {
              xPercent: 100,
              duration: 50,
            },
            'buildingsCenterDone+=30'
          )
          .addLabel('buildingsDone', 'buildingsCenterDone+=80')
          .to(
            '.city-container .buildings-logo > *',
            {
              yPercent: -100,
              autoAlpha: 0,
              duration: 45,
              ease: 'power1.inOut',
            },
            'buildingsDone'
          )
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

    doEntryAnimation()

    return () => ctx.revert()
  }, [scrollLenis, soundsArray, q2])

  useEffect(() => {
    if (!entryTl.current) {
      entryTl.current = gsap
        .timeline({
          paused: true,
          repeat: -1,
          repeatDelay: 1,
          defaults: {
            duration: 3,
            ease: 'none',
          },
        })
        .fromTo(
          updater,
          {
            entryExp: 0,
          },
          {
            entryExp: 1,
            duration: 1.25,
            repeat: 1,
            onUpdate: () => {
              setCurrExpression(Math.round(updater.entryExp))
            },
          }
        )
        .to(updater, {
          entryExp: 4,
          onUpdate: () => {
            setCurrExpression(Math.round(updater.entryExp))
          },
        })
    }
    if (!successTl.current) {
      successTl.current = gsap
        .timeline({
          paused: true,
          defaults: { duration: 2.5, ease: 'none' },
        })
        .call(
          () => {
            setCurrExpression(28)
          },
          undefined,
          0
        )
        .fromTo(
          updater,
          {
            successExp: 29,
          },
          {
            successExp: 31,
            repeat: -1,
            onUpdate: () => {
              setCurrExpression(Math.round(updater.successExp))
            },
          },
          2.5
        )
    }
    if (!failureTl.current && successTl.current) {
      failureTl.current = gsap
        .timeline({
          paused: true,
          defaults: {
            duration: 10,
            ease: 'none',
          },
          onComplete: () => {
            successTl.current.play()
          },
        })
        .fromTo(
          updater,
          {
            failureExp: 5,
          },
          {
            failureExp: 20,
            onUpdate: () => {
              setCurrExpression(Math.round(updater.failureExp))
            },
          }
        )
        .addLabel('failureEnd')
        .to(updater, {
          duration: 0.1,
        })
    }
    if (!transactTl.current) {
      transactTl.current = gsap
        .timeline({
          repeat: -1,
          paused: true,
          defaults: {
            duration: 3.5,
            ease: 'none',
          },
        })
        .fromTo(
          updater,
          {
            transactionExp: 21,
          },
          {
            transactionExp: 28,
            onUpdate: () => {
              setCurrExpression(Math.round(updater.transactionExp))
            },
          }
        )
    }
  }, [entryTl, failureTl, successTl, transactTl])

  function doEntryAnimation() {
    successTl.current && successTl.current?.restart().pause()
    transactTl.current && transactTl.current?.restart().pause()
    failureTl.current && failureTl.current?.restart().pause()
    if (entryTl.current && !entryTl.current.isActive()) {
      entryTl.current.play()
    }
  }

  function doSuccessAnimation() {
    entryTl.current && entryTl.current?.restart().pause()
    transactTl.current && transactTl.current?.restart().pause()
    failureTl.current && failureTl.current?.restart().pause()
    if (successTl.current && !successTl.current.isActive()) {
      doFailureAnimation(true)
    }
  }

  function doTransactionAnimation() {
    successTl.current && successTl.current?.restart().pause()
    entryTl.current && entryTl.current?.restart().pause()
    failureTl.current && failureTl.current?.restart().pause()
    if (transactTl.current && !transactTl.current.isActive()) {
      transactTl.current.play()
    }
  }

  function doFailureAnimation(isSuccess: boolean) {
    successTl.current && successTl.current?.restart().pause()
    transactTl.current && transactTl.current?.restart().pause()
    entryTl.current && entryTl.current?.restart().pause()
    if (failureTl.current) {
      if (isSuccess) failureTl.current.restart().play()
      else failureTl.current.restart().tweenTo('failureEnd')
    }
  }

  return (
    <div className='scene scene-2' ref={scene2}>
      <div className='city-container'>
        <div className='clouds'>
          <Clouds src={img1} />
          <Clouds src={img5} />
          {/* <Clouds src={img7} /> */}
          <Clouds src={img2} />
          <Clouds src={img6} />
          <Clouds src={img3} />
          {/* <Clouds src={img8} /> */}
          {/* <Clouds src={img9} /> */}
        </div>
        <div className='background'>
          <Building src={img4} />
          <Building src={img4extra} />
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
          <h2>pluto</h2>
        </div>
      </div>
      <div className='q2-canvas-container'>
        <div className='canvas-button-container'>
          <ConnectWallet />
        </div>
        <Canvas
          dpr={[1, 1.25]}
          gl={{
            antialias: false,
          }}
        >
          <Q2 setInstance={setQ2} currExp={currExpression} />
        </Canvas>
      </div>
      <div className='buttons-container'>
        <button onClick={() => doSuccessAnimation()}>Success animation</button>
        <button onClick={() => doTransactionAnimation()}>
          Transaction animation
        </button>
        <button onClick={() => doFailureAnimation(false)}>
          Failure animation
        </button>
        <button onClick={() => doEntryAnimation()}>Reset animation</button>
      </div>
    </div>
  )
}

const Clouds = ({ src }: { src: any }) => {
  return (
    <Image
      src={src}
      alt='clouds'
      className='building-container clouds-container'
      fill
      unoptimized
      style={{
        objectFit: 'contain',
        objectPosition: 'center top',
      }}
      // sizes='(max-width: 768px) 40vw,
      //         (max-width: 1200px) 50vw,
      //         60vw'
    />
  )
}

const Building = ({ src }: { src: any }) => {
  return (
    <Image
      src={src}
      alt='building'
      className='building-container'
      fill
      unoptimized
      // style={{
      //   objectFit: 'cover',
      // }}
      // sizes='(max-width: 768px) 45vw,
      //         (max-width: 1200px) 65vw,
      //         75vw'
    />
  )
}

const Q2 = (props: any) => {
  const q2 = useRef(null)
  // images
  // mesh
  const q2Geometry = useMemo(() => {
    return new PlaneGeometry(1, 1.6)
  }, [])
  const bandGeometry = useMemo(() => {
    return new PlaneGeometry(1, 1)
  }, [])
  // texture base
  const [body, bodyAlpha, band] = useTexture([
    '/assets/scene1/Q2.png',
    '/assets/scene1/Q2_alpha.jpg',
    '/assets/scene1/Q2_band.png',
  ])

  useEffect(() => {
    props.setInstance(q2.current)
  }, [q2])

  return (
    <group scale={5} ref={q2} position={[0, -2, 0]}>
      <Kiwi geometry={q2Geometry} />
      <mesh geometry={q2Geometry}>
        <meshBasicMaterial map={body} alphaMap={bodyAlpha} alphaTest={0.5} />
      </mesh>
      <Expressions
        geometry={bandGeometry}
        scale={[0.52, 0.45, 1]}
        position={[0, 0.2, 0.0045]}
        childGeometry={q2Geometry}
        currExp={props.currExp}
      />
      <mesh
        geometry={bandGeometry}
        scale={[0.52, 0.45, 1]}
        position={[0, 0.2, 0.005]}
      >
        <meshBasicMaterial map={band} transparent needsUpdate />
        <Html
          className='canvas-text-container'
          center
          transform
          sprite
          distanceFactor={1.5}
        >
          <div className='button-container'>
            <button
              className='button'
              onClick={() => {
                //@ts-ignore
                document
                  .querySelector('.canvas-button-container button')
                  //@ts-ignore
                  .click()

                document.body.style.cursor = 'auto'
              }}
            ></button>
          </div>
        </Html>
      </mesh>
    </group>
  )
}

const Expressions = (props: any) => {
  const expressions: any = useRef(null)
  const expression: any = useRef(null)

  const mask = useTexture('/assets/scene1/Q2_mask.jpg')

  const expArray = useTexture([
    '/assets/scene2/expressions/entry/exp-1.png',
    '/assets/scene2/expressions/entry/exp-2.png',
    '/assets/scene2/expressions/entry/exp-3.png',
    '/assets/scene2/expressions/entry/exp-4.png',
    '/assets/scene2/expressions/entry/exp-5.png',
    '/assets/scene2/expressions/failure/exp-1.png',
    '/assets/scene2/expressions/failure/exp-2.png',
    '/assets/scene2/expressions/failure/exp-3.png',
    '/assets/scene2/expressions/failure/exp-4.png',
    '/assets/scene2/expressions/failure/exp-5.png',
    '/assets/scene2/expressions/failure/exp-6.png',
    '/assets/scene2/expressions/failure/exp-7.png',
    '/assets/scene2/expressions/failure/exp-8.png',
    '/assets/scene2/expressions/failure/exp-9.png',
    '/assets/scene2/expressions/failure/exp-10.png',
    '/assets/scene2/expressions/failure/exp-11.png',
    '/assets/scene2/expressions/failure/exp-12.png',
    '/assets/scene2/expressions/failure/exp-13.png',
    '/assets/scene2/expressions/failure/exp-14.png',
    '/assets/scene2/expressions/failure/exp-15.png',
    '/assets/scene2/expressions/failure/exp-16.png',
    '/assets/scene2/expressions/transact/exp-1.png',
    '/assets/scene2/expressions/transact/exp-2.png',
    '/assets/scene2/expressions/transact/exp-3.png',
    '/assets/scene2/expressions/transact/exp-4.png',
    '/assets/scene2/expressions/transact/exp-5.png',
    '/assets/scene2/expressions/transact/exp-6.png',
    '/assets/scene2/expressions/transact/exp-7.png',
    '/assets/scene2/expressions/success/exp-1.png',
    '/assets/scene2/expressions/success/exp-2.png',
    '/assets/scene2/expressions/success/exp-3.png',
  ])

  useEffect(() => {
    if (expression.current) {
      const handleCamera = () => {
        if (window.innerWidth / window.innerHeight < 1.5) {
          const minus = 1.5 - window.innerWidth / window.innerHeight / 2
          expression.current.scale.set(2.75 - minus, 1.15 - minus / 4, 1)
        } else {
          expression.current.scale.set(2.75, 1.15, 1)
        }
      }

      window.addEventListener('resize', handleCamera)
      handleCamera()
    }
  }, [expression])

  return (
    <mesh ref={expressions} {...props}>
      <meshBasicMaterial alphaMap={mask} transparent needsUpdate>
        {/* @ts-ignore */}
        <RenderTexture attach='map' frames={1}>
          <PerspectiveCamera makeDefault position={[0, 0, 1]} />
          <mesh
            geometry={props.childGeometry}
            scale={[2.75, 1.15, 1]}
            position={[0, 0.2, 0]}
            ref={expression}
          >
            <meshBasicMaterial
              map={expArray[props.currExp]}
              // alphaMap={expMaskArray[props.currExp]}
              transparent
              needsUpdate
            />
          </mesh>
        </RenderTexture>
      </meshBasicMaterial>
    </mesh>
  )
}

const Kiwi = (props: any) => {
  const { isSoundEnabled } = useGlobalContext()
  const kiwi: any = useRef(null)
  const [hovered, setHovered] = useState(false)

  const [kiwiMap, kiwiAlpha, kiwiAlt] = useTexture([
    '/assets/scene1/Kiwi.png',
    '/assets/scene1/Kiwi_alpha.jpg',
    '/assets/scene1/Kiwi_alt.png',
  ])

  useEffect(() => {
    if (isSoundEnabled && hovered) {
      const audio = document.querySelector('#audio-kiwi') as HTMLAudioElement
      audio.currentTime = 0
      audio.play()
    }
  }, [isSoundEnabled, hovered])

  return (
    <group position={[0, 0, 0.01]}>
      <mesh {...props} ref={kiwi}>
        <meshBasicMaterial
          map={hovered ? kiwiAlt : kiwiMap}
          alphaMap={kiwiAlpha}
          alphaTest={0.5}
          needsUpdate
        />
      </mesh>
      <mesh
        position={[0, 0.49, 0.2]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <planeGeometry args={[0.16, 0.16]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </group>
  )
}
