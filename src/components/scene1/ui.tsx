import Image from 'next/image'
import topPanel from '@/assets/ui/world/top-panel.png'
import midTopPanel from '@/assets/ui/1/mid-panel.png'
import midPanel from '@/assets/ui/world/mid-panel.png'
import lowerPanel from '@/assets/ui/world/lower-panel.png'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { SoundButton } from '../soundButton'
import { Split } from '@/utils/split'

export const UI = ({ visible }: { visible?: boolean }) => {
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
    <div
      id='ui'
      className='ui-space'
      style={{
        opacity: visible ? 1 : 0,
      }}
    >
      <div className='ui-container'>
        <Image src={topPanel} alt='ui top' className='ui-part ui-top' />
        {/* <Image src={midTopPanel} alt='ui mid' className='ui-part ui-top' /> */}
        <div className='ui-part ui-mid'>
          <div className='ui-img'>
            <Image src={midPanel} alt='ui mid' className='ui-img-img' />
            <div className='ui-text'>
              <div id='text-1'>
                <p className='phrase-1'>
                  <Split
                    splitWords
                    splitChars
                    textToSplit='I have the perfect place for you.'
                  />
                </p>
                <p className='phrase-2'>
                  <Split
                    splitWords
                    splitChars
                    textToSplit='Let me take you to the world of Pluto.'
                  />
                </p>
              </div>
              <ul
                className='ui-text-sounds'
                style={{
                  opacity: visible ? 1 : 0,
                }}
              >
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
