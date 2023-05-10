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
    </>
  )
}

export function getAudio(index: string) {
  return document.getElementById(index)
}
