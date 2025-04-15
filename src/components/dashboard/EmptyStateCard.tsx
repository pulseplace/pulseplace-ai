
import React from 'react';
import { FileQuestion, RefreshCw, AlertTriangle, WifiOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type EmptyStateType = 'no-data' | 'error' | 'offline' | 'loading' | 'custom';

interface EmptyStateCardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  type?: EmptyStateType;
  className?: string;
}

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  type = 'no-data',
  className = ""
}) => {
  // Default values based on type
  let defaultTitle = "No data available";
  let defaultDescription = "There's no data to display at the moment.";
  let defaultIcon = <FileQuestion className="h-12 w-12 text-muted-foreground/50" />;
  let defaultActionLabel = "Refresh";
  
  switch (type) {
    case 'error':
      defaultTitle = "Error loading data";
      defaultDescription = "There was a problem loading this content. Please try again.";
      defaultIcon = <AlertTriangle className="h-12 w-12 text-amber-500/70" />;
      defaultActionLabel = "Try again";
      break;
    case 'offline':
      defaultTitle = "You're offline";
      defaultDescription = "Check your internet connection and try again.";
      defaultIcon = <WifiOff className="h-12 w-12 text-gray-500/70" />;
      defaultActionLabel = "Reconnect";
      break;
    case 'loading':
      defaultTitle = "Loading content";
      defaultDescription = "Please wait while we fetch the latest data.";
      defaultIcon = <RefreshCw className="h-12 w-12 text-muted-foreground/50 animate-spin" />;
      defaultActionLabel = "Cancel";
      break;
    case 'custom':
      // For custom, we'll use the provided props directly
      break;
  }
  
  return (
    <Card className={`border-dashed border-gray-300 bg-gray-50/50 ${className}`}>
      <CardContent className="flex flex-col items-center justify-center py-10 text-center">
        <div className="mb-4">{icon || defaultIcon}</div>
        <h3 className="text-lg font-medium mb-2">{title || defaultTitle}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description || defaultDescription}</p>
        {onAction && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAction}
            className="gap-1"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {actionLabel || defaultActionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyStateCard;
