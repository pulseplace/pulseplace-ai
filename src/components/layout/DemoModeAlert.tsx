
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Rocket, RefreshCw } from 'lucide-react';

interface DemoModeAlertProps {
  onReset: () => void;
  onDismiss: () => void;
}

const DemoModeAlert = ({ onReset, onDismiss }: DemoModeAlertProps) => {
  return (
    <Alert className="rounded-none border-b border-amber-200 bg-amber-50">
      <AlertDescription className="flex items-center justify-between text-amber-800">
        <span className="flex items-center">
          <Rocket className="h-4 w-4 mr-2" />
          Demo Mode Active: All actions are simulated and data is mocked
        </span>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs border-amber-200 hover:bg-amber-100"
            onClick={onReset}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Reset Demo Data
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs text-amber-800 hover:bg-amber-100 hover:text-amber-900"
            onClick={onDismiss}
          >
            Dismiss
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default DemoModeAlert;
