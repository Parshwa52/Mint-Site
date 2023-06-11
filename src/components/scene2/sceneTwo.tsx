// React
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
// gsap
import gsap from "gsap";
// Rainbow & Wagmi
import ConnectWallet from "../ui/ConnectWallet";
import { useAccount, useChainId, useSigner, useSwitchNetwork } from "wagmi";
// THREE
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  RenderTexture,
  useTexture,
  Html,
} from "@react-three/drei";
import { PlaneGeometry } from "three";
// Custom components
import { useGlobalContext } from "@/provider/globalProvider";
// Images imports
import img0 from "@/assets/placements/0_Clouds.png";
import img4 from "@/assets/placements/4_Base.png";
import img4extra from "@/assets/placements/4_Base_blurred.png";
import img10 from "@/assets/placements/13_Octopus_leftmost_Building.png";
import img11 from "@/assets/placements/14_Octopus_rightmost_Building.png";
import img12 from "@/assets/placements/11_Octopus_left_Building.png";
import img13 from "@/assets/placements/12_Octopus_right_Building.png";
import img14 from "@/assets/placements/10_Octopus_Building.png";
import img15 from "@/assets/placements/15_Triangular_Building.png";
import img16 from "@/assets/placements/16_Ground_Bridge_Lab_Building.png";
import img17 from "@/assets/placements/17_Studio_Building.png";
import img18 from "@/assets/placements/18_Mushroom_Building.png";
import img19 from "@/assets/placements/19_Whale_Building.png";
import img20 from "@/assets/placements/20_Crayon_Building.png";
import img21 from "@/assets/placements/21_Tall_Building.png";
import img22 from "@/assets/placements/22_Frog_Building.png";
import img23 from "@/assets/placements/23_White_Building.png";
import img24 from "@/assets/placements/24_FLO_Building.png";
import img25 from "@/assets/placements/25_POP_Building.png";
import img26 from "@/assets/placements/26_Characters.png";
import img27 from "@/assets/placements/27_Green_Structure.png";
import img28 from "@/assets/placements/28_Cars_smokes_lines.png";
import img29 from "@/assets/placements/29_Clouds_right.png";
import img30 from "@/assets/placements/29_Clouds_left.png";
import { useRouter } from "next/router";
import { Signer } from "ethers";
import {
  approveWETHForNFT,
  bridgeFromETHToPolygon,
  getBalances,
} from "@/utils/socketBridge";
import { INSUFFICIENT_FUNDS_DATA, mintAmount, targetAmount } from "@/constants";
import { useUIContext } from "@/provider/uiProvider";
import { hideCustomText, showCustomText } from "@/utils";
import { mint } from "@/utils/mint";

