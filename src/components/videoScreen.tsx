import React from 'react'

type Props = {}

const VideoScreen: React.FC<Props> = ({}) => {
  return (
    <div className='relative h-screen video' style={{ opacity: 0 }}>
      <div
        className='absolute inset-0 bg-cover bg-center'
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

      <div className='absolute items-center justify-center flex w-full mt-[130px] top-0 p-4 '>
        <a
          href='#'
          className='mr-4 text-[26px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'
        >
          Congrats #123, now, you are a Misfit.
        </a>
      </div>

      <div className='absolute w-full bottom-0 p-4 text-[22px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mint-text'>
        <a href='#' className='mr-4'>
          View on OpenSea
        </a>
      </div>
    </div>
  )
}

export default VideoScreen
