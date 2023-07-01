import { PageLayout } from "@/layout/pageLayout";
import { UI } from "@/components/scene1/ui";
import ThreeJSLoading from "@/components/threeJSLoading";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import VideoScreen from "@/components/videoScreen";
import { useGlobalContext } from "@/provider/globalProvider";
import { useRouter } from "next/router";
import { useUIContext } from "@/provider/uiProvider";

const Mint = () => {
  const router = useRouter();

  const { soundsArray } = useGlobalContext();
  const [state, setState] = useState(false);

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

    // Disable for testing
    if (waitFunc.current) {
      // Wait for a certain number of block confirmations
      waitFunc.current(2).then(() => {
        fadeOut();
        hideDrag();

        // setTxnHash("")
        // setHudText("")
      });
    } else router.push("/");

    // soundsArray[1].play()
    showDrag();

    gsap.to("body", {
      autoAlpha: 1,
      duration: 1.5,
      ease: "expo",
    });

    gsap.set(".ui-space", { display: "block" });
    // gsap.set('.ui-space #sound-button', { display: 'block', autoAlpha: 1 })
  }, [soundsArray]);

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
      pageDesc="Cillum pariatur in Lorem consequat velit reprehenderit enim proident."
    >
      <UI visible />

      {state ? <></> : <ThreeJSLoading />}
      {state ? <VideoScreen /> : <></>}
    </PageLayout>
  );
};

export default Mint;
