import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface Dot {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

const Background: React.FC = () => {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const dotsArray: Dot[] = [];

    // Create 50 dots with random positions, sizes, and speeds
    for (let i = 0; i < 50; i++) {
      dotsArray.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.floor(Math.random() * 3) + 1,
        speed: Math.random() * 5 + 1,
      });
    }

    setDots(dotsArray);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        return prevDots.map((dot) => {
          let newY = dot.y - dot.speed;
          if (newY < 0) {
            newY = window.innerHeight;
          }
          return {
            ...dot,
            y: newY,
          };
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <BackgroundContainer>
      {dots.map((dot) => (
        <Dot
          key={dot.id}
          style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size }}
        />
      ))}
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
`;

const Dot = styled.div`
  position: fixed;
  border-radius: 50%;
  background-color: #fff;
`;

export default Background;
