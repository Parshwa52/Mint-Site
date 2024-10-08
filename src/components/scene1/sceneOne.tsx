import { useGlobalContext } from "@/provider/globalProvider";
import {
  PerspectiveCamera,
  RenderTexture,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, GodRays } from "@react-three/postprocessing";
import {
  BlendFunction,
  BloomEffect,
  // EffectComposer,
  EffectPass,
  GodRaysEffect,
  RenderPass,
} from "postprocessing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  DefaultLoadingManager,
  DoubleSide,
  NearestFilter,
  PlaneGeometry,
  RepeatWrapping,
  Texture,
} from "three";
import { getAudio } from "../audioManager";

export const SceneOne = () => {
  const { scrollLenis, soundsArray } = useGlobalContext();

  const unscrollableTl = useRef<any>(null);
  const scrollableTl = useRef<any>(null);

  const [q2, setQ2] = useState<any>(null);
  const [kiwi, setKiwi] = useState<any>(null);
  const [planet, setPlanet] = useState<any>(null);
  const [voyager, setVoyager] = useState<any>(null);
  const [lights, setLights] = useState<any>(null);
  const [images, setImages] = useState<any>(null);
  const [expressions, setExpressions] = useState<any>(null);
  const [currImage, setImage] = useState(0);
  const [currExp, setExp] = useState(0);
  const [isKiwiHoverable, setKiwiHoverable] = useState(false);

  useEffect(() => {
    // Local storage to not play again first animation
    const ls = localStorage.getItem("kubrick") || "";
    const updater = {
      currPreImage: 0,
      currImage: 0,
      currExp: 0,
      currExp2: 6,
    };
    let lastTime = 0;
    let lastSecondTime = 0;

    const ctx = gsap.context(() => {
      if (
        q2 &&
        planet &&
        voyager &&
        kiwi &&
        lights &&
        expressions &&
        !unscrollableTl.current &&
        !scrollableTl.current
      ) {
        // first expression loop
        const expressionTl = gsap
          .timeline({
            repeat: -1,
            defaults: {
              duration: 1,
              ease: "none",
            },
          })
          .to(updater, {
            currExp: 1,
            onUpdate: () => {
              setExp(Math.round(updater.currExp));
            },
          })
          .to(updater, {
            currExp: 0,
            onUpdate: () => {
              setExp(Math.round(updater.currExp));
            },
          });
        // last expression loop
        const expressionLastTl = gsap
          .timeline({
            repeat: -1,
            paused: true,
            defaults: {
              duration: 1,
              ease: "none",
            },
          })
          .to(updater, {
            currExp2: 7,
            onUpdate: () => {
              setExp(Math.round(updater.currExp2));
            },
          })
          .to(updater, {
            currExp2: 6,
            onUpdate: () => {
              setExp(Math.round(updater.currExp2));
            },
          });
        // voyager rotation
        gsap.timeline({ repeat: -1 }).to(voyager.rotation, {
          z: Math.PI * 2,
          duration: 7.5,
          ease: "none",
        });

        // typing
        const typingTl = gsap
          .timeline({
            paused: true,
            onStart: () => {
              // Play Welcome Audio as typing starts
              const welcomeAudio = getAudio("audio-welcome");
              welcomeAudio.volume = 1;
              welcomeAudio.play();
            },
            onComplete: () => {
              scrollLenis?.start();
            },
          })
          .set(
            "#ui .ui-space .ui-text",
            {
              display: "flex",
            },
            0
          )
          .to(
            "#ui .ui-text ul",
            {
              autoAlpha: 1,
              duration: 1.25,
              ease: "expo.inOut",
            },
            0
          )
          .from(
            "#ui #text-1",
            {
              autoAlpha: 0,
              duration: 0.1,
              stagger: 0.1,
              ease: "none",
            },
            0
          )
          .set(
            "#ui #text-1 .phrase-1",
            {
              display: "block",
            },
            0
          )
          .from(
            "#ui #text-1 .phrase-1 span span",
            {
              display: "none",
              duration: 0.1,
              stagger: 0.15,
              ease: "none",
            },
            0
          )
          .to(
            "#ui #text-1 .phrase-1 span span",
            {
              display: "none",
              duration: 0.1,
              stagger: -0.05,
              ease: "none",
            },
            ">+=.75"
          )
          .set(
            "#ui #text-1 .phrase-1",
            {
              display: "none",
            },
            ">+=.5"
          )
          .set(
            "#ui #text-1 .phrase-2",
            {
              display: "block",
            },
            ">"
          )
          .from(
            "#ui #text-1 .phrase-2 span span",
            {
              display: "none",
              duration: 0.1,
              stagger: 0.15,
              ease: "none",
            },
            ">"
          )
          .to(
            "#ui #text-1 .phrase-2 span span",
            {
              display: "none",
              duration: 0.1,
              stagger: -0.05,
              ease: "none",
            },
            ">+=.75"
          )
          .set(
            "#ui .ui-space .ui-text",
            {
              display: "none",
            },
            ">+=.5"
          );

        // unscrollableTl
        if (ls === "true") {
          unscrollableTl.current = gsap
            .timeline({
              paused: true,
              onComplete: () => {
                document.body.style.height = "auto";
                document.body.style.overflow = "auto";
                gsap.to(".canvas-scroll", {
                  autoAlpha: 1,
                  duration: 1.25,
                  ease: "expo",
                });
              },
            })
            .set(planet.children[0].material, { visible: false })
            .set(
              kiwi[0].position,
              {
                z: 0.01,
              },
              0
            )
            .to(
              "#mouse .border-top .border-background",
              {
                scaleX: 1,
                ease: "expo.inOut",
                duration: 1.25,
              },
              0
            )
            .from(
              ["#ui .ui-part.ui-top", "#ui .ui-part.ui-mid"],
              {
                yPercent: -100,
                scale: 1.1,
                ease: "expo",
                duration: 1.5,
              },
              0
            )
            .from(
              "#ui .ui-part.ui-lower",
              {
                yPercent: 100,
                scale: 1.1,
                ease: "expo",
                duration: 1.5,
              },
              0
            )
            .to("#ui", { opacity: 1, duration: 0.75, ease: "expo.inOut" }, 0)
            .to(
              lights[0],
              {
                intensity: 0.15,
                duration: 2,
                ease: "power1.inOut",
              },
              0.5
            )
            .to(
              lights[1],
              {
                intensity: 3,
                duration: 2,
                ease: "power1.inOut",
              },
              0.5
            )
            .call(
              () => {
                setKiwiHoverable(true);
              },
              undefined,
              0.5
            )
            .from(
              kiwi[1].scale,
              {
                x: 0,
                y: 0,
                duration: 2.25,
                ease: "expo",
              },
              0.5
            )
            .from(
              expressions.material,
              {
                opacity: 0,
                duration: 1.5,
                ease: "back",
              },
              1
            )
            .fromTo(
              images.material,
              { opacity: 0 },
              { opacity: 1, duration: 1.25, ease: "power2.inOut" },
              1.5
            )
            // .to(
            //   updater,
            //   {
            //     currPreImage: 4,
            //     duration: 1,
            //     ease: 'none',
            //     onUpdate: () => {
            //       setImage(Math.round(updater.currPreImage))
            //     },
            //   },
            //   1.5
            // )
            .call(
              () => {
                unscrollableTl.current.reversed()
                  ? scrollLenis?.stop()
                  : scrollLenis?.start();
              },
              undefined,
              1.5
            );
        } else {
          unscrollableTl.current = gsap
            .timeline({
              paused: true,
              onComplete: () => {
                document.body.style.height = "auto";
                document.body.style.overflow = "auto";
                gsap.to(".canvas-scroll", {
                  autoAlpha: 1,
                  duration: 1.25,
                  ease: "expo",
                });
                // set local storage
                localStorage.setItem("kubrick", "true");
              },
            })
            .to(
              "#mouse .border-top .border-background",
              {
                scaleX: 1,
                ease: "none",
                duration: 47,
              },
              0
            )
            .from(
              ["#ui .ui-part.ui-top", "#ui .ui-part.ui-mid"],
              {
                yPercent: -100,
                scale: 1.1,
                duration: 3,
              },
              0
            )
            .from(
              "#ui .ui-part.ui-lower",
              {
                yPercent: 100,
                scale: 1.1,
                duration: 3,
              },
              0
            )
            .to("#ui", { opacity: 1, duration: 3, ease: "expo.inOut" }, 0)
            .to(
              lights[0],
              {
                intensity: 0.025,
                duration: 6,
                ease: "power1.in",
              },
              0
            )
            .from(
              kiwi[1].scale,
              {
                x: 0,
                y: 0,
                duration: 8.5,
                ease: "power1.inOut",
              },
              8
            )
            .fromTo(
              planet.children[0].position,
              { y: 0.015 },
              {
                y: -0.35,
                duration: 45,
                ease: "none",
              },
              0
            )
            .from(
              q2.position,
              {
                y: -3,
                duration: 10,
                ease: "power1",
              },
              5
            )
            .to(
              lights[0],
              {
                intensity: 0.05,
                duration: 10,
                ease: "power1.inOut",
              },
              5
            )
            .from(
              expressions.material,
              {
                opacity: 0.25,
                duration: 2,
                ease: "expo.inOut",
              },
              12
            )
            .to(
              lights[1],
              {
                intensity: 3,
                duration: 20,
                ease: "power1.inOut",
              },
              16.5
            )
            .fromTo(
              kiwi[0].position,
              {
                y: -0.2,
              },
              {
                y: 0.05,
                duration: 12,
                ease: "power1",
              },
              17
            )
            .to(
              kiwi[1].position,
              {
                y: "+=0.05",
                duration: 12,
                ease: "power1",
              },
              17
            )
            .to(
              kiwi[1].position,
              {
                y: 0.575,
                duration: 3.5,
                ease: "power1.inOut",
              },
              29.5
            )
            .to(
              kiwi[1].scale,
              {
                x: 0.575,
                y: 0.575,
                duration: 3.5,
                ease: "power1.inOut",
              },
              29.5
            )
            .to(
              kiwi[0].position,
              {
                y: 0,
                duration: 3.5,
                ease: "power1.inOut",
              },
              29.5
            )
            .to(
              kiwi[0].position,
              {
                z: 0.01,
                duration: 1,
                ease: "power2.inOut",
              },
              29.5
            )
            .call(
              () => {
                setKiwiHoverable(true);
              },
              undefined,
              29.5
            )
            .from(
              voyager.position,
              {
                y: 3,
                x: 12,
                duration: 13,
                // ease: 'power1',
                ease: "back",
              },
              33.5
            )
            .from(
              voyager.rotation,
              {
                x: Math.PI,
                duration: 7,
                ease: "power2.inOut",
              },
              33.5
            )
            .call(
              () => {
                if (expressionTl.isActive()) {
                  expressionTl.pause();
                  setExp(2);
                } else expressionTl.play();
              },
              undefined,
              35
            )
            .to(
              lights[0],
              {
                intensity: 0.15,
                duration: 10,
                ease: "power1.inOut",
              },
              35
            )
            .call(
              () => {
                if (lastTime === 0) {
                  setExp(3);
                  lastTime = 1;
                } else {
                  setExp(2);
                  lastTime = 0;
                }
              },
              undefined,
              39.5
            )
            .call(
              () => {
                if (lastTime === 1) {
                  setExp(4);
                  images.visible = true;
                  lastTime = 2;
                  // refresh scroll trigger
                  const scrollTrigger = ScrollTrigger.getById("scrollable");
                  scrollTrigger?.refresh();
                  scrollTrigger?.update();
                } else {
                  setExp(3);
                  images.visible = false;
                  lastTime = 1;
                }
              },
              undefined,
              45.5
            )
            .from(
              images.material,
              { opacity: 0, duration: 1, ease: "power2.inOut" },
              45.5
            )
            // .to(
            //   voyager.position,
            //   {
            //     y: 0.1,
            //     x: 0.1,
            //     duration: 1.5,
            //     ease: 'back.inOut',
            //   },
            //   46.5
            // )
            .to(
              updater,
              {
                currPreImage: 4,
                duration: 1.5,
                ease: "none",
                onUpdate: () => {
                  setImage(Math.round(updater.currPreImage));
                },
              },
              46.5
            )
            .call(
              () => {
                unscrollableTl.current.reversed()
                  ? scrollLenis?.stop()
                  : scrollLenis?.start();
              },
              undefined,
              48
            )
            .set(
              planet,
              {
                visible: false,
              },
              48
            );
        }

        // if (ls === 'true') {
        //   unscrollableTl.current.progress(1)
        // }

        // if

        let lastscroll = 0;
        let lastImgDuration = 40;
        // scrollableTl
        scrollableTl.current = gsap
          .timeline({
            scrollTrigger: {
              trigger: "#home-hero",
              start: "bottom+=1 bottom",
              end: "+=5000",
              id: "scrollable",
              scrub: true,
              pin: true,
              refreshPriority: 99,
              onEnter: () => {
                if (ls === "true") {
                  expressionTl.pause();
                  images.visible = true;
                }
              },
              // onEnterBack: () => {
              //   typingTl.play()
              // },
              // onLeave: () => {
              //   typingTl.reverse()
              // },
              onLeaveBack: () => {
                if (ls === "true") expressionTl.play();
              },
            },
          })
          // if (ls === 'true') {
          //   scrollableTl.current.call(
          //     () => {
          //       if (scrollableTl.current.progress() > lastscroll)
          //         expressionTl.pause()
          //       else expressionTl.play()

          //       lastscroll = scrollableTl.current.progress()
          //     },
          //     undefined,
          //     0
          //   )
          // }
          // scrollableTl.current
          .to(
            "#mouse .border-bottom .border-background",
            {
              scaleX: 0.8,
              ease: "none",
              duration: 100,
            },
            0
          )
          .to(
            updater,
            {
              currImage: 70,
              duration: lastImgDuration,
              ease: "none",
              onUpdate: () => {
                setImage(Math.round(updater.currImage));
              },
            },
            0
          )
          .to(
            "#mouse .dot",
            {
              autoAlpha: 0,
              duration: 1.25,
              ease: "expo.inOut",
            },
            0
          )
          .to(
            "#mouse .mouse-scroll",
            {
              autoAlpha: 1,
              duration: 1.25,
              ease: "expo.inOut",
            },
            0
          )
          .to(
            ".canvas-scroll",
            {
              autoAlpha: 0,
              duration: 15,
              ease: "none",
            },
            0
          )
          .call(
            () => {
              if (lastSecondTime === 0) {
                setExp(5);
                lastSecondTime = 1;
              } else {
                setExp(4);
                lastSecondTime = 0;
              }
            },
            undefined,
            1
          )
          .to(
            "#mouse .mouse-scroll",
            {
              autoAlpha: 0,
              duration: 1.25,
              ease: "expo.inOut",
            },
            lastImgDuration
          )
          .to(
            images.material,
            { opacity: 0, duration: 2, ease: "back.inOut" },
            lastImgDuration
          )
          .to(
            voyager.position,
            {
              y: -3,
              x: 10,
              duration: 36,
              ease: "power1.in",
            },
            lastImgDuration + 1
          )
          .to(
            voyager.rotation,
            {
              x: Math.PI,
              duration: 36,
              ease: "power2.inOut",
            },
            lastImgDuration + 1
          )
          .call(
            () => {
              if (expressionLastTl.isActive()) {
                expressionLastTl.pause();
                setExp(5);
              } else expressionLastTl.play();
            },
            undefined,
            lastImgDuration + 2
          )
          .call(
            () => {
              if (scrollableTl.current.progress() > lastscroll) {
                typingTl.play();
                scrollLenis?.stop();
              } else typingTl.reverse();

              lastscroll = scrollableTl.current.progress();
            },
            undefined,
            lastImgDuration + 2
          )
          .to(
            q2.position,
            {
              y: -10,
              duration: 20,
              ease: "power2.in",
            },
            lastImgDuration + 7
          )
          .to(
            kiwi[1].position,
            {
              y: 0,
              duration: 15,
              ease: "power1.inOut",
            },
            lastImgDuration + 12
          )
          .to(
            kiwi[1].scale,
            {
              x: 0,
              y: 0,
              duration: 15,
              ease: "power1.inOut",
            },
            lastImgDuration + 12
          );
      }

      return () => {
        if (unscrollableTl.current) unscrollableTl.current.revert();
        if (scrollableTl.current) scrollableTl.current.revert();
      };
    });

    return () => ctx.revert();
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
    expressions,
    setExpressions,
    setImage,
    setExp,
  ]);

  useEffect(() => {
    gsap
      .timeline({
        repeat: -1,
        yoyo: true,
      })
      .fromTo(
        ".canvas-scroll .scroll-arrow",
        {
          yPercent: -45,
        },
        {
          yPercent: 45,
          ease: "power1.inOut",
          duration: 1.5,
          stagger: {
            amount: 0.45,
          },
        }
      );
  }, []);

  function handleStartClick() {
    // sound manager
    const ls = localStorage.getItem("kubrick") || "";

    soundsArray[2].play();

    if (ls === "true") {
      soundsArray[0].volume = 0;
      soundsArray[1].play();
    } else {
      soundsArray[0].play();
      setTimeout(() => {
        soundsArray[1].play();
        gsap.from(soundsArray[1], {
          volume: 0,
          duration: 1.25,
          ease: "none",
        });
      }, 74000);
    }

    // sound button
    gsap.timeline().set("#sound-button", { display: "block" }).fromTo(
      "#sound-button",
      { scale: 0 },
      {
        scale: 1,
        ease: "back.inOut",
      },
      0
    );

    gsap
      .timeline({
        onComplete: () => {
          unscrollableTl.current?.play();
        },
      })
      .to(".canvas-loader", {
        autoAlpha: 0,
        duration: 1.25,
        ease: "power4.inOut",
      })
      .set(".canvas-loader", { display: "none" });
  }

  return (
    <section className="canvas-container">
      <Loader onLoaded={() => handleStartClick()} />
      <div className="canvas-scroll">
        <div className="scroll-arrow"></div>
        <div className="scroll-arrow"></div>
        <div className="scroll-arrow"></div>
      </div>
      <Canvas
        dpr={[1, 1.25]}
        gl={{
          antialias: false,
          stencil: false,
          powerPreference: "high-performance",
        }}
        id="canvas-one"
      >
        <Q2
          setInstance={setQ2}
          setKiwiInstance={setKiwi}
          setImagesInstance={setImages}
          setExpressionsInstance={setExpressions}
          isKiwiHoverable={isKiwiHoverable}
          currImage={currImage}
          currExp={currExp}
        />
        <Planet setInstance={setPlanet} />
        <Voyager setInstance={setVoyager} />
        <Lights setInstance={setLights} />
      </Canvas>
    </section>
  );
};

