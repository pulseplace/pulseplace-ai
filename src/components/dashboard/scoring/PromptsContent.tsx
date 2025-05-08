
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Export the component
const PromptsContent: React.FC = () => {
  const { toast } = useToast();
  const [activePrompt, setActivePrompt] = useState<string>('feedback');
  
  // Sample prompts
  const prompts = {
    feedback: `Based on the following employee feedback data, please identify:
1. Key recurring themes
2. Sentiment analysis (positive/negative/neutral)
3. Priority areas for improvement
4. Recommended action items`,
    
    leadership: `Analyze our leadership survey data to identify:
1. Strengths and weaknesses in our leadership approach
2. Impact on employee engagement and retention
3. Specific behaviors that could be improved
4. Recommended leadership development initiatives`,
    
    onboarding: `Review our onboarding process feedback to determine:
1. Current effectiveness of our onboarding program
2. Key friction points for new employees
3. Comparison to industry best practices
4. Recommended improvements to increase new hire satisfaction`
  };
  
  type PromptKey = keyof typeof prompts;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(prompts[activePrompt as PromptKey]);
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard.",
    });
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">AI Analysis Prompts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {Object.keys(prompts).map((key) => (
              <Button
                key={key}
                variant={activePrompt === key ? "default" : "outline"}
                onClick={() => setActivePrompt(key)}
                size="sm"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Button>
            ))}
          </div>
          
          <Textarea
            value={prompts[activePrompt as PromptKey]}
            className="min-h-[200px] font-mono text-sm"
            readOnly
          />
          
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Prompt
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptsContent;
