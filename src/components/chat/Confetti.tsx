
import React, { useEffect, useRef } from 'react';
import { ConfettiConfig } from './hooks/useConfetti';

interface ConfettiProps {
  isActive: boolean;
  config: ConfettiConfig;
}

export const Confetti: React.FC<ConfettiProps> = ({ isActive, config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);
  const rafId = useRef<number | null>(null);

  // Function to create particles
  const createParticles = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear existing particles
    particles.current = [];
    
    // Create new particles
    const center = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };
    
    for (let i = 0; i < config.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const startVelocity = config.startVelocity * (Math.random() * 0.5 + 0.5);
      
      particles.current.push({
        x: center.x,
        y: center.y,
        velocityX: Math.cos(angle) * startVelocity,
        velocityY: Math.sin(angle) * startVelocity,
        color: [
          Math.floor(Math.random() * 256), // r
          Math.floor(Math.random() * 256), // g
          Math.floor(Math.random() * 256)  // b
        ],
        size: Math.random() * 10 + 5,
        ticks: 0
      });
    }
  };

  // Animation loop
  const animate = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.current.forEach((particle, i) => {
      particle.ticks += 1;
      
      // Update position
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      
      // Apply gravity
      particle.velocityY += config.gravity;
      
      // Apply drift (horizontal movement)
      particle.velocityX += config.drift;
      
      // Apply decay (slowdown)
      particle.velocityX *= config.decay;
      particle.velocityY *= config.decay;
      
      // Draw particle
      ctx.beginPath();
      ctx.fillStyle = `rgb(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]})`;
      ctx.arc(particle.x, particle.y, particle.size * config.scalar, 0, Math.PI * 2);
      ctx.fill();
      
      // Remove particles that have lived their life
      if (particle.ticks >= config.ticks) {
        particles.current.splice(i, 1);
      }
    });
    
    if (particles.current.length > 0) {
      rafId.current = requestAnimationFrame(animate);
    }
  };

  // Setup canvas and animation when isActive changes
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Update canvas size
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    if (isActive) {
      createParticles();
      rafId.current = requestAnimationFrame(animate);
    }
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isActive, config]);
  
  if (!isActive) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ pointerEvents: 'none' }}
    />
  );
};
