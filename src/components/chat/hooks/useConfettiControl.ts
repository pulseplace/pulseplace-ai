
import { useState, useCallback } from 'react';
import { ConfettiConfig } from '../types';

// Default confetti configuration
const defaultConfetti: ConfettiConfig = {
  particleCount: 50,
  spread: 70,
  startVelocity: 30,
  decay: 0.95,
  gravity: 1,
  origin: { y: 0.6 }
};

export const useConfettiControl = () => {
  const [confetti, setConfetti] = useState<{ isActive: boolean; config: ConfettiConfig }>({
    isActive: false,
    config: defaultConfetti
  });

  const triggerConfetti = useCallback((customConfig?: Partial<ConfettiConfig>) => {
    setConfetti({
      isActive: true,
      config: {
        ...defaultConfetti,
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
