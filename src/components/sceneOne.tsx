// React
import { useEffect, useMemo, useRef, useState } from 'react'
// gsap
import gsap from 'gsap'
import Image from 'next/image'
import { Split } from '@/utils/split'
import { Q2MaskCanvas } from './q2MaskCanvas1'

export const SceneOne = () => {
  const scene1 = useRef<HTMLDivElement>(null)
  const sound = useRef<HTMLAudioElement>(null)

  const [currExp, setExp] = useState('')

  // The images get duplicated
  // function importAll(r: any) {
  //   return r.keys().map(r)
  // }
  // const images = useMemo(() => {
  //   return importAll(
  //     require.context('@/assets/voyager-carousel/', true, /\.(jpe?g)$/)
  //   )
  // }, [])

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
    if (sound.current) {
      sound.current.muted = false
    }

    const ctx = gsap.context(() => {
      const diskRotation = gsap.timeline().to(
        '.scene-secondary-img',
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

      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.scene-1',
            start: 'top top',
            end: '+=7500',
            pin: true,
            scrub: true,
            // onEnter: () => sound.play(),
            onLeave: () => diskRotation.pause(),
            onEnterBack: () => diskRotation.play(),
          },
          defaults: {
            ease: 'none',
          },
          // onStart: () => {
          //   sound.current?.play()
          //   console.log('ciao')
          // },
        })
        .fromTo(
          '.scene-main-img',
          {
            yPercent: 15,
          },
          {
            scale: 0.75,
            yPercent: 0,
            duration: 22.5,
            ease: 'power1.inOut',
          },
          0
        )
        // disk-impact
        .fromTo(
          '.scene-secondary-img',
          { yPercent: -300, xPercent: 250 },
          {
            yPercent: -110,
            xPercent: 15,
            duration: 12.5,
            ease: 'back.inOut',
          },
          12.5
        )
        .addLabel('diskImpact', 25)
        // voyager-animation
        .from(
          '.scene-main-img-mask .mask-carousel > *',
          {
            autoAlpha: 0,
            duration: 1,
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
          '.scene-secondary-img',
          {
            xPercent: 150,
            yPercent: -150,
            duration: 45,
          },
          'diskLeave'
        )
        .to(
          '.scene-secondary-img',
          {
            scale: 0.5,
            skewX: 25,
            duration: 15,
          },
          'diskLeave'
        )
        .to(
          '.scene-secondary-img',
          {
            scale: 0,
            duration: 10,
          },
          'diskLeave+=15'
        )
        // fade-out
        .to(
          '.scene-1',
          {
            yPercent: 25,
            autoAlpha: 0,
            duration: 10,
            ease: 'power2.inOut',
          },
          90
        )
    })

    return () => ctx.revert()
  }, [sound])

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
        {/* <div className='scene-main-canvas'>
          <div>
            <Q2MaskCanvas />
          </div>
        </div> */}
        <div className='scene-main-img-mask'>
          <div className='mask-carousel'>
            {images.map((image: any, i: number) => {
              return (
                <div key={i}>
                  <Image
                    src={image}
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
