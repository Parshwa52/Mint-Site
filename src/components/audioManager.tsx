import { useGlobalContext } from '@/provider/globalProvider'
import { useEffect } from 'react'

export const AudioManager = () => {
  const { soundsArray } = useGlobalContext()

  useEffect(() => {
    const audios = document.querySelectorAll('audio')
    // standardize audio volume
    audios.forEach((audio) => {
      audio.volume = 0.5
      soundsArray.push(audio)
    })
  }, [])

  return (
    <>
      <audio
        id='audio-1'
        loop
        muted
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/Space-Ambience.mp3' type='audio/mp3' />
      </audio>
      <audio
        id='audio-2'
        loop
        muted
        style={{
          display: 'none',
        }}
      >
        <source src='/assets/sounds/World-Score.mp3' type='audio/mp3' />
      </audio>
    </>
  )
}

export function getAudio(index: string) {
  return document.getElementById(index)
}
