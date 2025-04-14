
import React from 'react';
import { FileQuestion, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateCardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  title = "No data available",
  description = "There's no data to display at the moment.",
  icon = <FileQuestion className="h-12 w-12 text-muted-foreground/50" />,
  actionLabel = "Refresh",
  onAction
}) => {
  return (
    <Card className="border-dashed border-gray-300 bg-gray-50/50">
      <CardContent className="flex flex-col items-center justify-center py-10 text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        {onAction && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAction}
            className="gap-1"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyStateCard;
