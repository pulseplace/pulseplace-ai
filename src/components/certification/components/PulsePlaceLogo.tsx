
import React from 'react';

interface PulsePlaceLogoProps {
  className?: string;
  fill: string;
}

const PulsePlaceLogo: React.FC<PulsePlaceLogoProps> = ({ className, fill }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={fill} 
    className={className} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    <path d="M12 6v6l3 3" />
  </svg>
);

export default PulsePlaceLogo;
