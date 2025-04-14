
import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LastUpdatedTimestampProps {
  timestamp: Date;
  prefix?: string;
  className?: string;
}

const LastUpdatedTimestamp: React.FC<LastUpdatedTimestampProps> = ({
  timestamp,
  prefix = "Last updated",
  className = "text-xs text-muted-foreground"
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center gap-1 ${className}`}>
            <Clock className="h-3 w-3" />
            <span>{prefix}: {formatDistanceToNow(timestamp, { addSuffix: true })}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{format(timestamp, 'PPpp')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LastUpdatedTimestamp;