export const SceneTwo = () => {
  const { isConnected } = useAccount();
  const { scrollLenis, soundsArray, isSoundEnabled } = useGlobalContext();
  const scene2 = useRef<HTMLDivElement>(null);
  const entryTl = useRef<any>();
  const failureTl = useRef<any>();
  const successTl = useRef<any>();
  const transactTl = useRef<any>();
  const [q2, setQ2] = useState<any>(null);
  const [currExpression, setCurrExpression] = useState(0);
  const [isEntered, setEntered] = useState(false);
  const [isTimeline, setTimeline] = useState(false);
  const updater = {
    entryExp: 0,
    failureExp: 0,
    successExp: 0,
    transactionExp: 0,
  };
  const [whitelisted, setWhitelisted] = useState(false);

  // scene building
  // let timer: any
  // const handleScroll = (e: WheelEvent) => {
  //   if (timer !== null) {
  //     clearTimeout(timer)
  //     setScrolling(true)
  //   }
  //   timer = setTimeout(function () {
  //     setScrolling(false)
  //   }, 500)
  // }

  // useEffect(() => {
  //   window.addEventListener("wheel", (e) => handleScroll(e));
  // }, []);

  useEffect(() => {
    if (isConnected) {
      // console.log("isConnected", isConnected);
      checkWhitelistStatus();
    }
  }, [isConnected]);

  async function checkWhitelistStatus() {
    // TODO: When contract is deployed
    setWhitelisted(true);
    return true;
  }

  useEffect(() => {
    if (isEntered && isSoundEnabled) {
      switch (currExpression) {
        case 1:
        case 30:
          document.querySelector<HTMLAudioElement>("#audio-blink")?.play();
          break;
        case 2:
          document.querySelector<HTMLAudioElement>("#audio-wallet-1")?.play();
          break;
        case 3:
          document.querySelector<HTMLAudioElement>("#audio-wallet-2")?.play();
          break;
        case 4:
          document.querySelector<HTMLAudioElement>("#audio-wallet-3")?.play();
          break;
        case 11:
          document.querySelector<HTMLAudioElement>("#audio-pokemon")?.play();
          break;
        case 17:
          document.querySelector<HTMLAudioElement>("#audio-battery")?.play();
          break;
        case 28:
          document.querySelector<HTMLAudioElement>("#audio-kidding")?.play();
          break;
        default:
          break;
      }
    }
  }, [currExpression, isEntered, isSoundEnabled]);

  // useEffect(() => {
  // const audioStop = document.querySelector(
  //   "#audio-building-stopped"
  // ) as HTMLAudioElement;
  // const audioBuilding = document.querySelector(
  //   "#audio-building"
  // ) as HTMLAudioElement;
  // if (isSoundEnabled && isTimeline) {
  //   if (isScrolling === true) {
  //     audioBuilding.play();
  //     audioStop.pause();
  //   } else if (isScrolling === false) {
  //     audioBuilding.pause();
  //     audioStop.currentTime = 0;
  //     audioStop.play();
  //   }
  // } else {
  //   audioStop.pause();
  //   audioBuilding.pause();
  // }
  // }, [isScrolling, isSoundEnabled, isTimeline])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // clouds animation
      gsap.fromTo(
        ".clouds",
        {
          xPercent: -100,
        },
        {
          xPercent: 100,
          duration: 30,
          repeat: -1,
          ease: "none",
        }
      );
      // pin section 1 - fade out
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#home-city",
            start: "top bottom",
            end: "top top",
            scrub: true,
            refreshPriority: 98,
          },
          defaults: {
            ease: "none",
          },
        })
        .to(
          "#ui .ui-space",
          { autoAlpha: 0, duration: 25, ease: "power1.inOut" },
          0
        )
        .to(
          ".scene-bg canvas",
          {
            autoAlpha: 0,
            duration: 100,
          },
          0
        )
        .to(
          ["#audio-0", "#audio-1"],
          {
            volume: 0,
            duration: 50,
          },
          0
        )
        .fromTo(
          ".scene-bg",
          {
            background:
              "linear-gradient(rgba(0, 0, 0,1) 0%, rgba(0, 0, 0,1) 25%, rgba(0, 0, 0,1) 50%, rgba(0, 0, 0,1) 75%, rgba(0, 0, 0,1) 100%))",
          },
          {
            duration: 75,
            background:
              "linear-gradient(rgba(27, 41, 71) 0%, rgba(42, 66, 95) 25%, rgba(66, 106, 133, 1) 50%, rgba(90, 145, 171,1) 75%, rgba(114, 184, 209,1) 100%)",
          },
          0
        )
        .to(".canvas-scroll", { autoAlpha: 0 }, 0)
        .set("#ui .ui-space", { display: "none" }, 25)
        .set("#ui .ui-world", { display: "block" }, 25)
        .to("#ui", { "--color": "black", duration: 25, ease: "none" }, 25)
        .to(
          ".scene-bg",
          {
            duration: 25,
            background:
              "linear-gradient(rgba(42, 66, 95) 0%, rgba(66, 106, 133, 1) 25%, rgba(90, 145, 171,1) 50%, rgba(114, 184, 209,1) 75%, rgba(173,232,244,1) 100%)",
          },
          25
        )
        .from(
          "#ui .ui-world",
          { autoAlpha: 0, duration: 25, ease: "power1.inOut" },
          50
        )
        .to(
          ".scene-bg",
          {
            duration: 25,
            background:
              "linear-gradient(rgba(90, 145, 171,1) 0%, rgba(114, 184, 209,1) 25%, rgba(126, 204, 228,1) 50%, rgba(137, 223, 247,1) 75%, rgba(137, 223, 247,1) 100%)",
          },
          50
        )
        .to(
          ".scene-bg",
          {
            duration: 25,
            background:
              "linear-gradient(rgba(137, 223, 247,1) 0%, rgba(137, 223, 247,1) 25%, rgba(137, 223, 247,1) 50%, rgba(137, 223, 247,1) 75%, rgba(137, 223, 247,1) 100%)",
          },
          75
        )
        .fromTo("#audio-2", { volume: 0 }, { volume: 0.25, duration: 50 }, 50);

      // pin section 2 - fade in
      if (q2) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#home-city",
              start: "top top",
              end: "+=4000",
              onEnter: () => {
                setTimeline(true);
              },
              onEnterBack: () => {
                setTimeline(true);
                setEntered(false);
              },
              onLeave: () => {
                setTimeline(false);
                setEntered(true);
              },
              onLeaveBack: () => {
                setTimeline(false);
                setEntered(false);
              },
              pin: true,
              scrub: true,
            },
            defaults: {
              duration: 25,
              stagger: {
                amount: 15,
              },
              ease: "power1",
            },
          })
          .from(
            q2.position,
            {
              y: -8,
              duration: 100,
              ease: "power1",
            },
            0
          )
          .to(
            "#mouse .border-bottom .border-background",
            {
              scaleX: 1,
              ease: "none",
              duration: 100,
            },
            0
          )
          .from(
            ".clouds > *",
            {
              autoAlpha: 0,
              scale: 1.25,
            },
            0
          )
          .from(
            ".background > *:first-child",
            {
              yPercent: 100,
              stagger: 0,
              autoAlpha: 0,
              scale: 1.25,
            },
            7.5
          )
          .from(
            ".city-container .buildings-center > *",
            {
              yPercent: 100,
              stagger: 10,
              scale: 1.25,
            },
            20
          )
          .from(
            ".background > *:last-child",
            {
              autoAlpha: 0,
            },
            27.5
          )
          .from(
            ".city-container .buildings-center-left > *",
            {
              xPercent: -100,
              stagger: -10,
              scale: 1.25,
            },
            30
          )
          .from(
            ".city-container .buildings-center-right > *",
            {
              xPercent: 100,
              stagger: -10,
              scale: 1.25,
            },
            30
          )
          .addLabel("buildingsCenterDone", ">-15")
          .from(
            ".city-container .buildings-left > *",
            {
              xPercent: -100,
              stagger: 10,
              scale: 1.7,
            },
            "buildingsCenterDone-=5"
          )
          .from(
            ".city-container .buildings-right > *",
            {
              xPercent: 100,
              stagger: 7.5,
              scale: 1.7,
            },
            "buildingsCenterDone-=5"
          )
          .from(
            ".city-container .buildings-logo > *",
            {
              autoAlpha: 0,
              yPercent: -100,
              duration: 30,
              ease: "expo",
            },
            "buildingsCenterDone+=10"
          )
          .from(
            ".city-container .buildings-hover-left > *",
            {
              xPercent: -100,
              duration: 50,
            },
            "buildingsCenterDone+=30"
          )
          .from(
            ".city-container .buildings-hover-right > *",
            {
              xPercent: 100,
              duration: 50,
            },
            "buildingsCenterDone+=30"
          )
          .addLabel("buildingsDone", "buildingsCenterDone+=80")
          .to(
            ".city-container .buildings-logo > *",
            {
              yPercent: -100,
              autoAlpha: 0,
              duration: 45,
              ease: "power1.inOut",
            },
            "buildingsDone"
          )
          .to(
            ".city-container",
            {
              willChange: "filter",
              filter: "blur(2px)",
              stagger: 0,
              duration: 25,
              ease: "none",
            },
            ">-25%"
          );
      }
    });

    if (whitelisted) doSuccessAnimation();
    else doEntryAnimation();

    return () => ctx.revert();
  }, [scrollLenis, soundsArray, q2]);

  useEffect(() => {
    if (!entryTl.current) {
      entryTl.current = gsap
        .timeline({
          paused: true,
          repeat: -1,
          repeatDelay: 1,
          defaults: {
            duration: 3,
            ease: "none",
          },
        })
        .fromTo(
          updater,
          {
            entryExp: 0,
          },
          {
            entryExp: 1,
            duration: 1.25,
            repeat: 1,
            onUpdate: () => {
              setCurrExpression(Math.round(updater.entryExp));
            },
          }
        )
        .to(updater, {
          entryExp: 4,
          onUpdate: () => {
            setCurrExpression(Math.round(updater.entryExp));
          },
        });
    }
    if (!successTl.current) {
      successTl.current = gsap
        .timeline({
          paused: true,
          defaults: { duration: 2.5, ease: "none" },
        })
        .call(
          () => {
            setCurrExpression(28);
          },
          undefined,
          0
        )
        .fromTo(
          updater,
          {
            successExp: 29,
          },
          {
            successExp: 30,
            repeat: -1,
            onUpdate: () => {
              setCurrExpression(Math.round(updater.successExp));
            },
          },
          2.5
        );
    }
    if (!failureTl.current && successTl.current) {
      failureTl.current = gsap
        .timeline({
          paused: true,
          defaults: {
            duration: 10,
            ease: "none",
          },
          onComplete: () => {
            successTl.current.play();
          },
        })
        .fromTo(
          updater,
          {
            failureExp: 5,
          },
          {
            failureExp: 20,
            onUpdate: () => {
              setCurrExpression(Math.round(updater.failureExp));
            },
          }
        )
        .addLabel("failureEnd")
        .to(updater, {
          duration: 0.1,
        });
    }
    if (!transactTl.current) {
      transactTl.current = gsap
        .timeline({
          repeat: -1,
          paused: true,
          defaults: {
            duration: 3.5,
            ease: "none",
          },
        })
        .fromTo(
          updater,
          {
            transactionExp: 21,
          },
          {
            transactionExp: 27,
            onUpdate: () => {
              setCurrExpression(Math.round(updater.transactionExp));
            },
          }
        );
    }
  }, [entryTl, failureTl, successTl, transactTl, isSoundEnabled]);

  function doEntryAnimation() {
    successTl.current && successTl.current?.restart().pause();
    transactTl.current && transactTl.current?.restart().pause();
    failureTl.current && failureTl.current?.restart().pause();
    if (entryTl.current && !entryTl.current.isActive()) {
      entryTl.current.play();
    }
  }

  function doSuccessAnimation() {
    entryTl.current && entryTl.current?.restart().pause();
    transactTl.current && transactTl.current?.restart().pause();
    failureTl.current && failureTl.current?.restart().pause();
    if (successTl.current && !successTl.current.isActive()) {
      doFailureAnimation(true);
    }
  }

  function doBridgeFailure() {
    // stop everything
    successTl.current && successTl.current?.restart().pause();
    entryTl.current && entryTl.current?.restart().pause();
    transactTl.current && transactTl.current?.restart().pause();
    failureTl.current && failureTl.current?.restart().pause();

    setCurrExpression(31);
  }

  function doEthFailure() {
    // stop everything
    successTl.current && successTl.current?.restart().pause();
    entryTl.current && entryTl.current?.restart().pause();
    transactTl.current && transactTl.current?.restart().pause();
    failureTl.current && failureTl.current?.restart().pause();

    setCurrExpression(32);
  }

  function doTransactionAnimation() {
    successTl.current && successTl.current?.restart().pause();
    entryTl.current && entryTl.current?.restart().pause();
    failureTl.current && failureTl.current?.restart().pause();
    if (transactTl.current && !transactTl.current.isActive()) {
      transactTl.current.play();
    }
  }

  function doFailureAnimation(isSuccess: boolean) {
    successTl.current && successTl.current?.restart().pause();
    transactTl.current && transactTl.current?.restart().pause();
    entryTl.current && entryTl.current?.restart().pause();
    if (failureTl.current) {
      if (isSuccess) failureTl.current.restart().play();
      else failureTl.current.restart().tweenTo("failureEnd");
    }
  }

  return (
    <div className="scene scene-2" ref={scene2}>
      <div className="city-container">
        <div className="clouds">
          <Clouds src={img0} />
          {/* <Clouds src={img1} />
          <Clouds src={img5} /> */}
          {/* <Clouds src={img7} /> */}
          {/* <Clouds src={img2} />
          <Clouds src={img6} />
          <Clouds src={img3} /> */}
          {/* <Clouds src={img8} /> */}
          {/* <Clouds src={img9} /> */}
        </div>
        <div className="background">
          <Building src={img4} />
          <Building src={img4extra} />
        </div>
        <div className="buildings buildings-center-right">
          <Building src={img11} />
          <Building src={img13} />
        </div>
        <div className="buildings buildings-center-left">
          <Building src={img10} />
          <Building src={img12} />
        </div>
        <div className="buildings buildings-left">
          <Building src={img15} />
        </div>
        <div className="buildings buildings-right">
          <Building src={img21} />
        </div>
        <div className="buildings buildings-center">
          <Building src={img14} />
        </div>
        <div className="buildings buildings-center">
          <Building src={img16} />
        </div>
        <div className="buildings buildings-left">
          <Building src={img18} />
          <Building src={img23} />
          <Building src={img25} />
        </div>
        <div className="buildings buildings-right">
          <Building src={img17} />
          <Building src={img19} />
          <Building src={img20} />
          <Building src={img22} />
          <Building src={img24} />
          <Building src={img26} />
          <Building src={img27} />
        </div>
        <div className="buildings buildings-center">
          <Building src={img28} />
        </div>
        <div className="buildings buildings-hover-left">
          <Building src={img30} />
        </div>
        <div className="buildings buildings-hover-right">
          <Building src={img29} />
        </div>
        <div className="buildings buildings-logo">
          <h2>pluto</h2>
        </div>
      </div>
      <div className="q2-canvas-container">
        <div className="canvas-button-container">
          <ConnectWallet />
        </div>
        <Canvas
          dpr={[1, 1.25]}
          gl={{
            antialias: false,
          }}
        >
          <Q2
            setInstance={setQ2}
            currExp={currExpression}
            animations={{
              doSuccessAnimation,
              doFailureAnimation,
              doEthFailure,
              doBridgeFailure,
              doTransactionAnimation,
            }}
            whitelisted={whitelisted}
          />
        </Canvas>
      </div>
      {/* <div className='buttons-container'>
        <button onClick={() => doSuccessAnimation()}>do Success</button>
        <button onClick={() => doTransactionAnimation()}>
          Transaction animation
        </button>
        <button onClick={() => doFailureAnimation(false)}>
          Failure animation
        </button>
        <button onClick={() => doEntryAnimation()}>Reset animation</button>
      </div> */}
    </div>
  );
};

