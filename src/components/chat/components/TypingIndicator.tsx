
import React from 'react';

interface TypingIndicatorProps {
  isVisible: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="typing-indicator flex items-center space-x-1 p-2 rounded-lg bg-gray-100 max-w-[80px] animate-pulse">
      <div className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );
};
