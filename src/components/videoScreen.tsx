import React from "react";

type Props = {};

const VideoScreen: React.FC<Props> = ({}) => {
  return (
    <div className="relative h-screen video cursor-none">
      <div className="relative inset-0 bg-cover bg-center" />
      <video
        className="absolute left-0 bottom-0 top-0 right-0 min-w-full min-h-full w-screen h-auto"
        loop
        autoPlay
      >
        <source
          src="https://res.cloudinary.com/dyplx2t1x/video/upload/v1689076626/Pluto/Mint/PreRevealHQWide_rreahd.mp4"
          type="video/mp4"
        />
      </video>
      <audio
        src="https://res.cloudinary.com/dyplx2t1x/video/upload/v1689076616/Pluto/Mint/Pre_Reveal_Audio_e6touw.mp3"
        autoPlay
      ></audio>
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
            textShadow: "2px 2px 10px #222",
          }}
        >
          Congrats #123, now, you are a Misfit.
        </a>
      </div>

      <div
        className="absolute space-x-5 justify-center flex w-full bottom-5 p-4 text-[22px] font-semibold text-purple-200"
        style={{
          textShadow: "2px 2px 10px #222",
        }}
      >
        <a href="#" target="_blank">
          View on OpenSea
        </a>
        <a
          target="_blank"
          href="http://twitter.com/share?text=I am officially a misfit @plutomisfits!&url=https://magicbatch.xyz/&hashtags=pluto,misfit,randomCat123"
        >
          Share on Twitter
        </a>
      </div>
    </div>
  );
};

export default VideoScreen;
