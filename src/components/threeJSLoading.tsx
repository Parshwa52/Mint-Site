import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { LoadingMouse } from "./loadingMouse";

const ThreeJSLoading = () => {
  // Create a reference to the mount point for the Three.js scene
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mount.current) return;

    // Create a new Three.js scene and set its background color
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000);

    // Create a new camera and position it
    let camera = new THREE.PerspectiveCamera(
      60, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      1, // Near clipping plane
      1000 // Far clipping plane
    );
    camera.position.set(3, 1, 6);

    // Create a new WebGL renderer and set its size
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add the renderer's DOM element to the mount point
    mount.current.appendChild(renderer.domElement);

    // Update the camera and renderer size when the window is resized
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Create new controls for the camera
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 30;

    // Define some properties for the particles
    let gu = {
      time: { value: 0 },
    };
    let sizes = [];
    let shift: Array<number> = [];
    let pushShift = () => {
      shift.push(
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2,
        (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
        Math.random() * 0.9 + 0.1
      );
    };

    // Create an array of 50,000 random points
    let pts = new Array(50000).fill(undefined).map((p) => {
      sizes.push(Math.random() * 1.5 + 0.5);
      pushShift();
      return new THREE.Vector3()
        .randomDirection()
        .multiplyScalar(Math.random() * 0.5 + 9.5);
    });

    // Add 100,000 more points
    for (let i = 0; i < 100000; i++) {
      let r = 10,
        R = 40;
      let rand = Math.pow(Math.random(), 1.5);
      let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
      pts.push(
        new THREE.Vector3().setFromCylindricalCoords(
          radius,
          Math.random() * 2 * Math.PI,
          (Math.random() - 0.5) * 2
        )
      );
      sizes.push(Math.random() * 1.5 + 0.5);
      pushShift();
    }

    // Create a buffer geometry for the points and set its attributes
    let g = new THREE.BufferGeometry().setFromPoints(pts);
    g.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1));
    g.setAttribute("shift", new THREE.Float32BufferAttribute(shift, 4));

    // Create a new material for the geometry
    const m = new THREE.PointsMaterial({
      size: 0.125,
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    // Modify the material's shader to add custom behavior
    m.onBeforeCompile = (shader: THREE.Shader) => {
      shader.uniforms.time = gu.time;
      shader.vertexShader = `
          uniform float time;
          attribute float sizes;
          attribute vec4 shift;
          varying vec3 vColor;
          ${shader.vertexShader}`
        .replace(`gl_PointSize = size;`, `gl_PointSize = size * sizes;`)
        .replace(
          `#include <color_vertex>`,
          `#include <color_vertex>
           float d = length(abs(position) / vec3(40., 10., 40.));
           d = clamp(d, 0., 1.);
           vColor = mix(vec3(40., 187., 217) / 255., vec3(228., 41., 136) / 255.,  d);
           `
        )
        
        .replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>
          float t = time;
          float moveT = mod(shift.x + shift.z * t, PI2);
          float moveS = mod(shift.y + shift.z * t, PI2);
          transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
        `
        );

      shader.fragmentShader = `
          varying vec3 vColor;
          ${shader.fragmentShader}
        `
        .replace(
          `#include <clipping_planes_fragment>`,
          `#include <clipping_planes_fragment>
            float d = length(gl_PointCoord.xy - 0.5);
            //if (d > 0.5) discard;
          `
        )
        .replace(
          `vec4 diffuseColor = vec4( diffuse, opacity );`,
          `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d)/* * 0.5 + 0.5*/ );`
        );
    };

    // Create the points object and add it to the scene
    const p = new THREE.Points(g, m);
    p.rotation.order = "ZYX";
    p.rotation.z = 0.2;
    scene.add(p);

    // Create a clock to keep track of time for animations
    let clock = new THREE.Clock();

    // Render the scene on every animation frame
    renderer.setAnimationLoop(() => {
      controls.update();
      let t = clock.getElapsedTime() * 0.5;
      gu.time.value = t * Math.PI;
      p.rotation.y = t * 0.05;
      renderer.render(scene, camera);
    });
  }, []);

  return (
    <div ref={mount} className="relative w-screen h-screen overflow-hidden cursor-all-scroll	">
      <div className="absolute -ml-[65px] mt-5 text-white font-heading">
        <LoadingMouse />
      </div>
    </div>
  );
};

export default ThreeJSLoading;
