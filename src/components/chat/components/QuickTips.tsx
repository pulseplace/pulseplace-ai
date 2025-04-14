
import React, { useState } from 'react';
import { PulseBotTooltip } from './PulseBotTooltip';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { LightbulbIcon, Sparkles, Brain, TrendingUp } from 'lucide-react';

interface QuickTipsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const QuickTips: React.FC<QuickTipsProps> = ({ onSelectPrompt }) => {
  const [showTips, setShowTips] = useState(true);
  
  const featuredPrompts = [
    {
      icon: <Brain className="h-4 w-4 text-purple-500" />,
      prompt: "Summarize Team Zeta",
      description: "Get a detailed analysis of our highest performing team",
      badge: "New Team"
    },
    {
      icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
      prompt: "Show risk for Team Gamma",
      description: "View detailed risk factors and recommendations",
      badge: "High Priority"
    },
    {
      icon: <Sparkles className="h-4 w-4 text-amber-500" />,
      prompt: "Why is Team Beta eligible for certification?",
      description: "Learn what criteria were met for certification",
      badge: "Certification"
    }
  ];
  
  const handlePromptClick = (prompt: string) => {
    onSelectPrompt(prompt);
    setShowTips(false);
  };
  
  if (!showTips) {
    return (
      <div className="relative mb-3">
        <PulseBotTooltip onSelectPrompt={onSelectPrompt} />
      </div>
    );
  }
  
  return (
    <div className="relative mb-3">
      <PulseBotTooltip onSelectPrompt={onSelectPrompt} />
      
      <Card className="mb-3 border border-pulse-100 bg-pulse-50/30">
        <CardHeader className="pb-2 pt-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <LightbulbIcon className="h-4 w-4 text-pulse-500" />
            <span>Demo Helper: Try these prompts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-2">
          {featuredPrompts.map((item, index) => (
            <button
              key={index}
              className="flex items-start gap-3 p-2 rounded-md hover:bg-white/60 text-left transition-colors"
              onClick={() => handlePromptClick(item.prompt)}
            >
              <div className="mt-0.5">{item.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.prompt}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              {item.badge && (
                <Badge variant="outline" className="text-[10px] h-5 bg-white">
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickTips;