const Loader = ({ onLoaded }: { onLoaded: Function }) => {
  const [threejsLoaded, setThreejsLoaded] = useState(false);
  const [totalLoaded, setTotalLoaded] = useState(0);
  const [mediaLoaded, setMediaLoaded] = useState(0);
  let mediaLoaded2 = 0;

  useEffect(() => {
    if (
      mediaLoaded >= totalLoaded &&
      mediaLoaded > 0 &&
      totalLoaded > 0 &&
      threejsLoaded
    ) {
      gsap
        .timeline({
          // onComplete: () => {
          //   onLoaded()
          // },
        })

        .to(".canvas-loader .spinner", {
          scale: 0,
          duration: 1.25,
          ease: "back.inOut",
        })
        .to(".canvas-loader .loader-screen", {
          autoAlpha: 0,
        })
        .fromTo(
          ".canvas-loader .start-screen > *",
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
            ease: "back.inOut",
          }
        )
        .from(
          "#canvas-one",
          {
            autoAlpha: 0,
            duration: 1.25,
            ease: "back.inOut",
          },
          ">-=50%"
        );
    }
  }, [mediaLoaded, totalLoaded, threejsLoaded]);

  useEffect(() => {
    gsap.set([".ui-space", ".ui-world"], {
      display: "block",
    });
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (img.complete) {
        setMediaLoaded(++mediaLoaded2);
      } else {
        img.onload = function () {
          setMediaLoaded(++mediaLoaded2);
        };
      }
    });

    setTotalLoaded(images.length);

    gsap.to(".canvas-loader .spinner", {
      rotate: 360,
      duration: 5,
      ease: "none",
      repeat: -1,
    });
    gsap.to(".canvas-loader .spinner", {
      borderRadius: "50%",
      duration: 2.5,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });

    DefaultLoadingManager.onLoad = function () {
      setThreejsLoaded(true);
    };
  }, []);

  return (
    <div className="canvas-loader">
      <div className="loader-screen">
        <div className="spinner"></div>
      </div>
      <div
        className="start-screen"
        onClick={() => onLoaded()}
        // style={{ cursor: 'pointer' }}
        style={{
          fontSize: "24px",
        }}
      >
        <p>
          Click to start your journey and scroll through the website slowly for
          best experience.
        </p>
      </div>
    </div>
  );
};

