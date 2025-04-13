
import React from 'react';

interface ProgressBarProps {
  progress: number;
  isVisible: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
        <span>AI Insight Engine</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-pulse-600 rounded-full transition-all duration-200 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
