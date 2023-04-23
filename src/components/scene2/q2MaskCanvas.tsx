import { useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Glitch } from '@react-three/postprocessing'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

export const Q2MaskCanvas = (props: any) => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      }}
      dpr={1}
    >
      <Face currExpProp={props.currExp} />
      <EffectComposer>
        <Glitch
          // @ts-ignore
          delay={[0.5, 2.5]} // min and max glitch delay
          // @ts-ignore
          duration={[0.6, 1.0]} // min and max glitch duration
          // @ts-ignore
          strength={[0.3, 1.0]} // min and max glitch strength
          active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
          ratio={0.85}
        />
      </EffectComposer>
    </Canvas>
  )
}

const Face = (currExpProp: any) => {
  const expression: any = useRef()
  const staticExpression: any = useRef()

  // Entrance textures
  const [expression1, expression2] = useTexture([
    '/assets/expressions/world/dynamic/exp-1.jpg',
    '/assets/expressions/world/dynamic/exp-2.jpg',
  ])
  // Failure textures
  const [
    staticExpression1,
    batteryExpression1,
    batteryExpression2,
    batteryExpression3,
    batteryExpression4,
  ] = useTexture([
    '/assets/expressions/world/static/exp-1-2-base.jpg',
    '/assets/expressions/world/static/exp-battery-1.jpg',
    '/assets/expressions/world/static/exp-battery-2.jpg',
    '/assets/expressions/world/static/exp-battery-3.jpg',
    '/assets/expressions/world/static/exp-battery-4.jpg',
  ])
  const [
    loadingFailStatic,
    loadingFailDots1,
    loadingFailDots2,
    loadingFailDots3,
    loadingFailDots4,
    loadingFailDots5,
    loadingFailDots6,
  ] = useTexture([
    '/assets/expressions/world/static/exp-eyes-2.jpg',
    '/assets/expressions/world/static/exp-dot-1.jpg',
    '/assets/expressions/world/static/exp-dot-2.jpg',
    '/assets/expressions/world/static/exp-dot-3.jpg',
    '/assets/expressions/world/static/exp-dot-4.jpg',
    '/assets/expressions/world/static/exp-dot-5.jpg',
    '/assets/expressions/world/static/exp-dot-6.jpg',
  ])
  // Success textures
  const [
    success1Static,
    success11,
    success12,
    success13,
    success2Static,
    success21,
    success3Static,
    success31,
    success32,
    success33,
    success34,
  ] = useTexture([
    '/assets/expressions/world/static/success/1/exp-base.jpg',
    '/assets/expressions/world/static/success/1/exp-1.jpg',
    '/assets/expressions/world/static/success/1/exp-2.jpg',
    '/assets/expressions/world/static/success/1/exp-3.jpg',
    '/assets/expressions/world/static/success/2/exp-base.jpg',
    '/assets/expressions/world/static/success/2/exp-1.jpg',
    '/assets/expressions/world/static/success/3/exp-base.jpg',
    '/assets/expressions/world/static/success/3/exp-1.jpg',
    '/assets/expressions/world/static/success/3/exp-2.jpg',
    '/assets/expressions/world/static/success/3/exp-3.jpg',
    '/assets/expressions/world/static/success/3/exp-4.jpg',
  ])
  // Transaction textures
  const [
    transactionBase,
    transaction1,
    transaction2,
    transaction3,
    transaction4,
    transaction5,
    transaction6,
    transaction7,
  ] = useTexture([
    '/assets/expressions/world/static/transact/exp-base.jpg',
    '/assets/expressions/world/static/transact/exp-1.jpg',
    '/assets/expressions/world/static/transact/exp-2.jpg',
    '/assets/expressions/world/static/transact/exp-3.jpg',
    '/assets/expressions/world/static/transact/exp-4.jpg',
    '/assets/expressions/world/static/transact/exp-5.jpg',
    '/assets/expressions/world/static/transact/exp-6.jpg',
    '/assets/expressions/world/static/transact/exp-7.jpg',
  ])

  const [currExp, setExp] = useState(expression1)
  const [currExpStatic, setStaticExp] = useState(staticExpression1)

  useEffect(() => {
    let currentTl: any

    // entrance
    if (currExpProp.currExpProp === 0) {
      if (expression) expression.current.visible = true
      setExp(expression1)
      setStaticExp(staticExpression1)
    } else if (currExpProp.currExpProp === 1) {
      setExp(expression2)
    }
    // success
    else if (currExpProp.currExpProp === 2) {
      // success first phase
      currentTl = gsap
        // smirk
        .timeline({
          onStart: () => {
            setExp(loadingFailStatic)
            setStaticExp(loadingFailDots1)
          },
        })
        // fake failure animation
        .call(
          () => {
            setStaticExp(loadingFailDots2)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setStaticExp(loadingFailDots3)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setStaticExp(loadingFailDots4)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setStaticExp(loadingFailDots5)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setStaticExp(loadingFailDots6)
          },
          undefined,
          '>+.5'
        )
        // battery
        .call(
          () => {
            if (expression) expression.current.visible = false
            setStaticExp(batteryExpression1)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setStaticExp(batteryExpression2)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setStaticExp(batteryExpression3)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setStaticExp(batteryExpression4)
          },
          undefined,
          '>+.5'
        )
        // success animation
        .call(
          () => {
            if (expression) expression.current.visible = true
            setExp(success11)
            setStaticExp(success1Static)
          },
          undefined,
          '>+.75'
        )
        .call(
          () => {
            setExp(success12)
          },
          undefined,
          '>+.75'
        )
        .call(
          () => {
            setExp(success11)
          },
          undefined,
          '>+.75'
        )
        .call(
          () => {
            setExp(success12)
          },
          undefined,
          '>+.75'
        )
        .call(
          () => {
            setExp(success13)
            if (staticExpression.current)
              staticExpression.current.visible = false
          },
          undefined,
          '>+.75'
        )
        // 2
        .addLabel('phase2', '>+2')
        .call(
          () => {
            setExp(success21)
            setStaticExp(success2Static)
            if (staticExpression.current)
              staticExpression.current.visible = true
          },
          undefined,
          'phase2'
        )
        .to(
          expression.current.position,
          { x: -0.04, repeat: 5, yoyo: true, duration: 0.5, ease: 'none' },
          'phase2'
        )
        // 3
        .addLabel('phase3', '>')
        .call(
          () => {
            setExp(success31)
            setStaticExp(success3Static)
          },
          undefined,
          'phase3'
        )
        .call(
          () => {
            setExp(success32)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setExp(success33)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setExp(success34)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setExp(success33)
          },
          undefined,
          '>+1.5'
        )
        .call(
          () => {
            setExp(success32)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setExp(success31)
          },
          undefined,
          '>+.5'
        )
    }
    // failure
    else if (currExpProp.currExpProp === 3) {
      // battery
      currentTl = gsap
        // dots
        .timeline({
          onStart: () => {
            setExp(loadingFailStatic)
            setStaticExp(loadingFailDots1)
          },
        })
        .call(
          () => {
            setStaticExp(loadingFailDots2)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setStaticExp(loadingFailDots3)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setStaticExp(loadingFailDots4)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setStaticExp(loadingFailDots5)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setStaticExp(loadingFailDots6)
          },
          undefined,
          '>+.5'
        )
        // battery
        .call(
          () => {
            if (expression) expression.current.visible = false
            setStaticExp(batteryExpression1)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setStaticExp(batteryExpression2)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setStaticExp(batteryExpression3)
          },
          undefined,
          '>+.5'
        )
        .call(
          () => {
            setStaticExp(batteryExpression4)
          },
          undefined,
          '>+.5'
        )
    }
    // transaction
    else if (currExpProp.currExpProp === 4) {
      if (expression) expression.current.visible = true
      currentTl = gsap
        .timeline({
          onStart: () => {
            setStaticExp(transactionBase)
          },
          repeat: -1,
        })
        .call(
          () => {
            setExp(transaction1)
          },
          undefined,
          0
        )
        .call(
          () => {
            setExp(transaction2)
          },
          undefined,
          '>+.25'
        )
        .call(
          () => {
            setExp(transaction3)
          },
          undefined,
          '>+.25'
        )
        .call(
          () => {
            setExp(transaction4)
          },
          undefined,
          '>+.25'
        )
        .call(
          () => {
            setExp(transaction5)
          },
          undefined,
          '>+.25'
        )
        .call(
          () => {
            setExp(transaction6)
          },
          undefined,
          '>+.25'
        )
        .call(
          () => {
            setExp(transaction7)
          },
          undefined,
          '>+.25'
        )
    }

    return () => {
      if (currentTl) {
        currentTl.kill()
        if (expression) gsap.set(expression.current.position, { x: 0 })
      }
    }
  }, [expression, staticExpression, currExpProp])

  return (
    <group
      scale={2.25}
      position={[0, 0.3, -1]}
      rotation={[-Math.PI / 20, 0, 0]}
    >
      <mesh ref={expression}>
        <planeGeometry args={[0.4, 0.4, 4, 4]} />
        <meshBasicMaterial
          color={0xffffff}
          alphaMap={currExp}
          alphaTest={0.1}
        />
      </mesh>
      <mesh ref={staticExpression}>
        <planeGeometry args={[0.4, 0.4, 4, 4]} />
        <meshBasicMaterial
          map={currExpStatic}
          color={0xffffff}
          alphaMap={currExpStatic}
          alphaTest={0.1}
        />
      </mesh>
    </group>
  )
}
