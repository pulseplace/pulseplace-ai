
import { useState, useCallback } from 'react';

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
  particleCount: 100,
  spread: 70,
  startVelocity: 30,
  decay: 0.95,
  gravity: 1,
  drift: 0,
  scalar: 1,
  ticks: 200
};

// Different celebration animations
const celebrations = {
  default: defaultConfig,
  subtle: {
    ...defaultConfig,
    particleCount: 30,
    startVelocity: 20,
    gravity: 0.7
  },
  explosion: {
    ...defaultConfig,
    particleCount: 150,
    startVelocity: 45,
    spread: 100
  },
  rain: {
    ...defaultConfig,
    particleCount: 80,
    startVelocity: 10,
    gravity: 0.5,
    drift: 0.5
  },
  fountain: {
    ...defaultConfig,
    particleCount: 80,
    startVelocity: 50,
    gravity: 1.5,
    drift: 0
  }
};

export const useConfetti = () => {
  const [confetti, setConfetti] = useState<ConfettiState>({
    isActive: false,
    config: defaultConfig
  });

  const triggerConfetti = useCallback((
    type: keyof typeof celebrations = 'default',
    customConfig?: Partial<ConfettiConfig>
  ) => {
    // Get the base config for the selected celebration type
    const baseConfig = celebrations[type] || celebrations.default;
    
    // Set confetti to active with merged config
    setConfetti({
      isActive: true,
      config: {
        ...baseConfig,
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
  }, []);

  return {
    confetti,
    triggerConfetti
  };
};
