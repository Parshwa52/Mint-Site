import { AsciiRenderer, useTexture } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { EffectComposer, Glitch } from '@react-three/postprocessing'
import { useEffect, useState } from 'react'

export const Q2MaskCanvas = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      }}
      dpr={0.5}
    >
      <Face />
      {/* <AsciiRenderer resolution={0.6} fgColor='white' bgColor='transparent' /> */}
      <EffectComposer>
        <Glitch />
      </EffectComposer>
    </Canvas>
  )
}

const Face = () => {
  const [expression1, expression2] = useTexture([
    '/assets/expressions/scene2/exp-2.png',
    '/assets/expressions/scene2/exp-1.png',
  ])
  const [currExp, setExp] = useState(expression1)

  useEffect(() => {
    const interval = setInterval(() => {
      if (currExp === expression1) setExp(expression2)
      else if (currExp === expression2) setExp(expression1)
    }, 1000)

    return () => clearInterval(interval)
  }, [currExp])

  return (
    <mesh
      scale={7}
      position={[-0.17, 0.3, -1]}
      rotation={[-Math.PI / 20, 0, 0]}
    >
      <planeGeometry args={[0.4, 0.4, 4, 4]} />
      <meshBasicMaterial color={0xffffff} alphaMap={currExp} alphaTest={0.5} />
    </mesh>
  )
}
