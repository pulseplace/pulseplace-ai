
import React from 'react';
import { PulseBotTooltip } from '@/components/chat/components/PulseBotTooltip';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Star, TrendingUp, Brain, Shield } from 'lucide-react';

interface QuickPromptsProps {
  onPromptClick: (promptText: string) => void;
}

const QuickPrompts: React.FC<QuickPromptsProps> = ({ onPromptClick }) => {
  const popularPrompts = [
    {
      text: "Summarize Team Sigma",
      icon: <Brain className="h-4 w-4 text-purple-500" />,
      badge: "Popular"
    },
    {
      text: "What are our top performing departments?",
      icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
      badge: "Trending"
    },
    {
      text: "Show risk for Team Gamma",
      icon: <Shield className="h-4 w-4 text-amber-500" />,
      badge: "Risk Analysis"
    }
  ];
  
  return (
    <div className="relative mb-3">
      <PulseBotTooltip onSelectPrompt={onPromptClick} />
      
      <Card className="mb-4 bg-gradient-to-r from-pulse-50 to-white border-pulse-100 overflow-hidden hover:shadow-md transition-all">
        <CardContent className="pt-4">
          <div className="flex items-center mb-3">
            <Star className="h-4 w-4 text-amber-500 mr-2" />
            <span className="text-sm font-medium">Popular Questions</span>
          </div>
          
          <div className="grid grid-cols-1 gap-1.5">
            {popularPrompts.map((prompt, index) => (
              <button
                key={index}
                className="flex items-center justify-between text-sm text-left p-2.5 rounded-md hover:bg-gray-50 transition-colors group"
                onClick={() => onPromptClick(prompt.text)}
              >
                <div className="flex items-center gap-2">
                  {prompt.icon}
                  <span>{prompt.text}</span>
                </div>
                <div className="flex items-center gap-2">
                  {prompt.badge && (
                    <Badge variant="outline" className="text-[10px] h-5 opacity-70 group-hover:opacity-100 transition-opacity">
                      {prompt.badge}
                    </Badge>
                  )}
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickPrompts;
