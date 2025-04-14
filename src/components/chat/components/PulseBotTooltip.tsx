
import React, { useState } from 'react';
import { Info, HelpCircle, MessageSquare, X } from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface PulseBotTooltipProps {
  onSelectPrompt?: (prompt: string) => void;
}

export const PulseBotTooltip: React.FC<PulseBotTooltipProps> = ({ 
  onSelectPrompt 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const suggestedPrompts = [
    {
      category: "Team Analysis",
      prompts: [
        "Summarize Team Alpha's performance",
        "Show risk factors for Team Gamma",
        "Which team has the highest PulseScore?"
      ]
    },
    {
      category: "Culture Insights",
      prompts: [
        "What are our top performing departments?",
        "Which themes need the most attention?",
        "Compare Engineering vs Marketing culture"
      ]
    },
    {
      category: "Recommendations",
      prompts: [
        "How can we improve psychological safety?",
        "What actions will reduce attrition risk?",
        "Suggest ways to increase team engagement"
      ]
    }
  ];
  
  const handlePromptClick = (prompt: string) => {
    if (onSelectPrompt) {
      onSelectPrompt(prompt);
    }
    setIsExpanded(false);
  };
  
  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full absolute right-4 top-[-10px] bg-white shadow-md border-pulse-100"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <X className="h-4 w-4 text-pulse-500" />
              ) : (
                <HelpCircle className="h-4 w-4 text-pulse-500" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Get help with PulseBot prompts</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {isExpanded && (
        <div className="absolute right-0 top-[30px] w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5 text-pulse-500" />
              Suggested Prompts
            </h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => setIsExpanded(false)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
          
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {suggestedPrompts.map((category, index) => (
              <div key={index} className="space-y-1.5">
                <h4 className="text-xs font-medium text-gray-500">{category.category}</h4>
                <div className="space-y-1">
                  {category.prompts.map((prompt, promptIndex) => (
                    <button
                      key={promptIndex}
                      className="w-full text-left text-xs px-2 py-1.5 rounded hover:bg-gray-100 transition-colors"
                      onClick={() => handlePromptClick(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 italic">
              Click any prompt to add it to your conversation
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
