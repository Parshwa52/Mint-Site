import { primaryChainId, secondaryChainId } from "@/constants";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useChainId } from "wagmi";

type Props = {
  tokenId: string;
};

const VideoScreen: React.FC<Props> = ({ tokenId }) => {
  const chainId = useChainId();

  return (
    <div className="relative h-screen video cursor-none">
      <div className="relative inset-0 bg-cover bg-center" />
      <video
        className="absolute left-0 bottom-0 top-0 right-0 min-w-full min-h-full w-screen h-auto"
        loop
        autoPlay
      >
        <source
          src="https://res.cloudinary.com/dyplx2t1x/video/upload/v1689182739/PRWide_irylq3.mp4"
          type="video/mp4"
        />
      </video>
      {/* <audio
        src="https://res.cloudinary.com/dyplx2t1x/video/upload/v1689076616/Pluto/Mint/Pre_Reveal_Audio_e6touw.mp3"
        autoPlay
        loop
      ></audio> */}
      {/* <div className='absolute items-center justify-end flex w-full top-0 p-4 '>
        <a
          href='#'
          className='mr-4 text-[22px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'
        >
          0x132yg312g3g13
        </a>
      </div> */}

      <div className="absolute items-center justify-center flex w-full mt-[100px] top-0 p-4 ">
        <a
          href="#"
          className="mr-4 text-lg sm:text-xl md:text-3xl font-bold text-purple-200"
          style={{
            textShadow: "2px 2px 10px #111",
          }}
        >
          Congrats #{tokenId}, now, you are a Misfit.
        </a>
      </div>

      {chainId === secondaryChainId ? (
        <div
          className="absolute bottom-24 w-full text-center text-purple-200 font-semibold"
          style={{
            textShadow: "2px 2px 10px #111",
          }}
        >
          It will take upto 10mins for your NFT to reflect in your wallet
        </div>
      ) : (
        <></>
      )}

      <div
        className="absolute space-x-5 justify-center flex w-full bottom-5 p-4 text-[22px] font-semibold text-purple-200"
        style={{
          textShadow: "2px 2px 10px #111",
        }}
      >
        {chainId === primaryChainId ? (
          <>
            <a href={`https://dew.gg/collection/pluto`} target="_blank">
              View on Dew
            </a>
            <a
              href={`https://magiceden.io/item-details/polygon/0xa131b877B12B0Ae8BB7da7229b8a1095881497A6/${tokenId}`}
              target="_blank"
            >
              View on MagicEden
            </a>
          </>
        ) : (
          <></>
        )}
        <a
          target="_blank"
          href="http://twitter.com/share?text=What%27s%20behind%20the%20portal%20%40plutomisfits%3F"
        >
          Share on Twitter
        </a>
      </div>
    </div>
  );
};

export default VideoScreen;