const Q2 = (props: any) => {
  const q2 = useRef(null);
  // images
  // mesh
  const q2Geometry = useMemo(() => {
    return new PlaneGeometry(1, 1.6);
  }, []);
  const bandGeometry = useMemo(() => {
    return new PlaneGeometry(1, 1);
  }, []);
  // texture base
  const [body, bodyAlpha, band] = useTexture([
    "/assets/scene1/Q2_space.png",
    "/assets/scene1/Q2_alpha.jpg",
    "/assets/scene1/Q2_band_space.png",
  ]);

  useEffect(() => {
    props.setInstance(q2.current);
  }, [q2]);

  return (
    <group scale={5} ref={q2} position={[0, -1, 0]}>
      <Kiwi
        geometry={q2Geometry}
        setInstance={props.setKiwiInstance}
        isKiwiHoverable={props.isKiwiHoverable}
      />
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
        setInstance={props.setExpressionsInstance}
      />
      <mesh
        geometry={bandGeometry}
        scale={[0.52, 0.45, 1]}
        position={[0, 0.2, 0.005]}
      >
        <meshStandardMaterial map={band} transparent needsUpdate />
      </mesh>
    </group>
  );
};

const Expressions = (props: any) => {
  const expressions: any = useRef(null);
  const expression: any = useRef(null);
  const tl = useRef<GSAPTimeline>();
  const camera = useRef();

  const mask = useTexture("/assets/scene1/Q2_mask.jpg");

  const expArray = useTexture(
    [
      "/assets/scene1/expressions/variant/before/exp-2-eyes-right.png",
      "/assets/scene1/expressions/variant/before/exp-2-eyes-right.png",
      "/assets/scene1/expressions/variant/before/exp-3.png",
      "/assets/scene1/expressions/variant/before/exp-4.png",
      "/assets/scene1/expressions/variant/before/exp-5.png",
      "/assets/scene1/expressions/variant/after/exp-6.png",
      "/assets/scene1/expressions/variant/after/exp-7.png",
      "/assets/scene1/expressions/variant/after/exp-8.png",
    ],
    // @ts-ignore
    (localExpArray: Texture[]) => {
      localExpArray[1].wrapS = RepeatWrapping;
      localExpArray[1].repeat.x = -1;

      localExpArray.forEach((texture: Texture) => {
        texture.generateMipmaps = false;
        texture.minFilter = NearestFilter;
      });
    }
  );

  useEffect(() => {
    const handleCamera = () => {
      if (window.innerWidth / window.innerHeight < 1.5) {
        const minus = 1.5 - window.innerWidth / window.innerHeight / 2;
        expression.current.scale.set(2.75 - minus, 1.15 - minus / 4, 1);
      } else {
        expression.current.scale.set(2.75, 1.15, 1);
      }
    };
    if (expression.current) {
      window.addEventListener("resize", handleCamera);
      handleCamera();
    }
    return () => window.removeEventListener("resize", handleCamera);
  }, [expression]);

  useEffect(() => {
    props.setInstance(expressions.current);

    tl.current = gsap
      .timeline({
        repeat: -1,
        yoyo: true,
        paused: true,
        defaults: {
          duration: 0.05,
          ease: "none",
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
      });

    return () => {
      if (tl.current) tl.current.revert();
      if (expressions.current) gsap.set(expressions.current.position, { x: 0 });
    };
  }, [expressions, tl]);

  useEffect(() => {
    if (expressions.current && props.currExp === 5 && tl.current) {
      tl.current.play();
    }

    return () => {
      if (tl.current && props.currExp === 5) tl.current.restart().pause();
      if (expressions.current) gsap.set(expressions.current.position, { x: 0 });
    };
  }, [props.currExp, expressions, tl]);

  return (
    <mesh ref={expressions} {...props}>
      <meshBasicMaterial alphaMap={mask} transparent needsUpdate>
        {/* @ts-ignore */}
        <RenderTexture attach="map" frames={2}>
          <PerspectiveCamera makeDefault position={[0, 0, 1]} ref={camera} />
          <mesh
            geometry={props.childGeometry}
            scale={[2.75, 1.15, 1]}
            position={[0, 0.2, 0]}
            ref={expression}
          >
            <meshBasicMaterial
              map={expArray[props.currExp]}
              // color='white'
              alphaMap={expArray[props.currExp]}
              transparent
              needsUpdate
            />
          </mesh>
        </RenderTexture>
      </meshBasicMaterial>
    </mesh>
  );
};

const VoyagerImages = (props: any) => {
  const images: any = useRef();

  const mask = useTexture("/assets/scene1/Mask_1.jpg");

  const imagesArray = useTexture([
    "/assets/scene1/voyager/voyager-01.jpg",
    "/assets/scene1/voyager/voyager-02.jpg",
    "/assets/scene1/voyager/voyager-03.jpg",
    "/assets/scene1/voyager/voyager-04.jpg",
    "/assets/scene1/voyager/voyager-05.jpg",
    "/assets/scene1/voyager/voyager-06.jpg",
    "/assets/scene1/voyager/voyager-07.jpg",
    // "/assets/scene1/voyager/voyager-08.jpg",
    // "/assets/scene1/voyager/voyager-09.jpg",
    // "/assets/scene1/voyager/voyager-10.jpg",
    // "/assets/scene1/voyager/voyager-11.jpg",
    // "/assets/scene1/voyager/voyager-12.jpg",
    // "/assets/scene1/voyager/voyager-13.jpg",
    // "/assets/scene1/voyager/voyager-14.jpg",
    // "/assets/scene1/voyager/voyager-15.jpg",
    // "/assets/scene1/voyager/voyager-16.jpg",
    // "/assets/scene1/voyager/voyager-17.jpg",
    // "/assets/scene1/voyager/voyager-18.jpg",
    // "/assets/scene1/voyager/voyager-19.jpg",
    // "/assets/scene1/voyager/voyager-20.jpg",
    // "/assets/scene1/voyager/voyager-21.jpg",
    // "/assets/scene1/voyager/voyager-22.jpg",
    // "/assets/scene1/voyager/voyager-23.jpg",
    // "/assets/scene1/voyager/voyager-24.jpg",
    // "/assets/scene1/voyager/voyager-25.jpg",
    // "/assets/scene1/voyager/voyager-26.jpg",
    // "/assets/scene1/voyager/voyager-27.jpg",
    // "/assets/scene1/voyager/voyager-28.jpg",
    // "/assets/scene1/voyager/voyager-29.jpg",
    // "/assets/scene1/voyager/voyager-30.jpg",
    // "/assets/scene1/voyager/voyager-31.jpg",
    // "/assets/scene1/voyager/voyager-32.jpg",
    // "/assets/scene1/voyager/voyager-33.jpg",
    // "/assets/scene1/voyager/voyager-34.jpg",
    // "/assets/scene1/voyager/voyager-35.jpg",
    // "/assets/scene1/voyager/voyager-36.jpg",
    // "/assets/scene1/voyager/voyager-37.jpg",
    // "/assets/scene1/voyager/voyager-38.jpg",
    // "/assets/scene1/voyager/voyager-39.jpg",
    // "/assets/scene1/voyager/voyager-40.jpg",
    // "/assets/scene1/voyager/voyager-41.jpg",
    // "/assets/scene1/voyager/voyager-42.jpg",
    // "/assets/scene1/voyager/voyager-43.jpg",
    // "/assets/scene1/voyager/voyager-44.jpg",
    // "/assets/scene1/voyager/voyager-45.jpg",
    // "/assets/scene1/voyager/voyager-46.jpg",
    // "/assets/scene1/voyager/voyager-47.jpg",
    // "/assets/scene1/voyager/voyager-49.jpg",
    // "/assets/scene1/voyager/voyager-50.jpg",
    // "/assets/scene1/voyager/voyager-51.jpg",
    // "/assets/scene1/voyager/voyager-52.jpg",
    // "/assets/scene1/voyager/voyager-53.jpg",
    // "/assets/scene1/voyager/voyager-54.jpg",
    // "/assets/scene1/voyager/voyager-55.jpg",
    // "/assets/scene1/voyager/voyager-56.jpg",
    // "/assets/scene1/voyager/voyager-57.jpg",
    // "/assets/scene1/voyager/voyager-58.jpg",
    // "/assets/scene1/voyager/voyager-59.jpg",
    // "/assets/scene1/voyager/voyager-60.jpg",
    // "/assets/scene1/voyager/voyager-61.jpg",
    // "/assets/scene1/voyager/voyager-62.jpg",
    // "/assets/scene1/voyager/voyager-63.jpg",
    // "/assets/scene1/voyager/voyager-64.jpg",
    // "/assets/scene1/voyager/voyager-65.jpg",
    "/assets/scene1/voyager/voyager-66.jpg",
    "/assets/scene1/voyager/voyager-67.jpg",
    "/assets/scene1/voyager/voyager-68.jpg",
    "/assets/scene1/voyager/voyager-69.jpg",
  ]);

  useEffect(() => {
    props.setInstance(images.current);
  }, [images]);

  return (
    <mesh ref={images} {...props} visible={false}>
      <meshBasicMaterial
        map={imagesArray[props.currImage]}
        alphaMap={mask}
        transparent
        needsUpdate
      />
    </mesh>
  );
};

const Kiwi = (props: any) => {
  const { gl, camera, scene } = useThree();
  const { isSoundEnabled } = useGlobalContext();
  const kiwi: any = useRef(null);
  const lightContainer: any = useRef(null);
  const [light, set] = useState<any>();
  // const light: any = useRef()
  const composer: any = useRef();
  const [hovered, setHovered] = useState(false);

  const [kiwiMap, kiwiAlpha, kiwiAlt] = useTexture([
    "/assets/scene1/Kiwi_dark.png",
    "/assets/scene1/Kiwi_alpha.jpg",
    "/assets/scene1/Kiwi_exp_1.png",
  ]);

  useEffect(() => {
    props.setInstance([kiwi.current, lightContainer.current.children[0]]);
  }, [lightContainer, kiwi]);

  useEffect(() => {
    if (isSoundEnabled && hovered && props.isKiwiHoverable) {
      const audio = document.querySelector("#audio-kiwi") as HTMLAudioElement;
      audio.currentTime = 0;
      audio.play();
    }
  }, [isSoundEnabled, hovered, props.isKiwiHoverable]);

  useFrame(() => {
    composer.current && composer.current.render();
  });

  return (
    <group ref={kiwi}>
      <mesh {...props}>
        <meshStandardMaterial
          map={kiwiMap}
          alphaMap={kiwiAlpha}
          alphaTest={0.5}
          needsUpdate
        />
      </mesh>
      <mesh {...props}>
        <meshStandardMaterial
          map={kiwiAlt}
          alphaMap={kiwiAlpha}
          alphaTest={0.5}
          visible={hovered ? true : false}
          needsUpdate
        />
      </mesh>
      <group ref={lightContainer}>
        <mesh ref={set} position={[-0.005, 0.575, -0.5]} scale={0.585}>
          <circleGeometry args={[0.2, 24]} />
          <meshBasicMaterial color="#b97264" />
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
      <Suspense fallback={null}>
        {light && (
          <EffectComposer multisampling={0}>
            <GodRays
              sun={light}
              samples={128}
              density={1}
              decay={0.98}
              weight={0.5}
              exposure={0.75}
              clampMax={1}
            />
          </EffectComposer>
        )}
      </Suspense>
    </group>
  );
};

const Planet = (props: any) => {
  const planet: any = useRef();
  // mesh
  const q2Geometry = useMemo(() => {
    return new PlaneGeometry(1, 1);
  }, []);
  // texture base
  const [planetMap, planetAlpha] = useTexture(["/assets/scene1/planet.png"]);

  useEffect(() => {
    props.setInstance(planet.current);
  }, [planet]);

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
  );
};

const Lights = (props: any) => {
  const ambientLight: any = useRef();
  const pointLight: any = useRef();

  useEffect(() => {
    props.setInstance([ambientLight.current, pointLight.current]);
  }, [ambientLight, pointLight]);

  return (
    <>
      <pointLight intensity={0} position={[0, 2.3, 0.3]} ref={pointLight} />
      <ambientLight intensity={0.01} ref={ambientLight} />
    </>
  );
};

const Voyager = (props: any) => {
  const voyager: any = useRef();

  const [voyagerMap, voyagerAlpha] = useTexture([
    "/assets/scene1/Voyager.png",
    "/assets/scene1/Voyager_alpha.jpg",
  ]);

  useEffect(() => {
    props.setInstance(voyager.current);
  }, [voyager]);

  return (
    <mesh scale={2.25} position={[2.35, 0.1, 0.2]} ref={voyager}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        map={voyagerMap}
        alphaMap={voyagerAlpha}
        alphaTest={0.5}
        side={DoubleSide}
      />
    </mesh>
  );
};
