import { useGlobalContext } from '@/provider/globalProvider'
import { PerspectiveCamera, RenderTexture, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, GodRays } from '@react-three/postprocessing'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  DoubleSide,
  NearestFilter,
  PlaneGeometry,
  RepeatWrapping,
  Texture,
  DefaultLoadingManager,
} from 'three'

export const SceneOne = () => {
  const { scrollLenis, setSoundStatus, soundsArray } = useGlobalContext()
  // const { active, progress, errors, item, loaded, total } = useProgress()

  const unscrollableTl = useRef<any>(null)
  const scrollableTl = useRef<any>(null)

  const [q2, setQ2] = useState<any>(null)
  const [kiwi, setKiwi] = useState<any>(null)
  const [planet, setPlanet] = useState<any>(null)
  const [voyager, setVoyager] = useState<any>(null)
  const [lights, setLights] = useState<any>(null)
  const [images, setImages] = useState<any>(null)
  const [currImage, setImage] = useState(0)
  const [currExp, setExp] = useState(0)

  useEffect(() => {
    const updater = {
      currImage: 0,
      currExp: 0,
      currExp2: 6,
    }
    let lastTime = 0
    let lastSecondTime = 0

    const ctx = gsap.context(() => {
      if (
        q2 &&
        planet &&
        voyager &&
        kiwi &&
        lights &&
        !unscrollableTl.current &&
        !scrollableTl.current
      ) {
        // first expression loop
        const expressionTl = gsap
          .timeline({
            repeat: -1,
            defaults: {
              duration: 1,
              ease: 'none',
            },
          })
          .to(updater, {
            currExp: 1,
            onUpdate: () => {
              setExp(Math.round(updater.currExp))
            },
          })
          .to(updater, {
            currExp: 0,
            onUpdate: () => {
              setExp(Math.round(updater.currExp))
            },
          })
        // last expression loop
        const expressionLastTl = gsap
          .timeline({
            repeat: -1,
            paused: true,
            defaults: {
              duration: 1,
              ease: 'none',
            },
          })
          .to(updater, {
            currExp2: 7,
            onUpdate: () => {
              setExp(Math.round(updater.currExp2))
            },
          })
          .to(updater, {
            currExp2: 6,
            onUpdate: () => {
              setExp(Math.round(updater.currExp2))
            },
          })
        // voyager rotation
        gsap.timeline({ repeat: -1 }).to(voyager.rotation, {
          z: Math.PI * 2,
          duration: 7.5,
          ease: 'none',
        })
        // unscrollableTl
        unscrollableTl.current = gsap
          .timeline({
            paused: true,
            onComplete: () => {
              gsap.to('.canvas-scroll', {
                autoAlpha: 1,
                duration: 1.25,
                ease: 'expo',
              })
            },
          })
          .from(
            ['#ui .ui-part.ui-top', '#ui .ui-part.ui-mid'],
            {
              yPercent: -100,
              scale: 1.1,
              duration: 3,
            },
            0
          )
          .from(
            '#ui .ui-part.ui-bottom',
            {
              yPercent: 100,
              scale: 1.1,
              duration: 3,
            },
            0
          )
          .to('#ui', { opacity: 1, duration: 3, ease: 'expo.inOut' }, 0)
          .to(
            lights[0],
            {
              intensity: 0.025,
              duration: 6,
              ease: 'power1.in',
            },
            0
          )
          .fromTo(
            planet.children[0].position,
            { y: 0.02 },
            {
              y: -0.35,
              duration: 33.5,
              ease: 'power1',
            },
            0
          )
          .from(
            q2.position,
            {
              y: -5,
              duration: 11,
              ease: 'power1',
            },
            5
          )
          .to(
            lights[0],
            {
              intensity: 0.05,
              duration: 10,
              ease: 'power1.inOut',
            },
            12
          )
          .to(
            lights[1],
            {
              intensity: 3,
              duration: 20,
              ease: 'power1.inOut',
            },
            16.5
          )
          .from(
            kiwi[1].scale,
            {
              x: 0.25,
              y: 0.25,
              duration: 8.5,
              ease: 'power1.inOut',
            },
            16.5
          )
          .from(
            [kiwi[0].position, kiwi[1].position],
            {
              y: -0.5,
              duration: 11.5,
              ease: 'back',
            },
            16.5
          )
          .to(
            kiwi[0].position,
            {
              z: 0.01,
              duration: 5,
              ease: 'expo',
            },
            25
          )
          .to(
            kiwi[1].position,
            {
              z: -0.25,
              duration: 5,
              ease: 'power1.inOut',
            },
            25
          )
          .to(
            kiwi[1].scale,
            {
              x: 0.5,
              y: 0.5,
              duration: 5,
              ease: 'power1.inOut',
            },
            25
          )
          .from(
            voyager.position,
            {
              y: 3,
              x: 10,
              duration: 13.5,
              ease: 'power1',
            },
            33.5
          )
          .from(
            voyager.rotation,
            {
              x: Math.PI * 1.5,
              duration: 13.5,
              ease: 'power2.inOut',
            },
            33.5
          )
          .call(
            () => {
              if (expressionTl.isActive()) {
                expressionTl.pause()
                setExp(2)
              } else expressionTl.play()
            },
            undefined,
            35
          )
          .to(
            lights[0],
            {
              intensity: 0.15,
              duration: 10,
              ease: 'power1.inOut',
            },
            35
          )
          .call(
            () => {
              if (lastTime === 0) {
                setExp(3)
                lastTime = 1
              } else {
                setExp(2)
                lastTime = 0
              }
            },
            undefined,
            39.5
          )
          .call(
            () => {
              unscrollableTl.current.reversed()
                ? scrollLenis?.stop()
                : scrollLenis?.start()
            },
            undefined,
            45.65
          )
          .set(
            planet,
            {
              visible: false,
            },
            45.65
          )
          .call(
            () => {
              if (lastTime === 1) {
                setExp(4)
                images.visible = true
                lastTime = 2
                // refresh scroll trigger
                const scrollTrigger = ScrollTrigger.getById('scrollable')
                scrollTrigger?.refresh()
                scrollTrigger?.update()
              } else {
                setExp(3)
                images.visible = false
                lastTime = 1
              }
            },
            undefined,
            45.65
          )
          .from(
            images.material,
            { opacity: 0, duration: 0.5, ease: 'back.inOut' },
            45.65
          )
        // scrollableTl
        scrollableTl.current = gsap
          .timeline({
            scrollTrigger: {
              trigger: '#home-hero',
              start: 'bottom+=1 bottom',
              end: '+=5000',
              id: 'scrollable',
              scrub: true,
              pin: true,
              refreshPriority: 99,
            },
          })

          .to(
            updater,
            {
              currImage: 33,
              duration: 33,
              ease: 'none',
              onUpdate: () => {
                setImage(Math.round(updater.currImage))
              },
            },
            0
          )
          .to(
            '.canvas-scroll',
            {
              autoAlpha: 0,
              duration: 15,
              ease: 'none',
            },
            0
          )
          .call(
            () => {
              if (lastSecondTime === 0) {
                setExp(5)
                lastSecondTime = 1
              } else {
                setExp(4)
                lastSecondTime = 0
              }
            },
            undefined,
            1
          )
          .to(
            images.material,
            { opacity: 0, duration: 2, ease: 'back.inOut' },
            33
          )
          .to(
            voyager.position,
            {
              y: -3,
              x: 10,
              duration: 36,
              ease: 'power1.in',
            },
            34
          )
          .to(
            voyager.rotation,
            {
              x: Math.PI,
              duration: 36,
              ease: 'power2.inOut',
            },
            34
          )
          .call(
            () => {
              if (expressionLastTl.isActive()) {
                expressionLastTl.pause()
                setExp(5)
              } else expressionLastTl.play()
            },
            undefined,
            35
          )
          .to(
            q2.position,
            {
              y: -10,
              duration: 20,
              ease: 'power2.in',
            },
            50
          )
          .to(
            kiwi[1].position,
            {
              y: 0.4,
              duration: 15,
              ease: 'power1.inOut',
            },
            55
          )
          .to(
            kiwi[1].scale,
            {
              x: 0,
              y: 0,
              duration: 25,
              ease: 'power2.inOut',
            },
            55
          )
      }

      return () => {
        if (unscrollableTl.current) unscrollableTl.current.revert()
        if (scrollableTl.current) scrollableTl.current.revert()
      }
    })

    return () => ctx.revert()
  }, [
    unscrollableTl,
    scrollableTl,
    scrollLenis,
    q2,
    setQ2,
    planet,
    setPlanet,
    kiwi,
    setKiwi,
    lights,
    setLights,
    voyager,
    setVoyager,
    images,
    setImages,
    setImage,
    setExp,
  ])

  useEffect(() => {
    gsap
      .timeline({
        repeat: -1,
        yoyo: true,
      })
      .fromTo(
        '.canvas-scroll .scroll-arrow',
        {
          yPercent: -45,
        },
        {
          yPercent: 45,
          ease: 'power1.inOut',
          duration: 1.5,
          stagger: {
            amount: 0.45,
          },
        }
      )
  }, [])

  function handleStartClick() {
    // sound manager
    setSoundStatus(true)
    soundsArray[0].muted = false
    soundsArray[0].play()
    setTimeout(() => {
      soundsArray[1].muted = false
      soundsArray[1].play()
      gsap.from(soundsArray[1], {
        volume: 0,
        duration: 1.25,
        ease: 'none',
      })
    }, 74000)

    // sound button
    gsap.timeline().set('#sound-button', { display: 'block' }).fromTo(
      '#sound-button',
      { scale: 0 },
      {
        scale: 1,
        ease: 'back.inOut',
      },
      0
    )

    gsap
      .timeline({
        onComplete: () => {
          unscrollableTl.current?.play()
        },
      })
      .to('.canvas-loader', {
        autoAlpha: 0,
        duration: 1.25,
        ease: 'power4.inOut',
      })
      .set('.canvas-loader', { display: 'none' })
  }

  return (
    <section className='canvas-container'>
      <Loader onLoaded={() => handleStartClick()} />
      <div className='canvas-scroll'>
        <div className='scroll-arrow'></div>
        <div className='scroll-arrow'></div>
        <div className='scroll-arrow'></div>
      </div>
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
        }}
      >
        <Q2
          setInstance={setQ2}
          setKiwiInstance={setKiwi}
          setImagesInstance={setImages}
          currImage={currImage}
          currExp={currExp}
        />
        <Planet setInstance={setPlanet} />
        <Voyager setInstance={setVoyager} />
        <Lights setInstance={setLights} />
      </Canvas>
    </section>
  )
}

