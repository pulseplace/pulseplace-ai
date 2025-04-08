
import React from 'react';
import { cn } from '@/lib/utils';

interface BrandMessageProps {
  message: string;
  className?: string;
}

export const BrandMessage = ({ message, className }: BrandMessageProps) => {
  return (
    <div className={cn("text-center my-6", className)}>
      <p className="text-lg font-medium bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">
        {message}
      </p>
    </div>
  );
};
