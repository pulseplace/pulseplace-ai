
import { useState, useCallback } from 'react';
import { ConfettiConfig } from '../types';

// Default confetti configuration
const defaultConfetti: ConfettiConfig = {
  particleCount: 50,
  spread: 70,
  origin: { y: 0.6 }
};

export const useConfetti = () => {
  const [confetti, setConfetti] = useState<{ isActive: boolean; config: ConfettiConfig }>({
    isActive: false,
    config: defaultConfetti
  });

  const triggerConfetti = useCallback((config?: Partial<ConfettiConfig>) => {
    // Merge default config with provided config
    const mergedConfig = {
      ...defaultConfetti,
      ...config
    };

    // Activate confetti
    setConfetti({
      isActive: true,
      config: mergedConfig
    });

    // Auto-disable after 2 seconds
    setTimeout(() => {
      setConfetti(prev => ({ ...prev, isActive: false }));
    }, 2000);
  }, []);

  return {
    confetti,
    triggerConfetti
  };
};