const Loader = ({ onLoaded }: { onLoaded: Function }) => {
  useEffect(() => {
    let loadStack = 0
    gsap.to('.canvas-loader .spinner', {
      rotate: 360,
      duration: 5,
      ease: 'none',
      repeat: -1,
    })
    gsap.to('.canvas-loader .spinner', {
      borderRadius: '50%',
      duration: 2.5,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    })

    const tl = gsap
      .timeline({ paused: true })
      .to('.canvas-loader .spinner', {
        scale: 0,
        duration: 1.25,
        ease: 'back.inOut',
      })
      // .set('.canvas-loader .loader-screen', {
      //   display: 'none',
      // })
      .to('.canvas-loader .loader-screen', {
        autoAlpha: 0,
      })
      .fromTo(
        '.canvas-loader .start-screen > *',
        {
          autoAlpha: 0,
          yPercent: 50,
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1.25,
          stagger: {
            amount: 0.5,
          },
          ease: 'back.inOut',
          willChange: 'transform, opacity',
        }
      )

    DefaultLoadingManager.onLoad = function () {
      loadStack++
      if (loadStack > 1) {
        tl.play()
        console.log('playing')
      }

      console.log(loadStack, 'loaded')
    }

    DefaultLoadingManager.onError = function (url) {
      console.log('There was an error loading ' + url)
    }
  }, [])

  return (
    <div className='canvas-loader'>
      <div className='loader-screen'>
        <div className='spinner'></div>
      </div>
      <div className='start-screen'>
        <p>
          Please enable sound for the best experience on our website. Thank you!
        </p>
        <button onClick={() => onLoaded()}>Click to start the adventure</button>
      </div>
    </div>
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
    <group scale={5} ref={q2} position={[0, -1, 0]}>
      <Kiwi geometry={q2Geometry} setInstance={props.setKiwiInstance} />
      <mesh geometry={q2Geometry}>
        <meshStandardMaterial map={body} alphaMap={bodyAlpha} alphaTest={0.5} />
      </mesh>
      <VoyagerImages
        geometry={bandGeometry}
        scale={[0.52, 0.45, 1]}
        position={[0, 0.2, 0.004]}
        currImage={props.currImage}
        setInstance={props.setImagesInstance}
      />
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
        <meshStandardMaterial map={band} transparent needsUpdate />
      </mesh>
    </group>
  )
}