const Clouds = ({ src }: { src: any }) => {
  return (
    <Image
      src={src}
      alt="clouds"
      className="building-container clouds-container"
      fill
      unoptimized
      style={{
        objectFit: "contain",
        objectPosition: "center top",
      }}
      // sizes='(max-width: 768px) 40vw,
      //         (max-width: 1200px) 50vw,
      //         60vw'
    />
  );
};

const Building = ({ src }: { src: any }) => {
  return (
    <Image
      src={src}
      alt="building"
      className="building-container"
      fill
      unoptimized
      style={{
        objectFit: "cover",
      }}
      // sizes='(max-width: 768px) 45vw,
      //         (max-width: 1200px) 65vw,
      //         75vw'
    />
  );
};

const Q2 = (props: any) => {
  const router = useRouter();
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
    "/assets/scene1/Q2.png",
    "/assets/scene1/Q2_alpha.jpg",
    "/assets/scene1/Q2_band.png",
  ]);

  // Wallet Connection Variables
  const { isConnected } = useAccount();
  const signer = useSigner();
  const switchNetwork = useSwitchNetwork();
  const chainId = useChainId();

  // UI Context
  const { setTxnHash, setHudText } = useUIContext();

  useEffect(() => {
    props.setInstance(q2.current);
  }, [q2]);

  useEffect(() => {
    if (props.whitelisted === true) props.animations.doSuccessAnimation();
  }, [props.whitelisted]);

  async function handleClick() {
    if (isConnected) {
      // Check if whitelisted right after connecting

      if (props.whitelisted) {
        // Check Custom Mint Status and add HUD text accodingly
        await hideCustomText();
        // setHudText('You have 1 free and 2 paid mints left')
        // showCustomText()

        // Simulate bridge txn
        // props.animations.doTransactionAnimation()
        // await new Promise((resolve, _) => setTimeout(resolve, 5000))

        // Bridge and Mint Process (Which shall trigger Txn animation upon completion)
        bridgeAndMint();

        // Simulate Mint and then final page
        // setTimeout(() => {
        //   gsap.to('body', {
        //     autoAlpha: 0,
        //     duration: 1.25,
        //     onComplete: () => {
        //       router.push('/mint')
        //     },
        //   })
        // }, 1000)
      } else {
        // Failure animation
        props.animations.doFailureAnimation();

        // Set HUD text. TODO: Should happen after whielisting is checked on connection
        await hideCustomText();
        setHudText(
          "It looks like you couldn't make it to Pluto this time around. Please try next time!"
        );
        showCustomText();
      }
    } else {
      //@ts-ignore
      document
        .querySelector(".canvas-button-container button")
        //@ts-ignore
        .click();
    }

    document.body.style.cursor = "auto";

    // setTimeout(() => {
    //   gsap.to('body', {
    //     autoAlpha: 0,
    //     duration: 1.25,
    //     onComplete: () => {
    //       router.push('/mint')
    //     },
    //   })
    // }, 1000)
  }

  async function callMint() {
    console.log("Mint call reached");
    const result = await mint(signer.data as Signer);
    setTxnHash(result.hash);

    // Transition to loading screen now

    // After the mint has succeeded
    result.wait(1).then(() => {});
  }

  async function bridgeAndMint() {
    const { ethereumBalance, wethBalanceETH, wethBalancePolygon } =
      await getBalances(signer.data as Signer);

    try {
      //////////////////////////////////////
      // Case 1: User Has WETH on Polygon //
      //////////////////////////////////////
      if(true){
      // if (wethBalancePolygon.gte(mintAmount)) {
        // Make sure network is Polygon
        if (switchNetwork.switchNetwork) switchNetwork.switchNetwork(137);

        // @ts-ignore
        if (chainId !== 137) {
          console.warn("Switch to Polygon Chain");
          props.animations.doBridgeFailure(); // Switch to Polygon Animation
          return;
        }

        // Approve WETH on Polygon to NFT Contract
        await approveWETHForNFT(signer.data as Signer);

        // Mint
        await callMint();
      }

      ///////////////////////////////////////////////
      // Case 2: User has WETH on Ethereum Network //
      ///////////////////////////////////////////////
      else if (wethBalanceETH.gte(targetAmount)) {
        // Make sure network is Ethereum
        if (switchNetwork.switchNetwork) switchNetwork.switchNetwork(1);

        if (chainId !== 1) {
          console.warn("Switch to Ethereum Chain");
          props.animations.doEthFailure(); // Switch to Ethereum Animation
          return;
        }

        // Bridge WETH to Polygon
        const hash = await bridgeFromETHToPolygon(signer.data as Signer, false);
        setTxnHash(hash);

        // Switch to Polygon
        if (switchNetwork.switchNetwork) switchNetwork.switchNetwork(137);

        // @ts-ignore
        if (chainId !== 137) {
          console.warn("Switch to Polygon Chain");
          props.animations.doBridgeFailure(); // Switch to Polygon Animation
          return;
        }

        // Approve WETH on Polygon to NFT Contract
        await approveWETHForNFT(signer.data as Signer);

        // Mint
        await callMint();
      }

      //////////////////////////////////////////////
      // Case 3: User has ETH on Ethereum Network //
      //////////////////////////////////////////////
      else if (ethereumBalance.gte(targetAmount)) {
        // Make sure network is Ethereum
        if (switchNetwork.switchNetwork) switchNetwork.switchNetwork(1);

        if (chainId !== 1) {
          console.warn("Switch to Ethereum Chain");
          props.animations.doEthFailure(); // Switch to Ethereum Animation
          return;
        }

        // Bridge Native ETH to Polygon
        const hash = await bridgeFromETHToPolygon(signer.data as Signer, true);
        setTxnHash(hash);

        // Switch to Polygon
        if (switchNetwork.switchNetwork) switchNetwork.switchNetwork(137);

        // @ts-ignore
        if (chainId !== 137) {
          console.warn("Switch to Polygon Chain");
          props.animations.doBridgeFailure(); // Switch to Polygon Animation
          return;
        }

        // Approve WETH on Polygon to NFT Contract
        await approveWETHForNFT(signer.data as Signer);

        // Mint
        await callMint();
      }

      /////////////////////////////////////////
      // Case 4: User has insufficient funds //
      /////////////////////////////////////////
      else {
        console.warn("Not enough funds on Polygon or Ethereum ");
        props.animations.doFailureAnimation();
      }

      console.log("Bridge and Mint Process Done");
    } catch (e) {
      console.error(
        "Error during bridge and mint process. Possible that user rejected txn",
        e
      );
    }
  }

  return (
    <group scale={5} ref={q2} position={[0, -2, 0]}>
      <Kiwi geometry={q2Geometry} />
      <mesh geometry={q2Geometry}>
        <meshBasicMaterial map={body} alphaMap={bodyAlpha} alphaTest={0.5} />
      </mesh>
      <Expressions
        geometry={bandGeometry}
        scale={[0.52, 0.45, 1]}
        position={[0, 0.2, 0.0045]}
        childGeometry={q2Geometry}
        currExp={props.currExp}
      />
      <mesh
        geometry={bandGeometry}
        scale={[0.52, 0.45, 1]}
        position={[0, 0.2, 0.005]}
      >
        <meshBasicMaterial map={band} transparent needsUpdate />
        <Html
          className="canvas-text-container"
          center
          transform
          sprite
          distanceFactor={1.5}
        >
          <div className="button-container">
            <button className="button" onClick={() => handleClick()}></button>
          </div>
        </Html>
      </mesh>
    </group>
  );
};

