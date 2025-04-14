
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BarChart2, MessageSquare, ExternalLink, ArrowRight } from 'lucide-react';

const QuickAccessButtons: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Quick Access</h3>
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 text-xs justify-start"
          onClick={() => {
            window.location.href = "/dashboard/qa-sprint";
          }}
        >
          <BarChart2 className="h-3.5 w-3.5 mr-1.5" />
          QA Sprint Tracker
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 text-xs justify-start"
          onClick={() => {
            window.location.href = "/pulsebot";
          }}
        >
          <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
          PulseBot Demo Mode
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 text-xs justify-start"
          onClick={() => {
            toast({
              title: "Cross-Browser QA",
              description: "Opening browser testing interface..."
            });
          }}
        >
          <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
          Cross-Browser QA
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 text-xs justify-start"
          onClick={() => {
            toast({
              title: "Demo State Reset",
              description: "Resetting demo environment to initial state..."
            });
          }}
        >
          <ArrowRight className="h-3.5 w-3.5 mr-1.5" />
          Reset Demo State
        </Button>
      </div>
    </div>
  );
};

export default QuickAccessButtons;
