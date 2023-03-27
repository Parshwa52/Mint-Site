/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function ScreenOne() {
  const sunbeamRef = useRef<HTMLImageElement>(null);
  const voyagerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sunbeam = sunbeamRef.current;
    const voyager = voyagerRef.current;

    if (!sunbeam && !voyager) return;

    const sunbeamTimeline = gsap.timeline({
      scrollTrigger: {
        start: "top top",
        end: "center 500vh",
        scrub: true,
      },
    });

    sunbeamTimeline.to(sunbeam, {
      duration: 0.2,
      height: "50%",
      top: "45%",
      ease: "power1.inOut",
    });

    const voyagerTimeline = gsap.timeline({
      paused: true,
      scrollTrigger: {
        start: "top top",
        scrub: true,
        onUpdate: ({ progress }: { progress: number }) => {
          if (!sunbeam || !voyager) return;
          const sunbeamRight = sunbeam.getBoundingClientRect().right;
          const voyagerLeft = voyager.getBoundingClientRect().left;

          if (voyagerLeft <= sunbeamRight) {
            console.log("Collide");
          }
        },
      },
    });

    voyagerTimeline.from(voyager, {
      duration: 0.1,
      x: "400%",
      y: "-190%",
    });

    voyagerTimeline.to(voyager, {
      duration: 0.1,
      x: "0%",
      y: "10%",
      ease: "power1.inOut",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div style={{ height: "1000vh" }}>
        <img
          ref={sunbeamRef}
          className="w-auto mt-[40px] h-[120%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden mt-[160px] fixed"
          src="/assets/sunbeam.png"
          alt=""
        />
      </div>

      <div>
        <img
          ref={voyagerRef}
          className="w-auto h-[300px] top-1/2 right-1/2 overflow-hidden fixed"
          src="/assets/disc.svg"
          alt=""
        />
      </div>
    </div>
  );
}

export default ScreenOne;
