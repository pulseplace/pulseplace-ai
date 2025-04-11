
import { useState, useCallback } from 'react';
import { ConfettiConfig } from '../types';

// Default confetti configuration
const defaultConfetti: ConfettiConfig = {
  particleCount: 50,
  spread: 70,
  origin: { y: 0.6 }
};

export function useConfettiEffect() {
  const [confetti, setConfetti] = useState<{ isActive: boolean; config: ConfettiConfig }>({
    isActive: false,
    config: defaultConfetti
  });

  const triggerConfetti = useCallback((customConfig?: Partial<ConfettiConfig>) => {
    // Merge default config with custom config
    const config = customConfig 
      ? { ...defaultConfetti, ...customConfig }
      : defaultConfetti;
    
    // Activate confetti
    setConfetti({
      isActive: true,
      config
    });
    
    // Turn off confetti after 2 seconds
    setTimeout(() => {
      setConfetti(prev => ({ ...prev, isActive: false }));
    }, 2000);
  }, []);

  return {
    confetti,
    triggerConfetti
  };
}
