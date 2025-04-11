
import React, { useEffect, useRef } from 'react';
import { ConfettiConfig } from '../hooks/useConfetti';

interface ConfettiProps {
  isActive: boolean;
  config: ConfettiConfig;
}

export const Confetti: React.FC<ConfettiProps> = ({ isActive, config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);
  const rafId = useRef<number | null>(null);
  const colors = useRef([
    '#f94144', '#f3722c', '#f8961e', '#f9c74f', 
    '#90be6d', '#43aa8b', '#577590', '#277da1',
    '#ff99c8', '#fcf6bd', '#d0f4de', '#a9def9'
  ]);

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
      
      // Add some randomness to the shape (circles, stars, hearts, squares)
      const shapeType = Math.floor(Math.random() * 4); // 0: circle, 1: square, 2: heart, 3: star
      
      particles.current.push({
        x: center.x,
        y: center.y,
        velocityX: Math.cos(angle) * startVelocity,
        velocityY: Math.sin(angle) * startVelocity,
        color: colors.current[Math.floor(Math.random() * colors.current.length)],
        size: Math.random() * 10 + 5,
        ticks: 0,
        shapeType,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }
  };

  // Draw a heart shape
  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(0, -size/2);
    ctx.bezierCurveTo(
      size/2, -size, 
      size, -size/2, 
      0, size/2
    );
    ctx.bezierCurveTo(
      -size, -size/2, 
      -size/2, -size, 
      0, -size/2
    );
    ctx.fill();
    ctx.restore();
  };

  // Draw a star shape
  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size/2;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.beginPath();
    
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI * 2 * i) / (spikes * 2);
      const sx = Math.cos(angle) * radius;
      const sy = Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(sx, sy);
      } else {
        ctx.lineTo(sx, sy);
      }
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.restore();
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
      
      // Update rotation
      particle.rotation += particle.rotationSpeed;
      
      // Draw particle based on shape type
      ctx.fillStyle = particle.color;
      
      switch(particle.shapeType) {
        case 0: // Circle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * config.scalar, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 1: // Square
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation * Math.PI / 180);
          ctx.fillRect(-particle.size/2 * config.scalar, -particle.size/2 * config.scalar, 
                       particle.size * config.scalar, particle.size * config.scalar);
          ctx.restore();
          break;
        case 2: // Heart
          drawHeart(ctx, particle.x, particle.y, particle.size * config.scalar, particle.rotation);
          break;
        case 3: // Star
          drawStar(ctx, particle.x, particle.y, particle.size * config.scalar, particle.rotation);
          break;
      }
      
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
