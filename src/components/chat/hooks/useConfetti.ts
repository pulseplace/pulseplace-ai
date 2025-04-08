
import { useState } from 'react';

export interface ConfettiConfig {
  particleCount: number;
  spread: number;
  startVelocity: number;
  decay: number;
  gravity: number;
  drift: number;
  scalar: number;
  ticks: number;
}

export type ConfettiState = {
  isActive: boolean;
  config: ConfettiConfig;
};

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

export const useConfetti = () => {
  const [confetti, setConfetti] = useState<ConfettiState>({
    isActive: false,
    config: defaultConfig
  });

  const triggerConfetti = (customConfig?: Partial<ConfettiConfig>) => {
    // Set confetti to active with merged config
    setConfetti({
      isActive: true,
      config: {
        ...defaultConfig,
        ...customConfig
      }
    });

    // Reset after animation completes
    setTimeout(() => {
      setConfetti(prev => ({
        ...prev,
        isActive: false
      }));
    }, 3000); // Animation lasts for 3 seconds
  };

  return {
    confetti,
    triggerConfetti
  };
};
