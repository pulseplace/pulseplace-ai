
import React from 'react';
import { cn } from '@/lib/utils';

interface BrandMessageProps {
  message: string;
  className?: string;
  variant?: 'default' | 'highlight' | 'subtle';
}

export const BrandMessage = ({ 
  message, 
  className,
  variant = 'default' 
}: BrandMessageProps) => {
  return (
    <div className={cn("text-center my-6", className)}>
      <p className={cn(
        "text-lg font-medium",
        variant === 'default' && "bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent",
        variant === 'highlight' && "text-pulse-600 font-semibold",
        variant === 'subtle' && "text-gray-600 italic"
      )}>
        {message}
      </p>
    </div>
  );
};
