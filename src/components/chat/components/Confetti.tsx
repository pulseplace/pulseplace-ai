
import React, { useEffect } from 'react';
import { ConfettiConfig } from '../types';

interface ConfettiProps {
  isActive: boolean;
  config: ConfettiConfig;
}

export const Confetti: React.FC<ConfettiProps> = ({ isActive, config }) => {
  useEffect(() => {
    if (isActive) {
      console.log('Confetti effect triggered with config:', config);
      // In a real implementation, this would use a confetti library
      // like canvas-confetti or react-confetti
    }
  }, [isActive, config]);

  // This is a placeholder - in a real implementation would render actual confetti
  return isActive ? (
    <div className="confetti-container" aria-hidden="true" />
  ) : null;
};
