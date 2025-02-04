// components/BubblingFlask.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const BubblingFlask: React.FC = () => {
  const [bubbles, setBubbles] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBubbles = Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () => ({
        x: Math.random() * 1.6 - 0.8,
        y: Math.random() * -1.5,
      }));
      setBubbles(newBubbles);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg width="200" height="400" viewBox="-1 -2 2 4" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="flaskClip">
          <path
            d="M -0.5 -1.5 L -0.35 -0.75 L -0.25 -0.5 L -0.2 0 L -0.1 1 L 0.1 1 L 0.2 0 L 0.25 -0.5 L 0.35 -0.75 L 0.5 -1.5 Z"
          />
        </clipPath>
      </defs>
      <rect width="100%" height="100%" fill="lightblue" clipPath="url(#flaskClip)" />
      <path
        d="M -0.5 -1.5 L -0.35 -0.75 L -0.25 -0.5 L -0.2 0 L -0.1 1 L 0.1 1 L 0.2 0 L 0.25 -0.5 L 0.35 -0.75 L 0.5 -1.5 Z"
        stroke="black"
        fill="none"
      />
      {bubbles.map((bubble, index) => (
        <animated.circle
          key={index}
          cx={bubble.x}
          cy={bubble.y}
          r={0.05}
          fill="white"
          style={useSpring({ to: { cy: bubble.y + 1.5 }, config: { duration: 2000 }, reset: true })}
        />
      ))}
    </svg>
  );
};

export default BubblingFlask;
