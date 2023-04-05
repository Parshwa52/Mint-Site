import * as THREE from 'three'
import { useEffect } from 'react'

export const ThreeJSBackground = () => {
  useEffect(() => {
    //Declare three.js variables
    let camera: any,
      scene: any,
      renderer: any,
      stars: any = []

    //assign three.js objects to each variable
    function init() {
      //camera
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
      )
      camera.position.z = 5

      //scene
      scene = new THREE.Scene()
      scene.add(camera)

      const canvas = document.querySelector('#canvas-bg') as HTMLDivElement

      //renderer
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
      })
      //set the size of the renderer
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    function addSphere() {
      // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
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
    }

    function animateStars() {
      // loop through each star
      for (var i = 0; i < stars.length; i++) {
        const star = stars[i]

        // and move it forward dependent on the mouseY position.
        star.position.z += i / 50

        // if the particle is too close move it to the back
        if (star.position.z > 1000) star.position.z -= 2000
      }
    }

    function render() {
      animateStars()

      //get the frame
      requestAnimationFrame(render)

      //render the scene
      renderer.render(scene, camera)
    }

    init()
    addSphere()
    render()
  }, [])
  return (
    <div className='scene scene-bg'>
      <canvas id='canvas-bg'></canvas>
    </div>
  )
}
