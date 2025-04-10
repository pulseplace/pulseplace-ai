
import { useState, useCallback } from 'react';
import { ConfettiConfig } from '../types';

export const useConfetti = () => {
  const defaultConfig: ConfettiConfig = {
    particleCount: 50, 
    spread: 70, 
    startVelocity: 30, 
    decay: 0.95, 
    gravity: 1, 
    drift: 0, 
    scalar: 1, 
    ticks: 200
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