const Expressions = (props: any) => {
  const expressions: any = useRef(null)
  const expression: any = useRef(null)
  const tl = useRef<GSAPTimeline>()

  const mask = useTexture('/assets/scene1/Q2_mask.jpg')

  const expArray = useTexture(
    [
      '/assets/scene1/expressions/variant/before/exp-2-eyes-right.png',
      '/assets/scene1/expressions/variant/before/exp-2-eyes-right.png',
      '/assets/scene1/expressions/variant/before/exp-3.png',
      '/assets/scene1/expressions/variant/before/exp-4.png',
      '/assets/scene1/expressions/variant/before/exp-5.png',
      '/assets/scene1/expressions/variant/after/exp-6.png',
      '/assets/scene1/expressions/variant/after/exp-7.png',
      '/assets/scene1/expressions/variant/after/exp-8.png',
    ],
    // @ts-ignore
    (localExpArray: Texture[]) => {
      localExpArray[1].wrapS = RepeatWrapping
      localExpArray[1].repeat.x = -1

      localExpArray.forEach((texture: Texture) => {
        texture.generateMipmaps = false
        texture.minFilter = NearestFilter
      })
    }
  )

  useEffect(() => {
    tl.current = gsap
      .timeline({
        repeat: -1,
        yoyo: true,
        paused: true,
        defaults: {
          duration: 0.05,
          ease: 'none',
        },
      })
      .to(expressions.current.position, {
        x: 0.025,
      })
      .to(expressions.current.position, {
        x: 0,
      })
      .to(expressions.current.position, {
        x: -0.025,
      })
      .to(expressions.current.position, {
        x: 0,
      })

    return () => {
      if (tl.current) tl.current.revert()
      if (expressions.current) gsap.set(expressions.current.position, { x: 0 })
    }
  }, [expressions, tl])

  useEffect(() => {
    if (expressions.current && props.currExp === 5 && tl.current) {
      tl.current.play()
    }

    return () => {
      if (tl.current && props.currExp === 5) tl.current.restart().pause()
      if (expressions.current) gsap.set(expressions.current.position, { x: 0 })
    }
  }, [props.currExp, expressions, tl])

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

const VoyagerImages = (props: any) => {
  const images: any = useRef()

  const mask = useTexture('/assets/scene1/Mask_1.jpg')

  const imagesArray = useTexture([
    '/assets/scene1/voyager/1.jpg',
    '/assets/scene1/voyager/2.jpg',
    '/assets/scene1/voyager/3.jpg',
    '/assets/scene1/voyager/4.jpg',
    '/assets/scene1/voyager/5.jpg',
    '/assets/scene1/voyager/6.jpg',
    '/assets/scene1/voyager/7.jpg',
    '/assets/scene1/voyager/8.jpg',
    '/assets/scene1/voyager/9.jpg',
    '/assets/scene1/voyager/10.jpg',
    '/assets/scene1/voyager/11.jpg',
    '/assets/scene1/voyager/12.jpg',
    '/assets/scene1/voyager/13.jpg',
    '/assets/scene1/voyager/14.jpg',
    '/assets/scene1/voyager/15.jpg',
    '/assets/scene1/voyager/16.jpg',
    '/assets/scene1/voyager/17.jpg',
    '/assets/scene1/voyager/18.jpg',
    '/assets/scene1/voyager/19.jpg',
    '/assets/scene1/voyager/20.jpg',
    '/assets/scene1/voyager/21.jpg',
    '/assets/scene1/voyager/22.jpg',
    '/assets/scene1/voyager/23.jpg',
    '/assets/scene1/voyager/24.jpg',
    '/assets/scene1/voyager/25.jpg',
    '/assets/scene1/voyager/26.jpg',
    '/assets/scene1/voyager/27.jpg',
    '/assets/scene1/voyager/28.jpg',
    '/assets/scene1/voyager/29.jpg',
    '/assets/scene1/voyager/30.jpg',
    '/assets/scene1/voyager/31.jpg',
    '/assets/scene1/voyager/32.jpg',
    '/assets/scene1/voyager/33.jpg',
    '/assets/scene1/voyager/34.jpg',
  ])

  useEffect(() => {
    props.setInstance(images.current)
  }, [images])

  return (
    <mesh ref={images} {...props} visible={false}>
      <meshBasicMaterial
        map={imagesArray[props.currImage]}
        alphaMap={mask}
        transparent
        needsUpdate
      />
    </mesh>
  )
}

const Kiwi = (props: any) => {
  const { isSoundEnabled } = useGlobalContext()
  // const light: any = useRef(null)
  const kiwi: any = useRef(null)
  const lightContainer: any = useRef(null)
  const [light, set] = useState<any>()
  const [hovered, setHovered] = useState(false)

  const [kiwiMap, kiwiAlpha, kiwiAlt] = useTexture([
    '/assets/scene1/Kiwi.png',
    '/assets/scene1/Kiwi_alpha.jpg',
    '/assets/scene1/Kiwi_alt.png',
  ])

  useEffect(() => {
    props.setInstance([kiwi.current, lightContainer.current.children[0]])
  }, [lightContainer, kiwi])

  useEffect(() => {
    if (isSoundEnabled && hovered) {
      const audio = document.querySelector('#audio-kiwi') as HTMLAudioElement
      audio.currentTime = 0
      audio.play()
    }
  }, [isSoundEnabled, hovered])

  return (
    <group>
      <mesh {...props} ref={kiwi}>
        <meshStandardMaterial
          map={hovered ? kiwiAlt : kiwiMap}
          alphaMap={kiwiAlpha}
          alphaTest={0.5}
        />
      </mesh>
      <group ref={lightContainer}>
        <mesh ref={set} position={[-0.005, 0.575, -0.5]} scale={0.65}>
          <circleGeometry args={[0.2, 32]} />
          <meshBasicMaterial color='lightyellow' />
        </mesh>
      </group>
      <mesh
        position={[0, 0.425, 0.2]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <planeGeometry args={[0.16, 0.16]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <EffectComposer multisampling={0}>
        {/* <Bloom /> */}
        {light && (
          <GodRays
            sun={light}
            samples={64}
            density={0.9}
            decay={0.94}
            weight={0.5}
            exposure={0.4}
            clampMax={1}
          />
        )}
      </EffectComposer>
    </group>
  )
}

const Planet = (props: any) => {
  const planet: any = useRef()
  // mesh
  const q2Geometry = useMemo(() => {
    return new PlaneGeometry(1, 1)
  }, [])
  // texture base
  const [planetMap, planetAlpha] = useTexture(['/assets/scene1/planet.png'])

  useEffect(() => {
    props.setInstance(planet.current)
  }, [planet])

  return (
    <group scale={15} position={[0, -5, 0]} ref={planet}>
      <mesh geometry={q2Geometry} position={[0, 0, 0.02]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          map={planetMap}
          alphaMap={planetAlpha}
          alphaTest={0.5}
        />
      </mesh>
    </group>
  )
}

const Lights = (props: any) => {
  const ambientLight: any = useRef()
  const pointLight: any = useRef()

  useEffect(() => {
    props.setInstance([ambientLight.current, pointLight.current])
  }, [ambientLight, pointLight])

  return (
    <>
      <pointLight intensity={0} position={[0, 2.3, 0.3]} ref={pointLight} />
      <ambientLight intensity={0} ref={ambientLight} />
    </>
  )
}

const Voyager = (props: any) => {
  const voyager: any = useRef()

  const [voyagerMap, voyagerAlpha] = useTexture([
    '/assets/scene1/Voyager.png',
    '/assets/scene1/Voyager_alpha.jpg',
  ])

  useEffect(() => {
    props.setInstance(voyager.current)
  }, [voyager])

  return (
    <mesh scale={2.25} position={[2.15, 0.1, 0.2]} ref={voyager}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        map={voyagerMap}
        alphaMap={voyagerAlpha}
        alphaTest={0.5}
        side={DoubleSide}
      />
    </mesh>
  )
}
