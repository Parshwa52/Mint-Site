import { useGlobalContext } from '@/provider/globalProvider'
import { useEffect } from 'react'

export const AudioManager = () => {
  const { soundsArray } = useGlobalContext()

  useEffect(() => {
    const audios = document.querySelectorAll('audio')
    // standardize audio volume
    audios.forEach((audio) => {
      audio.volume = 0.5
      audio.pause()
      soundsArray.push(audio)
    })
  }, [])

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
        loop
        muted
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Loop_Space_Drone.mp3' type='audio/mp3' />
      </audio>
      <audio
        id='audio-kiwi'
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Kiwi_Expression.mp3' type='audio/mp3' />
      </audio>
      <audio
        id='audio-2'
        loop
        muted
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Loop_Pluto_World.mp3' type='audio/mp3' />
      </audio>
    </>
  )
}

export function getAudio(index: string) {
  return document.getElementById(index)
}
