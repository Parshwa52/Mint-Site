import Image from 'next/image'
import topPanel from '@/assets/ui/1/Top Panel.png'
import midTopPanel from '@/assets/ui/1/Mid top panel.png'
import midPanel from '@/assets/ui/1/Mid Panels.png'
import lowerPanel from '@/assets/ui/1/Lower panel.png'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { SoundButton } from '../soundButton'
import { Split } from '@/utils/split'

export const UI = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('#ui .ui-text-sounds li', {
        scaleY: 0.1,
        duration: 0.75,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 0.75,
          grid: 'auto',
          axis: 'x',
          from: 'random',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div id='ui'>
      <div className='ui-container'>
        <Image src={topPanel} alt='ui top' className='ui-part ui-top' />
        <Image src={midTopPanel} alt='ui mid' className='ui-part ui-top' />
        <div className='ui-part ui-mid'>
          <div className='ui-img'>
            <Image src={midPanel} alt='ui mid' />
            <div className='ui-text'>
              <p id='text-1'>
                <Split
                  splitWords
                  splitChars
                  textToSplit='I have the perfect place for you. Let me take you to the world of Pluto.'
                />
              </p>
              <ul className='ui-text-sounds'>
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
              </ul>
            </div>
            <div className='ui-sounds'>
              <p>0x548g...8h6k</p>
              <SoundButton />
            </div>
          </div>
        </div>
        <Image src={lowerPanel} alt='ui lower' className='ui-part ui-lower' />
      </div>
    </div>
  )
}
