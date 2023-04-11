import * as THREE from 'three'
import { useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

const StarField = () => {
  const { scene } = useThree()

  const stars = useMemo(() => {
    const stars: any = []
    for (var z = -2000; z < 2000; z += 20) {
      // Make a sphere (exactly the same as before).
      var geometry = new THREE.SphereGeometry(0.5, 32, 32)
      var material = new THREE.MeshBasicMaterial({ color: 0xffffff })
      var sphere = new THREE.Mesh(geometry, material)
      // This time we give the sphere random x and y positions between -500 and 500
      sphere.position.x = Math.random() * 1000 - 500
      sphere.position.y = Math.random() * 1000 - 500
      // Then set the z position to where it is in the loop (distance of camera)
      sphere.position.z = z
      // scale it up a bit
      sphere.scale.x = sphere.scale.y = 2
      //add the sphere to the scene
      scene.add(sphere)
      //finally push it to the stars array
      stars.push(sphere)
    }
    return stars
  }, [])

  useFrame(() => {
    // loop through each star
    for (var i = 0; i < stars.length; i++) {
      const star = stars[i]
      star.position.z += i / 50
      // if the particle is too close move it to the back
      if (star.position.z > 1000) star.position.z -= 2000
    }
  })

  return <></>
}

export const ThreeJSBackground = () => {
  return (
    <div className='scene scene-bg'>
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
          near: 1,
          far: 1000,
        }}
      >
        <StarField />
      </Canvas>
    </div>
  )
}
