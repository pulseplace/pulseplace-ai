
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
        variant === 'default' && "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
        variant === 'highlight' && "text-secondary font-semibold",
        variant === 'subtle' && "text-text-muted italic",
        variant === 'success' && "text-success font-semibold"
      )}>
        {message}
      </p>
    </div>
  );
};
