import React, { useState, useEffect } from 'react'

interface Dot {
  id: number
  x: number
  y: number
  size: number
  speed: number
}

export const Background: React.FC = () => {
  const [dots, setDots] = useState<Dot[]>([])

  useEffect(() => {
    const dotsArray: Dot[] = []

    // Create 50 dots with random positions, sizes, and speeds
    for (let i = 0; i < 50; i++) {
      dotsArray.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.floor(Math.random() * 3) + 1,
        speed: Math.random() * 5 + 1,
      })
    }

    setDots(dotsArray)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        return prevDots.map((dot) => {
          let newY = dot.y - dot.speed
          if (newY < 0) {
            newY = window.innerHeight
          }
          return {
            ...dot,
            y: newY,
          }
        })
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className='scene scene-1-bg'>
      {dots.map((dot) => (
        <div
          className='star'
          key={dot.id}
          style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size }}
        />
      ))}
    </section>
  )
}
