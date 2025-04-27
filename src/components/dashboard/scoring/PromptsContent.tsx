
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { ScoringTheme, ThemeScore } from '@/types/scoring.types';
import { useToast } from "@/hooks/use-toast";
import { getFeedbackSynthesisPrompt, getOpenEndedFeedbackPrompt } from '@/utils/scoring';

interface PromptsContentProps {
  themeScores: ThemeScore[];
  openEndedResponses?: Record<string, any>;
}

const PromptsContent = ({ themeScores, openEndedResponses = {} }: PromptsContentProps) => {
  const { toast } = useToast();
  
  // Generate the prompt for the theme scores
  const themeScoresForPrompt = themeScores.map(score => ({
    theme: score.theme,
    score: score.score
  }));
  
  const promptText1 = getFeedbackSynthesisPrompt({ 
    themeScores: themeScoresForPrompt 
  });
  
  // Generate the prompt for the open-ended responses
  const promptText2 = getOpenEndedFeedbackPrompt(openEndedResponses);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Prompt text has been copied to your clipboard.",
      });
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme Scores Synthesis Prompt</CardTitle>
          <CardDescription>
            Use this prompt with your AI assistant to generate insights based on theme scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Textarea 
              className="h-[200px] font-mono text-sm" 
              value={promptText1} 
              readOnly 
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(promptText1)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Open-Ended Responses Prompt</CardTitle>
          <CardDescription>
            Use this prompt with your AI assistant to analyze open-ended responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Textarea 
              className="h-[200px] font-mono text-sm" 
              value={promptText2} 
              readOnly 
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(promptText2)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromptsContent;
