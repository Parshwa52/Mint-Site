import { useEffect } from "react";
import { gsap } from "gsap";
import { useGlobalContext } from "@/provider/globalProvider";

export const LoadingMouse = () => {
  useEffect(() => {
    const ball = document.querySelector("#mouse-loading") as HTMLDivElement;

    const ctx = gsap.context(() => {
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        ball.style.display = "none";
      } else {
        gsap.set(ball, { xPercent: 6, yPercent: 7 });
        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const mouse = { x: pos.x, y: pos.y };
        const speed = 0.2;
        let isActive = false;

        const xSet = gsap.quickSetter(ball, "x", "px");
        const ySet = gsap.quickSetter(ball, "y", "px");

        window.addEventListener("mousemove", (e) => {
          mouse.x = e.x;
          mouse.y = e.y;
        });

        const handleClick = () => {
          gsap.timeline().fromTo(
            "#sound-button",
            { scale: 0 },
            {
              scale: 1,
              ease: "back.inOut",
            }
          );
          gsap.to(ball, {
            scale: 0,
            duration: 1.25,
            ease: "back.inOut",
            onComplete: () => {
              isActive = false;
            },
          });

          window.removeEventListener("click", handleClick);
        };

        window.addEventListener("click", handleClick);

        gsap.ticker.add(() => {
          // adjust speed for higher refresh monitors
          if (!isActive) {
            const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
            pos.x += (mouse.x - pos.x) * dt;
            pos.y += (mouse.y - pos.y) * dt;
            xSet(pos.x);
            ySet(pos.y);
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="mouse-loading">
      <p className="flex flex-col text-center">
        <span>Drag and hold </span>
        <span>Zoom in out</span>
      </p>
    </div>
  );
};
