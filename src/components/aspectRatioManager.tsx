import { useEffect, useState } from 'react'
import Image from 'next/image'
import icon from '@/assets/mobile-landscape-mode-icon.png'

export const AspectRatioManager = () => {
  const [screenEnabled, setScreenStatus] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight > window.innerWidth) setScreenStatus(true)
      else setScreenStatus(false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (screenEnabled)
    return (
      <div id='aspect-ratio-screen'>
        <Image
          src={icon}
          alt='rotate your device icon'
          className='aspect-icon'
        />
        <p className='aspect-text heading-font'>
          To enjoy the website full experience, please rotate your device or
          expand you window.
        </p>
      </div>
    )
  else return <></>
}
