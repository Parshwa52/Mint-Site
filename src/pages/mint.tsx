import { PageLayout } from "@/layout/pageLayout";
import { UI } from "@/components/scene1/ui";
import ThreeJSLoading from "@/components/threeJSLoading";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import VideoScreen from "@/components/videoScreen";
import { useGlobalContext } from "@/provider/globalProvider";
import { useRouter } from "next/router";
import { useUIContext } from "@/provider/uiProvider";
import { getAudio } from "@/components/audioManager";

const Mint = () => {
  const router = useRouter();

  const { soundsArray } = useGlobalContext();

  const [state0, setState0] = useState(false);
  const [state, setState] = useState(false);

  const bridgeVideo = useRef(null as HTMLVideoElement | null);

  const { waitFunc, setTxnHash, setHudText } = useUIContext();

  useEffect(() => {
    // if (!soundsArray[1]) {
    //   router.push('/')
    //   return
    // }

    // setTimeout(() => {
    //   fadeOut()
    //   hideDrag()
    // }, 10000)
    
    // For Testing
    fadeOut()
    hideDrag()

    // gsap.to(".bridging-video-container", {
    //   opacity: 1,
    //   duration: 1,
    //   onComplete() {
    //     if (bridgeVideo.current) {
    //       // bridgeVideo.current.oncanplay = function () {
    //       bridgeVideo.current?.play();

    //       const bridgingAudio = getAudio("audio-bridging");
    //       bridgingAudio.volume = 1;
    //       bridgingAudio.play();
    //       // };
    //     }
    //   },
    // });

    // soundsArray[1].play()

    // gsap.set('.ui-space #sound-button', { display: 'block', autoAlpha: 1 })
  }, [soundsArray]);

  function toGalaxy() {
    gsap.to(".bridging-video-container", {
      opacity: 0,
      duration: 1.5,
      ease: "expo",
      onComplete() {
        setState0(false);

        showDrag();

        gsap.to("body", {
          autoAlpha: 1,
          duration: 1.5,
          ease: "expo",
        });

        gsap.set(".ui-space", { display: "block" });

        // Show for at least a few seconds
        setTimeout(() => {
          if (waitFunc.current) {
            // Wait for a certain number of block confirmations
            waitFunc.current(1).then(() => {
              fadeOut();
              hideDrag();
            });
          } else router.push("/");
        }, 2000);
      },
    });
  }

  function fadeOut() {
    gsap.to(".backround", {
      autoAlpha: 0,
      ease: "expo.inOut",
      duration: 1.5,
      onComplete: () => {
        // gsap.set('.background', { display: 'none' })
        setState(true);
        gsap.fromTo(
          ".video",
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            ease: "expo.inOut",
            duration: 1.5,
          }
        );
      },
    });
  }

  function showDrag() {
    gsap
      .timeline()
      .set(".mouse-drag-text", {
        display: "block",
      })
      .to(".mouse-drag-text", {
        autoAlpha: 1,
        ease: "expo",
      });
  }

  function hideDrag() {
    gsap
      .timeline()
      .to(".mouse-drag-text", {
        autoAlpha: 0,
        ease: "expo",
      })
      .set(".mouse-drag-text", {
        display: "none",
      });
  }

  return (
    <PageLayout
      pageTitle="Pluto mint - Minted"
      pageDesc="Pluto Misfits Minted Page"
    >
      <UI visible />

      {state0 ? (
        <div className="bridging-video-container opacity-0">
          <video
            ref={bridgeVideo}
            style={{
              width: "100vw",
              height: "100vh",
            }}
            onEnded={() => toGalaxy()}
            preload="true"
            muted
          >
            <source src="/assets/media/Bridge.mp4" type="video/mp4" />
          </video>
          <audio
            id="audio-bridging"
            muted
            style={{
              display: "none",
            }}
          >
            <source src="/assets/sounds/Bridging.mp3" type="audio/mp3" />
          </audio>
        </div>
      ) : (
        <>
          {state ? <></> : <ThreeJSLoading />}
          {state ? <VideoScreen /> : <></>}
        </>
      )}
    </PageLayout>
  );
};

export default Mint;
