// React
import { useEffect, useMemo, useRef } from 'react'
// gsap
import gsap from 'gsap'
import Image from 'next/image'
import { Split } from '@/utils/split'

export const SceneTwo = () => {
  const scene2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // with React gsap offer the possibility of the function context() to auto clean up the timelines
    const ctx = gsap.context(() => {}, scene2)

    return () => ctx.revert()
  }, [])

  return <div className='scene scene-1' ref={scene2}></div>
}
