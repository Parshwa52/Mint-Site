import { useTexture, PerformanceMonitor } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  ChromaticAberration,
  EffectComposer,
  Glitch,
  Scanline,
} from '@react-three/postprocessing'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

export const Q2MaskCanvas = (props: any) => {
  const [dpr, setDpr] = useState(1.5)

  return (
    <Canvas
      camera={{
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      }}
      dpr={dpr}
      resize={{
        debounce: 0,
      }}
    >
      <Face currExpProp={props.currExp} />
      <EffectComposer>
        <Glitch
          // @ts-ignore
          delay={[3, 5]} // min and max glitch delay
          // @ts-ignore
          duration={[0.6, 1.0]} // min and max glitch duration
          // @ts-ignore
          strength={[0.3, 1.0]} // min and max glitch strength
          active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
        />
      </EffectComposer>
      <PerformanceMonitor flipflops={3} onFallback={() => setDpr(0.8)} />
    </Canvas>
  )
}

const Face = (currExpProp: any) => {
  const expression: any = useRef()

  const [
    expression1,
    expression2,
    expression3,
    expression4,
    expression5,
    expression6,
    expression7,
    expression8,
  ] = useTexture([
    '/assets/expressions/space/before/exp-1-eyes-left.jpg',
    '/assets/expressions/space/before/exp-2-eyes-right.jpg',
    '/assets/expressions/space/before/exp-3-when-voyager-comes-into-the-frame.jpg',
    '/assets/expressions/space/before/exp-4-when-voyager-is-midway-about-to-hit.jpg',
    '/assets/expressions/space/before/exp-5-when-voyager-about-to-touch.jpg',
    '/assets/expressions/space/after/exp-6-moves-eyes-during-human-history.jpg',
    '/assets/expressions/space/after/exp-7.jpg',
    '/assets/expressions/space/after/exp-8.jpg',
  ])
  const [currExp, setExp] = useState(expression1)

  useEffect(() => {
    let currentTl: any

    if (currExpProp.currExpProp === 0) {
      setExp(expression1)
    } else if (currExpProp.currExpProp === 1) {
      setExp(expression2)
    } else if (currExpProp.currExpProp === 2) {
      setExp(expression3)
    } else if (currExpProp.currExpProp === 3) {
      setExp(expression4)
    } else if (currExpProp.currExpProp === 4) {
      setExp(expression5)
    } else if (currExpProp.currExpProp === 5) {
      setExp(expression6)
      if (expression) {
        currentTl = gsap.fromTo(
          expression.current.position,
          {
            x: -0.025,
          },
          {
            x: 0.025,
            duration: 0.05,
            repeat: -1,
            yoyo: true,
            ease: 'none',
          }
        )
      }
    } else if (currExpProp.currExpProp === 6) {
      setExp(expression7)
    } else if (currExpProp.currExpProp === 7) {
      setExp(expression8)
    }

    return () => {
      if (currentTl) {
        currentTl.kill()
        if (expression) gsap.set(expression.current.position, { x: 0 })
      }
    }
  }, [expression, currExpProp])

  return (
    <mesh
      scale={2.35}
      position={[0, 0.3, -1]}
      rotation={[-Math.PI / 20, 0, 0]}
      ref={expression}
    >
      <planeGeometry args={[0.4, 0.4, 4, 4]} />
      <meshBasicMaterial color={0xffffff} alphaMap={currExp} alphaTest={0.1} />
    </mesh>
  )
}
