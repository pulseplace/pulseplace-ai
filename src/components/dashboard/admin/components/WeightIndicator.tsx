
import React from 'react';

interface WeightIndicatorProps {
  remainingWeight: number;
}

export const WeightIndicator: React.FC<WeightIndicatorProps> = ({ remainingWeight }) => {
  const isValid = Math.abs(remainingWeight) < 0.1;
  
  return (
    <div className={`text-sm font-medium p-2 rounded ${
      isValid 
        ? 'bg-green-100 text-green-800' 
        : 'bg-amber-100 text-amber-800'
    }`}>
      Total: {(100 - remainingWeight).toFixed(1)}% 
      {isValid 
        ? ' (Valid)' 
        : ` (${remainingWeight > 0 ? remainingWeight.toFixed(1) + '% Remaining' : 'Exceeds 100%'})`
      }
    </div>
  );
};
