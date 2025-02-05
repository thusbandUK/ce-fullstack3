// components/ParticleCanvas.tsx
"use client"

import React, { useEffect, useRef } from 'react';
import './style.css';


interface Particle {
    x: number;
    y: number;
    radius: number;
    dx: number;
    dy: number;
    hue: number;
    draw: () => void;
    move: () => void;
}

interface HomeProps {
    colour: string;
  }

const ParticleCanvas: React.FC<HomeProps> = ({colour}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particleArray: Particle[] = [];

    const backgroundStyling = {
        background: colour
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                //canvas.width = window.innerWidth;
                //canvas.height = window.innerHeight;

                class ParticleClass implements Particle {
                    x: number;
                    y: number;
                    radius: number;
                    dx: number;
                    dy: number;
                    hue: number;

                    constructor(x = 0, y = 0) {
                        this.x = x;
                        this.y = y;
                        this.radius = Math.random() * 10;
                        this.dx = Math.random() * 3;
                        this.dy = Math.random() * 7;
                        this.hue = 200;
                    }

                    draw() {
                        context?.beginPath();
                        context?.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                        context!.strokeStyle = `hsl(${this.hue} 100% 50%)`;
                        context?.stroke();

                        const gradient = context?.createRadialGradient(
                            this.x,
                            this.y,
                            1,
                            this.x + 0.5,
                            this.y + 0.5,
                            this.radius
                        );

                        gradient?.addColorStop(0.3, "rgba(255, 255, 255, 0.3)");
                        //gradient?.addColorStop(0.95, "#e7feff");
                        gradient?.addColorStop(0.95, colour);

                        gradient ? context!.fillStyle = gradient : null;
                        //context!.fillStyle = gradient;
                        context?.fill();
                    }

                    move() {
                        this.x = this.x + this.dx;
                        this.y = this.y - this.dy;
                    }
                }

                const handleDrawCircle = () => {
                    const a = 27 + Math.floor(Math.random() * 146);
                    const b = 299;

                    for (let i = 0; i < 50; i++) {
                        const particle = new ParticleClass(a, b);
                        particleArray.push(particle);
                    }
                };

                const animate = () => {
                    context.clearRect(0, 0, canvas.width, canvas.height);

                    particleArray.forEach((particle) => {
                        particle.move();
                        particle.draw();
                    });

                    requestAnimationFrame(animate);
                };

                let intervalId = setInterval(handleDrawCircle, 300);
                animate();

                canvas.addEventListener("click", handleDrawCircle);
                //window.addEventListener("resize", () => {
                    //canvas.width = window.innerWidth;
                    //canvas.height = window.innerHeight;
                //});

                const defineXY = (event: MouseEvent) => {
                    const a = event.pageX;
                    const b = event.pageY;
                    console.log(`x coord: ${a}, y coord: ${b}`);
                }

                canvas.addEventListener("click", defineXY);

                return () => {
                    clearInterval(intervalId);
                    canvas.removeEventListener("click", handleDrawCircle);
                    //window.removeEventListener("resize", () => {
                        //canvas.width = window.innerWidth;
                        //canvas.height = window.innerHeight;
                    //});
                };
            }
        }
    }, []);

    return <canvas style={backgroundStyling} className="absolute" ref={canvasRef} id="canvas" width="300" height="300"></canvas>;
};

export default ParticleCanvas;
