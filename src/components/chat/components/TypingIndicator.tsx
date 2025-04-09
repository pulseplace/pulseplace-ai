
import React from 'react';

interface TypingIndicatorProps {
  isVisible: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="typing-indicator flex items-center space-x-1.5 p-2.5 rounded-lg bg-background-light dark:bg-background-dark max-w-[90px] shadow-sm">
      <div className="dot w-2.5 h-2.5 bg-pulse-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="dot w-2.5 h-2.5 bg-pulse-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="dot w-2.5 h-2.5 bg-pulse-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );
};
