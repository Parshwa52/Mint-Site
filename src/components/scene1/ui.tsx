import Image from 'next/image'
import topPanelWorld from '@/assets/ui/world/top-panel.png'
import midPanelWorld from '@/assets/ui/world/mid-panel.png'
import lowerPanelWorld from '@/assets/ui/world/lower-panel.png'
import topPanelSpace from '@/assets/ui/space/top-panel.png'
import midPanelSpace from '@/assets/ui/space/mid-panel.png'
import lowerPanelSpace from '@/assets/ui/space/lower-panel.png'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { SoundButton } from '../soundButton'
import { Split } from '@/utils/split'
import { useAccount } from 'wagmi'
import { compactAddress } from '@/utils'

export const UI = ({ visible }: { visible?: boolean }) => {
  const { address } = useAccount()

  const [mounted, setMounted] = useState(false)

  const your_custom_text = ''

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
          grid: 'auto',
          axis: 'x',
          from: 'random',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  function showCustomText(target: HTMLParagraphElement) {
    gsap
      .timeline()
      // hide previous text
      .set('#ui .ui-text', { display: 'block' })
      .to('#text-1 > *', { autoAlpha: 0, ease: 'expo' })
      .set('#text-1 > *', { display: 'none' })
      // show selected text
      .set(target, {
        display: 'block',
      })
      .from(target.querySelectorAll('span span'), {
        display: 'none',
        duration: 0.1,
        stagger: 0.1,
        ease: 'none',
      })
  }
  function hideCustomText(target: HTMLParagraphElement) {
    gsap
      .timeline()
      .to(
        target.querySelectorAll('span span'),
        {
          display: 'none',
          duration: 0.1,
          stagger: -0.05,
          ease: 'none',
        },
        '>+=.5'
      )
      .set(
        '#ui .ui-text',
        {
          display: 'none',
        },
        '>-=.25'
      )
  }

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
                <p className='phrase-3'>
                  <Split splitWords splitChars textToSplit={your_custom_text} />
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
