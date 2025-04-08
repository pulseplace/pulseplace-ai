
import React from 'react';

export const TypingIndicatorStyles: React.FC = () => {
  return (
    <style>
      {`
      .typing-indicator {
        display: flex;
        align-items: center;
      }
      .dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #6366f1;
        margin-right: 4px;
        animation: typing-pulse 1.4s infinite ease-in-out;
      }
      .dot:nth-child(1) {
        animation-delay: 0ms;
      }
      .dot:nth-child(2) {
        animation-delay: 150ms;
      }
      .dot:nth-child(3) {
        animation-delay: 300ms;
      }
      @keyframes typing-pulse {
        0%, 80%, 100% { 
          transform: translateY(0);
          opacity: 1;
        }
        40% { 
          transform: translateY(-5px);
          opacity: 0.5;
        }
      }
      `}
    </style>
  );
};
