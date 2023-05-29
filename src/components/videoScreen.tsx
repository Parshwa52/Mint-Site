import React from "react";

type Props = {};

const VideoScreen: React.FC<Props> = ({}) => {
  return (
    <div className="relative h-screen video">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.bandisoft.com/honeycam/help/file_format/sample.webp')",
        }}
      />
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
          className="mr-4 text-lg sm:text-xl md:text-3xl font-bold text-white"
          style={{
            textShadow: "3px 3px 20px black",
          }}
        >
          Congrats #123, now, you are a Misfit.
        </a>
      </div>

      <div
        className="absolute items-center justify-center flex w-full bottom-5 p-4 text-[22px] font-semibold text-white"
        style={{
          textShadow: "3px 3px 20px black",
        }}
      >
        <a href="#">
          View on OpenSea
        </a>
      </div>
    </div>
  );
};

export default VideoScreen;
