// React
import { useEffect, useMemo, useRef, useState } from 'react'
// gsap
import gsap from 'gsap'
import Image from 'next/image'
import { Split } from '@/utils/split'
import { useGlobalContext } from '@/provider/globalProvider'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
// import { Q2MaskCanvas } from './q2MaskCanvas1'

export const SceneOne = () => {
  const { scrollLenis } = useGlobalContext()

  const scene1 = useRef<HTMLDivElement>(null)
  const voyagerTl = useRef<GSAPTimeline>()

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

      const pinTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: '.scene-1',
            start: 'top top',
            end: '+=8000',
            pin: true,
            scrub: true,
            // invalidateOnRefresh: true,
            onLeave: () => diskRotation.pause(),
            onEnterBack: () => diskRotation.play(),
            onRefresh: () => {
              // console.log('hello')
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
        .to(
          '.scene-1',
          {
            yPercent: 25,
            autoAlpha: 0,
            duration: 10,
            ease: 'power2.inOut',
          },
          '>+15'
        )

      voyagerTl.current = gsap
        .timeline({
          paused: true,
          reversed: true,
          onComplete: () => {
            if (scrollLenis) scrollLenis?.start()
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
            duration: 4,
            ease: 'back',
          }
        )

      window.addEventListener('resize', () => {
        // pinTl.ref
      })

      return () => voyagerTl.current?.revert()
    })

    return () => {
      ctx.revert()
    }
  }, [scrollLenis])

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
        <Image
          src='/assets/sunbeam.png'
          alt='Q2 mascot'
          fill
          priority
          sizes='(max-width: 768px) 50vw, (max-width: 1200px) 75vw, 100vw'
          loading='eager'
          className='imgimg'
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
