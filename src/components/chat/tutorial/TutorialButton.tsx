
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useTutorial } from './TutorialContext';

const TutorialButton: React.FC = () => {
  const { showTutorial } = useTutorial();

  return (
    <Button 
      onClick={showTutorial} 
      variant="ghost" 
      size="sm"
      className="flex items-center gap-1 text-gray-600 hover:text-pulse-600 transition-colors"
    >
      <Sparkles className="h-4 w-4" />
      <span>Tutorial</span>
    </Button>
  );
};

export default TutorialButton;