const Expressions = (props: any) => {
  const expressions: any = useRef(null);
  const expression: any = useRef(null);

  const mask = useTexture("/assets/scene1/Q2_mask.jpg");

  const expArray = useTexture([
    "/assets/scene2/expressions/entry/exp-1.png",
    "/assets/scene2/expressions/entry/exp-2.png",
    "/assets/scene2/expressions/entry/exp-3.png",
    "/assets/scene2/expressions/entry/exp-4.png",
    "/assets/scene2/expressions/entry/exp-5.png",
    "/assets/scene2/expressions/failure/exp-1.png",
    "/assets/scene2/expressions/failure/exp-2.png",
    "/assets/scene2/expressions/failure/exp-3.png",
    "/assets/scene2/expressions/failure/exp-4.png",
    "/assets/scene2/expressions/failure/exp-5.png",
    "/assets/scene2/expressions/failure/exp-6.png",
    "/assets/scene2/expressions/failure/exp-7.png",
    "/assets/scene2/expressions/failure/exp-8.png",
    "/assets/scene2/expressions/failure/exp-9.png",
    "/assets/scene2/expressions/failure/exp-10.png",
    "/assets/scene2/expressions/failure/exp-11.png",
    "/assets/scene2/expressions/failure/exp-12.png",
    "/assets/scene2/expressions/failure/exp-13.png",
    "/assets/scene2/expressions/failure/exp-14.png",
    "/assets/scene2/expressions/failure/exp-15.png",
    "/assets/scene2/expressions/failure/exp-16.png",
    "/assets/scene2/expressions/transact/exp-1.png",
    "/assets/scene2/expressions/transact/exp-2.png",
    "/assets/scene2/expressions/transact/exp-3.png",
    "/assets/scene2/expressions/transact/exp-4.png",
    "/assets/scene2/expressions/transact/exp-5.png",
    "/assets/scene2/expressions/transact/exp-6.png",
    "/assets/scene2/expressions/transact/exp-7.png",
    "/assets/scene2/expressions/success/exp-1.png",
    "/assets/scene2/expressions/success/exp-2.png",
    "/assets/scene2/expressions/success/exp-3.png",
    "/assets/scene2/expressions/bridge/Bridge.png",
  ]);

  useEffect(() => {
    if (expression.current) {
      const handleCamera = () => {
        if (window.innerWidth / window.innerHeight < 1.5) {
          const minus = 1.5 - window.innerWidth / window.innerHeight / 2;
          expression.current.scale.set(2.75 - minus, 1.15 - minus / 4, 1);
        } else {
          expression.current.scale.set(2.75, 1.15, 1);
        }
      };

      window.addEventListener("resize", handleCamera);
      handleCamera();
    }
  }, [expression]);

  return (
    <mesh ref={expressions} {...props}>
      <meshBasicMaterial alphaMap={mask} transparent needsUpdate>
        {/* @ts-ignore */}
        <RenderTexture attach="map" frames={1}>
          <PerspectiveCamera makeDefault position={[0, 0, 1]} />
          <mesh
            geometry={props.childGeometry}
            scale={[2.75, 1.15, 1]}
            position={[0, 0.2, 0]}
            ref={expression}
          >
            <meshBasicMaterial
              map={expArray[props.currExp]}
              // alphaMap={expMaskArray[props.currExp]}
              transparent
              needsUpdate
            />
          </mesh>
        </RenderTexture>
      </meshBasicMaterial>
    </mesh>
  );
};

