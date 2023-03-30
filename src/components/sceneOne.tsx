// React
import { useEffect, useMemo, useRef } from 'react'
// gsap
import gsap from 'gsap'
import Image from 'next/image'
import { Split } from '@/utils/split'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const SceneOne = () => {
  const scene1 = useRef<HTMLDivElement>(null)

  function importAll(r: any) {
    return r.keys().map(r)
  }
  const images = useMemo(() => {
    return importAll(
      require.context('@/assets/voyager-carousel/', true, /\.(jpe?g)$/)
    )
  }, [])

  useEffect(() => {
    // with React gsap offer the possibility of the function context() to auto clean up the timelines
    const ctx = gsap.context(() => {
      // rotate the disk
      const diskRotation = gsap
        .timeline({
          paused: true,
        })
        .to(
          '.scene-secondary-img',
          {
            rotate: 360,
            duration: 10,
            repeat: -1,
            ease: 'none',
          },
          0
        )

      // text appear
      const textAppear = gsap
        .timeline({ paused: true })
        .to('.scene-main-text p span span', {
          display: 'inline-flex',
          duration: 0.1,
          stagger: {
            amount: 3,
          },
        })

      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: scene1.current,
            start: 'top top',
            end: '+=5000',
            pin: true,
            scrub: true,
            markers: true,
            onEnter: () => {
              diskRotation.play()
            },
            onEnterBack: () => {
              diskRotation.play()
              textAppear.timeScale(2)
              textAppear.reverse()
              gsap.to('.scene-main-img-mask', {
                autoAlpha: 1,
                duration: 1.25,
                ease: 'bounce.inOut',
              })
            },
            onLeave: () => {
              diskRotation.pause()
              textAppear.timeScale(1)
              textAppear.play()
              gsap.to('.scene-main-img-mask', {
                autoAlpha: 0,
                duration: 1.25,
                ease: 'bounce.inOut',
              })
            },
            onLeaveBack: () => {
              diskRotation.pause()
              textAppear.timeScale(1)
              textAppear.play()
              gsap.to('.scene-main-img-mask', {
                autoAlpha: 0,
                duration: 1.25,
                ease: 'bounce.inOut',
              })
            },
          },
          defaults: {
            ease: 'none',
          },
        })
        .fromTo(
          '.scene-main-img',
          {
            yPercent: 15,
          },
          {
            scale: 0.75,
            yPercent: 0,
            duration: 50,
          },
          0
        )
        .fromTo(
          '.scene-secondary-img',
          { yPercent: -300, xPercent: 250 },
          {
            yPercent: -110,
            xPercent: 15,
            duration: 25,
            ease: 'back.inOut',
          },
          25
        )
        .addLabel('diskImpact', 50)
        .to(
          '.scene-secondary-img',
          {
            xPercent: 150,
            yPercent: -150,
            duration: 50,
          },
          50
        )
        .to(
          '.scene-secondary-img',
          {
            scale: 0.5,
            skewX: 25,
            duration: 35,
          },
          50
        )
        .to(
          '.scene-secondary-img',
          {
            scale: 0,
            duration: 15,
          },
          85
        )
      gsap.utils.toArray('.mask-carousel > div').forEach((img: any, i) => {
        tl.from(
          img,
          {
            autoAlpha: 0,
            duration: 5,
            ease: 'none',
          },
          `diskImpact+=${i * 2.5}`
        )
      })
    }, scene1)

    return () => ctx.revert()
  }, [])

  return (
    <div className='scene scene-1' ref={scene1}>
      <div className='scene-main-text'>
        <p>
          <Split
            splitWords
            splitChars
            textToSplit='Anim dolor amet magna ut in voluptate. Proident ex cupidatat elit nulla proident ut enim in ea et laboris. Incididunt labore nostrud qui aliquip mollit in veniam cillum.'
          />
        </p>
      </div>
      <div className='scene-main-img'>
        <div className='scene-main-img-mask'>
          <div className='mask-carousel'>
            {images.map((image: any, i: number) => {
              return (
                <div key={i}>
                  <Image
                    src={image.default.src}
                    alt='Q2 mascot'
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <Image
          src='/assets/sunbeam.png'
          alt='Q2 mascot'
          fill
          priority
          sizes='(max-width: 768px) 50vw, (max-width: 1200px) 75vw, 100vw'
          loading='eager'
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
      <div className='scene-secondary-img'>
        <div>
          <Image
            src='/assets/disk.webp'
            alt='Discover'
            fill
            sizes='(max-width: 768px) 50vw, (max-width: 1200px) 75vw, 100vw'
            loading='eager'
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    </div>
  )
}
