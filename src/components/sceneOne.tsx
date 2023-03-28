// React
import { useEffect, useMemo, useRef } from 'react'
// gsap
import gsap from 'gsap'
import Image from 'next/image'

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
    console.log(document.querySelectorAll('.mask-carousel > div').length)
    // with React gsap offer the possibility of the function context() to auto clean up the timelines
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: scene1.current,
            start: 'top top',
            end: '+=5000',
            pin: true,
            scrub: true,
            markers: true,
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
            yPercent: -100,
            xPercent: 0,
            duration: 15,
            ease: 'power2.inOut',
          },
          35
        )
        .addLabel('diskImpact', 50)

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

      // rotate the disk
      gsap.to('.scene-secondary-img', {
        rotate: 360,
        duration: 10,
        repeat: -1,
        ease: 'none',
      })
    }, scene1)

    return () => ctx.revert()
  }, [])

  return (
    <div className='scene scene-1' ref={scene1}>
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
