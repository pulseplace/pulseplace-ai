
import React from 'react';

export const TypingIndicatorStyles: React.FC = () => {
  return (
    <style jsx global>{`
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-4px);
        }
      }
      
      .typing-indicator .dot {
        animation: bounce 1s infinite;
      }
      
      .typing-indicator .dot:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .typing-indicator .dot:nth-child(3) {
        animation-delay: 0.4s;
      }
    `}</style>
  );
};