const Kiwi = (props: any) => {
  const { isSoundEnabled } = useGlobalContext();
  const kiwi: any = useRef(null);
  const [hovered, setHovered] = useState(false);

  const [kiwiMap, kiwiAlpha, kiwiAlt] = useTexture([
    "/assets/scene1/Kiwi.png",
    "/assets/scene1/Kiwi_alpha.jpg",
    "/assets/scene1/Kiwi_exp_1.png",
  ]);

  useEffect(() => {
    if (isSoundEnabled && hovered) {
      const audio = document.querySelector("#audio-kiwi") as HTMLAudioElement;
      audio.currentTime = 0;
      audio.play();
    }
  }, [isSoundEnabled, hovered]);

  return (
    <group position={[0, 0, 0.01]}>
      <mesh {...props} ref={kiwi}>
        <meshBasicMaterial
          map={kiwiMap}
          alphaMap={kiwiAlpha}
          alphaTest={0.5}
          needsUpdate
        />
      </mesh>
      <mesh {...props}>
        <meshBasicMaterial
          map={kiwiAlt}
          alphaMap={kiwiAlpha}
          alphaTest={0.5}
          visible={hovered ? true : false}
          needsUpdate
        />
      </mesh>
      <mesh
        position={[0, 0.49, 0.2]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <planeGeometry args={[0.16, 0.16]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </group>
  );
};
