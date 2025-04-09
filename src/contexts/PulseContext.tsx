
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PulseContextType {
  pulseScore: number;
  setPulseScore: (score: number) => void;
  pulseThreshold: number;
  setPulseThreshold: (threshold: number) => void;
}

const PulseContext = createContext<PulseContextType | undefined>(undefined);

export const PulseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pulseScore, setPulseScore] = useState(75);
  const [pulseThreshold, setPulseThreshold] = useState(65);

  return (
    <PulseContext.Provider 
      value={{ 
        pulseScore, 
        setPulseScore, 
        pulseThreshold, 
        setPulseThreshold 
      }}
    >
      {children}
    </PulseContext.Provider>
  );
};

export const usePulse = (): PulseContextType => {
  const context = useContext(PulseContext);
  if (context === undefined) {
    throw new Error('usePulse must be used within a PulseProvider');
  }
  return context;
};
