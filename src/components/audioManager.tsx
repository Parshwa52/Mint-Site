import { useGlobalContext } from '@/provider/globalProvider'
import { useEffect } from 'react'

export const AudioManager = () => {
  const { soundsArray, isSoundEnabled } = useGlobalContext()

  useEffect(() => {
    const audios = document.querySelectorAll('audio')
    // standardize audio volume
    audios.forEach((audio) => {
      audio.volume = 0.5
      audio.pause()
      audio.muted = true
      soundsArray.push(audio)
    })
  }, [])

  useEffect(() => {
    const audios = document.querySelectorAll('audio')

    audios.forEach((audio) => {
      if (isSoundEnabled) audio.muted = false
      else audio.muted = true
    })
  }, [isSoundEnabled])

  return (
    <>
      <audio
        id='audio-0'
        muted
        style={{
          display: 'none',
        }}
      >
        <source
          src='/assets/sounds/Kubrick_Space_Voyager.mp3'
          type='audio/mp3'
        />
      </audio>
      <audio
        id='audio-1'
        muted
        loop
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Loop_Space_Drone.mp3' type='audio/mp3' />
      </audio>
      <audio
        id='audio-2'
        muted
        loop
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Loop_Pluto_World.mp3' type='audio/mp3' />
      </audio>
      <audio
        id='audio-kiwi'
        muted
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Kiwi_Expression.mp3' type='audio/mp3' />
      </audio>
      {/* AUDIO FOR BUILDINGS SECTION */}
      <audio
        id='audio-building'
        muted
        loop
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Loop_Building.mp3' type='audio/mp3' />
      </audio>
      <audio
        id='audio-building-stopped'
        muted
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Stop_Building.mp3' type='audio/mp3' />
      </audio>
      {/* AUDIO FOR EXPRESSIONS */}
      <audio
        id='audio-battery'
        muted
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Q2 Battery Low.mp3' type='audio/mp3' />
      </audio>
      <audio
        id='audio-blink'
        muted
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Q2 Blink Open.mp3' type='audio/mp3' />
      </audio>
      <audio
        id='audio-kidding'
        muted
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Q2 Just Kidding.mp3' type='audio/mp3' />
      </audio>
      <audio
        id='audio-pokemon'
        muted
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Q2 Swirly Eyes.mp3' type='audio/mp3' />
      </audio>
      <audio
        id='audio-wallet-1'
        muted
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Q2 Wallet 1.mp3' type='audio/mp3' />
      </audio>
      <audio
        id='audio-wallet-2'
        muted
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Q2 Wallet 2.mp3' type='audio/mp3' />
      </audio>
      <audio
        id='audio-wallet-3'
        muted
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Q2 Wallet 3.mp3' type='audio/mp3' />
      </audio>

      <audio
        id='audio-welcome'
        muted
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Q2_Welcome_Voice.wav' type='audio/wav' />
      </audio>
      <audio
        id='audio-mint'
        muted
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Q2_Mint_Voice.mp3' type='audio/mp3' />
      </audio>
    </>
  )
}

export function getAudio(index: string) {
  return document.getElementById(index) as HTMLAudioElement
}
