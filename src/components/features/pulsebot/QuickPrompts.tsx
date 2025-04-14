
import React from 'react';
import { PulseBotTooltip } from '@/components/chat/components/PulseBotTooltip';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Star } from 'lucide-react';

interface QuickPromptsProps {
  onPromptClick: (promptText: string) => void;
}

const QuickPrompts: React.FC<QuickPromptsProps> = ({ onPromptClick }) => {
  const popularPrompts = [
    "Summarize Team Sigma",
    "What are our top performing departments?",
    "Show risk for Team Gamma"
  ];
  
  return (
    <div className="relative mb-3">
      <PulseBotTooltip onSelectPrompt={onPromptClick} />
      
      <Card className="mb-4 bg-gradient-to-r from-pulse-50 to-white border-pulse-100">
        <CardContent className="pt-4">
          <div className="flex items-center mb-2">
            <Star className="h-4 w-4 text-amber-500 mr-2" />
            <span className="text-sm font-medium">Popular Questions</span>
          </div>
          
          <div className="grid grid-cols-1 gap-1">
            {popularPrompts.map((prompt, index) => (
              <button
                key={index}
                className="flex items-center justify-between text-sm text-left p-2 rounded hover:bg-gray-50 transition-colors"
                onClick={() => onPromptClick(prompt)}
              >
                <span>{prompt}</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickPrompts;
