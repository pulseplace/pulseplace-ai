
import React from 'react';
import { Lightbulb, BarChart2, AlertTriangle, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface QuickPrompt {
  text: string;
  icon: React.ReactNode;
}

interface QuickPromptsProps {
  onPromptClick: (text: string) => void;
}

const QuickPrompts: React.FC<QuickPromptsProps> = ({ onPromptClick }) => {
  const quickPrompts: QuickPrompt[] = [
    { text: "Summarize Team Alpha", icon: <BarChart2 className="h-4 w-4 text-blue-600" /> },
    { text: "Show risk for Team Gamma", icon: <AlertTriangle className="h-4 w-4 text-amber-600" /> },
    { text: "Why is Team Beta eligible for certification?", icon: <CheckCircle2 className="h-4 w-4 text-green-600" /> },
    { text: "Summarize Team Sigma", icon: <TrendingUp className="h-4 w-4 text-indigo-600" /> },
    { text: "Summarize Team Zeta", icon: <Sparkles className="h-4 w-4 text-purple-600" /> }
  ];

  return (
    <div className="mb-4 bg-blue-50 rounded-lg p-3 border border-blue-100">
      <div className="flex items-center gap-1 text-xs text-blue-700 mb-2">
        <Lightbulb className="h-3.5 w-3.5" />
        <span className="font-medium">Demo Quick Prompts:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {quickPrompts.map((prompt, index) => (
          <button
            key={index}
            className="text-xs bg-white border border-blue-200 rounded-full px-3 py-1.5 hover:bg-blue-50 flex items-center gap-1"
            onClick={() => onPromptClick(prompt.text)}
          >
            {prompt.icon}
            <span>{prompt.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickPrompts;
