
import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LastUpdatedTimestampProps {
  timestamp: Date;
  prefix?: string;
  className?: string;
  showFullDate?: boolean;
  showTooltip?: boolean;
}

const LastUpdatedTimestamp: React.FC<LastUpdatedTimestampProps> = ({
  timestamp,
  prefix = "Last updated",
  className = "text-xs text-muted-foreground",
  showFullDate = false,
  showTooltip = true
}) => {
  const formattedRelativeTime = formatDistanceToNow(timestamp, { addSuffix: true });
  const formattedFullTime = format(timestamp, 'PPpp');
  
  const displayText = showFullDate ? formattedFullTime : `${prefix}: ${formattedRelativeTime}`;
  
  if (!showTooltip) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <Clock className="h-3 w-3" />
        <span>{displayText}</span>
      </div>
    );
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center gap-1 ${className}`}>
            <Clock className="h-3 w-3" />
            <span>{displayText}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{formattedFullTime}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LastUpdatedTimestamp;
