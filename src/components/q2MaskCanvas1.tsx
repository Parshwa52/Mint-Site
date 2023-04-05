import { useTexture, AsciiRenderer } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Glitch } from '@react-three/postprocessing'
import { useEffect, useState, useRef } from 'react'

export const Q2MaskCanvas = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      }}
      dpr={0.5}
    >
      {/* <color attach='background' args={'red'} /> */}
      <Face />
      {/* <AsciiRenderer resolution={0.25} fgColor='white' characters='@%$+*' /> */}
      {/* <EffectComposer>
        <Glitch />
      </EffectComposer> */}
    </Canvas>
  )
}

const Face = () => {
  const mesh = useRef()
  const [expression1, expression2] = useTexture([
    '/assets/expressions/scene1/exp-2.png',
    '/assets/expressions/scene1/exp-1.png',
  ])
  const [currExp, setExp] = useState(expression1)

  useEffect(() => {
    setInterval(() => {
      if (currExp === expression1) setExp(expression2)
      else if (currExp === expression2) setExp(expression1)
    }, 2000)
  }, [currExp])

  // useFrame((delta) => {
  //   mesh.current.position.x = Math.sin(delta) / 100
  // })
  return (
    <mesh
      //@ts-ignore
      ref={mesh}
      scale={4.25}
      position={[0.075, 0.3, -1]}
      rotation={[-Math.PI / 20, 0, 0]}
    >
      <planeGeometry args={[0.4, 0.4, 4, 4]} />
      <meshBasicMaterial color={0xffffff} map={currExp} />
    </mesh>
  )
}
