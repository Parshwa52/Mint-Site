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
import { useAccount, useChainId } from "wagmi";
import { primaryChainId, rpc_primary, secondaryChainId } from "@/constants";
import { fadeInAudio, fadeOutAudio } from "@/utils/audio";
import { ethers } from "ethers";
import MinterABI from "@/json/PlutoMinter.json";
import { formatEther } from "ethers/lib/utils.js";

const Mint = () => {
  const router = useRouter();

  const { soundsArray } = useGlobalContext();

  const [state0, setState0] = useState(true);
  const [state, setState] = useState(false);
  const [tokenId, setTokenId] = useState("");

  const bridgeVideo = useRef(null as HTMLVideoElement | null);

  const { waitFunc } = useUIContext();

  const chainId = useChainId();
  const { isConnected } = useAccount();

  useEffect(() => {
    console.log({ chainId, isConnected });
    if (isConnected && chainId === secondaryChainId) {
      gsap.to("body", {
        autoAlpha: 1,
        duration: 1.5,
        ease: "expo",
        onComplete() {
          gsap.to(".bridging-video-container", {
            autoAlpha: 1,
            duration: 1,
            onComplete() {
              if (bridgeVideo.current) {
                if (bridgeVideo.current.readyState === 4) {
                  playBridgeVideoAndAudio();
                  console.log("Play video state", bridgeVideo.current);
                } else {
                  console.log("Play video after event, state");
                  bridgeVideo.current.oncanplay = playBridgeVideoAndAudio;
                }
              }
            },
          });
        },
      });
    } else {
      gsap.to("body", {
        autoAlpha: 1,
        duration: 1.5,
        ease: "expo",
        onComplete() {
          toGalaxy();
        },
      });
    }

    // soundsArray[1].play()

    // gsap.set('.ui-space #sound-button', { display: 'block', autoAlpha: 1 })
  }, [soundsArray]);

  function playBridgeVideoAndAudio() {
    if (!bridgeVideo.current) {
      console.warn("No bridge video...");
      return;
    }
    bridgeVideo.current.play();

    const bridgingAudio = getAudio("audio-bridging");
    if (bridgingAudio) fadeInAudio(bridgingAudio);
  }

  function toGalaxy() {
    const bridgingAudio = getAudio("audio-bridging");
    if (bridgingAudio) fadeOutAudio(bridgingAudio);

    const galaxyAudio = getAudio("galaxy-audio");
    if (galaxyAudio) fadeInAudio(galaxyAudio);

    gsap.to(".bridging-video-container", {
      autoAlpha: 0,
      duration: 1.5,
      ease: "expo",
      onComplete() {
        setState0(false);

        showDrag();

        gsap.set(".ui-space", { display: "block" });

        // TESTING
        // fadeOut();
        // hideDrag();

        // Show galaxy for at least a few seconds
        setTimeout(() => {
          if (waitFunc.current) {
            // Wait for a certain number of block confirmations
            waitFunc.current(1).then((receipt) => {
              fetchTokenId(receipt);

              const galaxyAudio = getAudio("galaxy-audio")!;

              // Fade out audio
              if (galaxyAudio) fadeOutAudio(galaxyAudio);

              fadeOut();
              hideDrag();
            });
          } else router.push("/");
        }, 5000);
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

  function fetchTokenId(receipt: any) {
    if (chainId === secondaryChainId) {
      setTokenId("XXXX");
    } else if (chainId === primaryChainId) {
      const iface = new ethers.utils.Interface(MinterABI);
      const event = iface.parseLog(receipt.logs[1]);

      const id = formatEther(event.args.tokenId);
      console.log({ tokenId: id });
      setTokenId(id);
    }
  }

  return (
    <PageLayout
      pageTitle="Pluto mint - Minted"
      pageDesc="Pluto Misfits Minted Page"
    >
      <UI visible />

      <audio
        id="galaxy-audio"
        muted
        loop
        style={{
          display: "none",
        }}
      >
        <source src="/assets/sounds/Loop_Space_Drone.mp3" type="audio/mp3" />
      </audio>

      {state0 ? (
        <div className="bridging-video-container opacity-0 invisible">
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
          {state ? <VideoScreen tokenId={tokenId} /> : <></>}
        </>
      )}
    </PageLayout>
  );
};

export default Mint;
