
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PulseScoreDisplayProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  tooltipContent?: React.ReactNode;
  className?: string;
}

const PulseScoreDisplay: React.FC<PulseScoreDisplayProps> = ({
  score,
  size = 'md',
  showLabel = true,
  tooltipContent,
  className = ''
}) => {
  // Determine color band based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 70) return "text-blue-600 bg-blue-50 border-blue-200";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-200";
    if (score >= 50) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-red-600 bg-red-50 border-red-200";
  };
  
  // Size classes
  const sizeClasses = {
    sm: "text-sm px-1.5 py-0.5 rounded",
    md: "text-base px-2 py-1 rounded-md",
    lg: "text-lg px-3 py-1.5 rounded-lg font-semibold"
  };
  
  const scoreColor = getScoreColor(score);
  const display = (
    <div className={cn(
      "inline-flex items-center border", 
      scoreColor, 
      sizeClasses[size], 
      className
    )}>
      <span>{score}</span>
      {showLabel && <span className="ml-1 opacity-80">/100</span>}
    </div>
  );
  
  if (!tooltipContent) {
    return display;
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {display}
        </TooltipTrigger>
        <TooltipContent>
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PulseScoreDisplay;
