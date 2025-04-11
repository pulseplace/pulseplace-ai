
import { useState } from 'react';

export interface ConfettiConfig {
  particleCount: number;
  spread: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  scalar?: number;
  ticks?: number;
}

export const useConfetti = () => {
  const [isActive, setIsActive] = useState(false);
  const [config, setConfig] = useState<ConfettiConfig>({
    particleCount: 50,
    spread: 70,
    startVelocity: 30,
    decay: 0.95,
    gravity: 1,
    drift: 0,
    scalar: 1,
    ticks: 200
  });

  const triggerConfetti = (customConfig?: Partial<ConfettiConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...customConfig
    }));
    setIsActive(true);
    
    // Automatically turn off after duration
    setTimeout(() => {
      setIsActive(false);
    }, 2000);
  };

  return {
    confetti: {
      isActive,
      config
    },
    triggerConfetti
  };
};
