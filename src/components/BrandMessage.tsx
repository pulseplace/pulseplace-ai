
import React from 'react';
import { cn } from '@/lib/utils';

interface BrandMessageProps {
  message: string;
  className?: string;
  variant?: 'default' | 'highlight' | 'subtle' | 'success';
}

export const BrandMessage = ({ 
  message, 
  className,
  variant = 'default' 
}: BrandMessageProps) => {
  return (
    <div className={cn("text-center my-8", className)}>
      <p className={cn(
        "text-lg font-medium tracking-wide",
        variant === 'default' && "bg-gradient-to-r from-soulful-midnight to-pulse-blue bg-clip-text text-transparent",
        variant === 'highlight' && "text-pulse-blue font-semibold",
        variant === 'subtle' && "text-grey-mist italic",
        variant === 'success' && "text-trust-mint font-semibold"
      )}>
        {message}
      </p>
    </div>
  );
};
