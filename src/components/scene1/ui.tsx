import Image from 'next/image'
import topPanelWorld from '@/assets/ui/world/top-panel.png'
import midPanelWorld from '@/assets/ui/world/mid-panel.png'
import lowerPanelWorld from '@/assets/ui/world/lower-panel.png'
import topPanelSpace from '@/assets/ui/space/top-panel.png'
import midPanelSpace from '@/assets/ui/space/mid-panel.png'
import lowerPanelSpace from '@/assets/ui/space/lower-panel.png'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SoundButton } from '../soundButton'
import { Split } from '@/utils/split'
import { useAccount } from 'wagmi'
import { compactAddress } from '@/utils'
import { useUIContext } from '@/provider/uiProvider'

export const UI = ({ visible }: { visible?: boolean }) => {
  const { address } = useAccount()

  const [mounted, setMounted] = useState(false)

  const { hudText } = useUIContext()

  useEffect(() => {
    setMounted(true)

    const ctx = gsap.context(() => {
      gsap.from('#ui .ui-text-sounds li', {
        scaleY: 0.1,
        duration: 0.75,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 0.75,
          // grid: 'auto',
          // axis: 'x',
          // from: 'random',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      id='ui'
      style={{
        opacity: visible ? 1 : 0,
      }}
    >
      <div className='ui-container ui-space'>
        <Image src={topPanelSpace} alt='ui top' className='ui-part ui-top' />
        <div className='ui-part ui-mid'>
          <div className='ui-img'>
            <Image src={midPanelSpace} alt='ui mid' className='ui-img-img' />
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
              {mounted && (
                <div>{address ? compactAddress(address as string) : ''}</div>
              )}
              <SoundButton />
            </div>
          </div>
        </div>
        <Image
          src={lowerPanelSpace}
          alt='ui lower'
          className='ui-part ui-lower'
        />
      </div>

      <div className='ui-container ui-world'>
        <Image src={topPanelWorld} alt='ui top' className='ui-part ui-top' />
        <div className='ui-part ui-mid'>
          <div className='ui-img'>
            <Image src={midPanelWorld} alt='ui mid' className='ui-img-img' />
            <div className='ui-text'>
              <div className='text-2'>
                <p className='phrase-3' id='custom-p-1'>
                  <Split splitWords splitChars textToSplit={hudText} />
                </p>
              </div>
            </div>
            <div className='ui-sounds'>
              {mounted && (
                <div className='address'>
                  {address ? compactAddress(address as string) : ''}
                </div>
              )}
              <SoundButton />
            </div>
          </div>
        </div>
        <Image
          src={lowerPanelWorld}
          alt='ui lower'
          className='ui-part ui-lower'
        />
      </div>
    </div>
  )
}
