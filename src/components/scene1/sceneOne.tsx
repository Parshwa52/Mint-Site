// React
import { useEffect, useRef, useState } from 'react'
// gsap
import gsap from 'gsap'
import Image from 'next/image'
import { Split } from '@/utils/split'
import { useGlobalContext } from '@/provider/globalProvider'
import { Q2MaskCanvas } from './q2MaskCanvas'
// import { Q2MaskCanvas } from './q2MaskCanvas1'

export const SceneOne = () => {
  const { scrollLenis, isSoundEnabled, soundsArray } = useGlobalContext()

  const scene1 = useRef<HTMLDivElement>(null)
  const voyagerTl = useRef<GSAPTimeline>()

  const [currExpression, setCurrExpression] = useState(0)

  useEffect(() => {
    let interval: any
    if (currExpression === 0 || currExpression === 1) {
      interval = setInterval(() => {
        if (currExpression === 0) setCurrExpression(1)
        else if (currExpression === 1) setCurrExpression(0)
      }, 1500)
    }
    if (currExpression === 6 || currExpression === 7) {
      interval = setInterval(() => {
        if (currExpression === 6) setCurrExpression(7)
        else if (currExpression === 7) setCurrExpression(6)
      }, 1500)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currExpression])

  const images = [
    '/assets/voyager-carousel/voyager-01.jpg',
    '/assets/voyager-carousel/voyager-02.jpg',
    '/assets/voyager-carousel/voyager-03.jpg',
    '/assets/voyager-carousel/voyager-04.jpg',
    '/assets/voyager-carousel/voyager-05.jpg',
    '/assets/voyager-carousel/voyager-06.jpg',
    '/assets/voyager-carousel/voyager-07.jpg',
    '/assets/voyager-carousel/voyager-08.jpg',
    '/assets/voyager-carousel/voyager-09.jpg',
    '/assets/voyager-carousel/voyager-10.jpg',
    '/assets/voyager-carousel/voyager-11.jpg',
    '/assets/voyager-carousel/voyager-12.jpg',
    '/assets/voyager-carousel/voyager-13.jpg',
    '/assets/voyager-carousel/voyager-14.jpg',
    '/assets/voyager-carousel/voyager-15.jpg',
    '/assets/voyager-carousel/voyager-16.jpg',
    '/assets/voyager-carousel/voyager-17.jpg',
    '/assets/voyager-carousel/voyager-18.jpg',
    '/assets/voyager-carousel/voyager-19.jpg',
    '/assets/voyager-carousel/voyager-20.jpg',
    '/assets/voyager-carousel/voyager-21.jpg',
    '/assets/voyager-carousel/voyager-22.jpg',
    '/assets/voyager-carousel/voyager-23.jpg',
    '/assets/voyager-carousel/voyager-24.jpg',
    '/assets/voyager-carousel/voyager-25.jpg',
    '/assets/voyager-carousel/voyager-26.jpg',
    '/assets/voyager-carousel/voyager-27.jpg',
    '/assets/voyager-carousel/voyager-28.jpg',
    '/assets/voyager-carousel/voyager-29.jpg',
    '/assets/voyager-carousel/voyager-30.jpg',
    '/assets/voyager-carousel/voyager-31.jpg',
    '/assets/voyager-carousel/voyager-32.jpg',
    '/assets/voyager-carousel/voyager-33.jpg',
    '/assets/voyager-carousel/voyager-34.jpg',
  ]

  useEffect(() => {
    let pastDuration = 0
    const ctx = gsap.context(() => {
      const diskRotation = gsap.timeline().to(
        '.scene-secondary-img > div',
        {
          rotate: 360,
          duration: 10,
          repeat: -1,
          ease: 'none',
        },
        0
      )

      gsap.from('.scene-main-img', {
        autoAlpha: 0,
        duration: 1.25,
        ease: 'expo',
      })

      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: '.scene-1',
            start: 'top top',
            end: '+=8000',
            pin: true,
            scrub: true,
            onLeave: () => diskRotation.pause(),
            onEnterBack: () => diskRotation.play(),
          },
          defaults: {
            ease: 'none',
          },
        })
        .fromTo(
          '.scene-main-img',
          {
            // scale: 1.25,
            yPercent: 30,
          },
          {
            // scale: 0.75,
            yPercent: 15,
            duration: 22.5,
            ease: 'power1.inOut',
          },
          0
        )
        // disk-impact
        .call(
          () => {
            voyagerTl.current?.reversed()
              ? voyagerTl.current?.play()
              : voyagerTl.current?.reverse()
            if (scrollLenis) scrollLenis?.stop()
          },
          undefined,
          '>'
        )
        .to(
          '.scene-secondary-img',
          // {
          //   // yPercent: -300,
          //   xPercent: 450,
          //   skewX: 25,
          // },
          {
            // yPercent: -110,
            // xPercent: 45,
            // skewX: 0,
            duration: 20,
            // ease: 'back',
          },
          15
        )
        .addLabel('diskImpact', 35)
        // voyager-animation
        .from(
          '.scene-main-img-mask .mask-carousel > *',
          {
            autoAlpha: 0,
            duration: 1,
            willChange: 'opacity',
            stagger: {
              amount: 40,
            },
          },
          'diskImpact'
        )
        .to(
          '.scene-main-img-mask',
          {
            autoAlpha: 0,
            duration: 5,
          },
          '>'
        )
        .addLabel('diskLeave', '<')
        .to(
          '.scene-secondary-img > div',
          {
            xPercent: 450,
            duration: 35,
            ease: 'power1.in',
          },
          'diskLeave'
        )
        .to(
          '.scene-secondary-img > div',
          {
            skewX: 25,
            duration: 15,
          },
          'diskLeave'
        )
        // fade-out
        .call(
          () => {
            console.log(tl.progress())
            if (pastDuration > tl.progress()) {
              setCurrExpression(5)
            } else {
              setCurrExpression(6)
            }
            pastDuration = tl.progress()
          },
          undefined,
          'diskLeave'
        )
        .to(
          '.scene-1',
          {
            yPercent: 25,
            autoAlpha: 0,
            duration: 10,
            ease: 'power2.inOut',
          },
          '>+35'
        )

      voyagerTl.current = gsap
        .timeline({
          paused: true,
          reversed: true,
          onComplete: () => {
            if (scrollLenis) scrollLenis?.start()
            setCurrExpression(5)
          },
          onReverseComplete: () => {
            if (scrollLenis) scrollLenis?.start()
          },
        })
        .fromTo(
          '.scene-secondary-img',
          {
            xPercent: 450,
            skewX: 25,
          },
          {
            xPercent: 45,
            skewX: 0,
            duration: 7,
            ease: 'back',
          },
          0
        )
        .call(
          () => {
            voyagerTl.current?.reversed()
              ? setCurrExpression(0)
              : setCurrExpression(2)
          },
          undefined,
          0
        )
        .call(
          () => {
            voyagerTl.current?.reversed()
              ? setCurrExpression(2)
              : setCurrExpression(3)
          },
          undefined,
          1.5
        )
        .call(
          () => {
            voyagerTl.current?.reversed()
              ? setCurrExpression(3)
              : setCurrExpression(4)
          },
          undefined,
          2.5
        )

      return () => voyagerTl.current?.revert()
    })

    return () => {
      ctx.revert()
    }
  }, [scrollLenis])

  useEffect(() => {
    if (soundsArray.length > 0) {
      if (isSoundEnabled) {
        // sound ambient space
        soundsArray[0].muted = false
        soundsArray[0].play()
      } else {
        // sound ambient space
        soundsArray[0].muted = true
        soundsArray[0].pause()
      }
    }
  }, [isSoundEnabled, soundsArray])

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
                    src={image}
                    alt='Q2 mascot'
                    fill
                    sizes='33vw'
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className='scene-exp-img-mask'>
          <Q2MaskCanvas currExp={currExpression} />
        </div>
        <Image
          src='/assets/q2/q2_body.png'
          alt='Q2 mascot'
          fill
          priority
          sizes='(max-width: 768px) 50vw, (max-width: 1200px) 75vw, 100vw'
          loading='eager'
          style={{
            objectFit: 'contain',
            objectPosition: 'center bottom',
          }}
        />
        <Image
          src='/assets/q2/q2_band.png'
          alt='Q2 band'
          fill
          priority
          sizes='(max-width: 768px) 50vw, (max-width: 1200px) 75vw, 100vw'
          loading='eager'
          className='main-img-band'
          style={{
            objectFit: 'contain',
            objectPosition: 'center bottom',
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
