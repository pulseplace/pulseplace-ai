
import { useState, useCallback } from 'react';

// Export the ConfettiConfig interface so it can be imported by other components
export interface ConfettiConfig {
  particleCount: number; 
  spread: number; 
  startVelocity?: number; 
  decay?: number; 
  gravity?: number; 
  drift?: number; 
  scalar?: number; 
  origin?: {
    x?: number;
    y?: number;
  };
  ticks?: number; // Added ticks property
}

export const useConfetti = () => {
  const defaultConfig: ConfettiConfig = {
    particleCount: 50, 
    spread: 70, 
    startVelocity: 30, 
    decay: 0.95, 
    gravity: 1, 
    drift: 0, 
    scalar: 1, 
    ticks: 200 // Configure this for animation duration
  };

  const [confetti, setConfetti] = useState<{ isActive: boolean; config: ConfettiConfig }>({
    isActive: false,
    config: defaultConfig
  });

  const triggerConfetti = useCallback((customConfig?: Partial<ConfettiConfig>) => {
    setConfetti({
      isActive: true,
      config: {
        ...defaultConfig,
        ...customConfig
      }
    });

    // Reset after animation completes
    setTimeout(() => {
      setConfetti(prev => ({ ...prev, isActive: false }));
    }, 3000); // Animation lasts for 3 seconds
  }, []);

  return {
    confetti,
    triggerConfetti
  };
};
