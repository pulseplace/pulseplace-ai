
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  getFeedbackSynthesisPrompt, 
  getOpenEndedFeedbackPrompt 
} from '@/utils/scoring';
import { Progress } from "@/components/ui/progress";

const PromptsContent = () => {
  const { toast } = useToast();
  const [feedbackInput, setFeedbackInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  
  const handleCopyPrompt = (promptType: string) => {
    let promptText = '';
    
    if (promptType === 'feedback') {
      promptText = getFeedbackSynthesisPrompt({
        "sampleResponse1": "I love the collaborative culture here, but sometimes feel meetings could be more efficient.",
        "sampleResponse2": "The leadership team is transparent but we could use more clarity on career paths."
      });
    } else if (promptType === 'open-ended') {
      promptText = getOpenEndedFeedbackPrompt([
        "I appreciate how my team supports each other",
        "Leaders could be more transparent about company changes",
        "There aren't enough opportunities for growth"
      ]);
    } else if (promptType === 'sentiment') {
      promptText = "Analyze the sentiment and key themes in this workplace survey response:\n\n\"{TEXT_RESPONSE}\"\n\nProvide the following:\n1. A sentiment score from 0 (extremely negative) to 100 (extremely positive)\n2. The primary emotion expressed (e.g., satisfaction, frustration, hope)\n3. Key themes mentioned (e.g., work-life balance, management, compensation)\n4. Any action items implied in the feedback\n\nFormat the response as JSON.";
    } else if (promptType === 'executive') {
      promptText = "Generate an executive summary of this organization's PulseScore™ results:\n\nOverall Score: {SCORE}/100\nTier: {TIER_LABEL}\nCategory Scores:\n- Emotion Index: {EMOTION_SCORE}\n- Engagement Stability: {ENGAGEMENT_SCORE}\n- Culture Trust: {CULTURE_SCORE}\n\nHighest Theme: {HIGHEST_THEME} ({HIGHEST_THEME_SCORE})\nLowest Theme: {LOWEST_THEME} ({LOWEST_THEME_SCORE})\n\nWrite a concise 3-paragraph executive summary that:\n1. Summarizes the overall culture health and strengths\n2. Identifies the most critical area for improvement\n3. Provides strategic recommendations for the leadership team\n\nKeep it concise, data-driven, and actionable.";
    } else if (promptType === 'certification') {
      promptText = "Evaluate the following organization's PulseScore metrics for certification eligibility:\n\nOverall PulseScore: {SCORE}/100\nEmotion Index: {EMOTION_SCORE}/100\nEngagement Stability: {ENGAGEMENT_SCORE}/100\nCulture Trust: {CULTURE_SCORE}/100\n\nCertification requires:\n1. Overall PulseScore of 85+ for Pulse Certified™ status\n2. No individual category below 75\n3. At least 60% survey participation rate\n\nDetermine if the organization qualifies for certification, and provide a detailed justification for your decision with specific recommendations for improvement where needed.";
    }
    
    navigator.clipboard.writeText(promptText);
    
    toast({
      title: "Prompt copied!",
      description: "AI prompt template has been copied to clipboard.",
    });
  };

  const handleProcessFeedback = () => {
    if (!feedbackInput.trim()) {
      toast({
        title: "Input required",
        description: "Please enter feedback text to process.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProgressValue(0);

    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProgressValue(prev => {
        const newValue = prev + 10;
        if (newValue >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            toast({
              title: "Feedback processed!",
              description: "Sentiment analysis and theme extraction complete.",
            });
          }, 500);
          return 100;
        }
        return newValue;
      });
    }, 300);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl mb-4">AI Prompt Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="feedback">
          <TabsList className="mb-4">
            <TabsTrigger value="feedback">Feedback Synthesis</TabsTrigger>
            <TabsTrigger value="open-ended">Open-Ended Analysis</TabsTrigger>
            <TabsTrigger value="process">Process Feedback</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
            <TabsTrigger value="executive">Executive Summary</TabsTrigger>
            <TabsTrigger value="certification">Certification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feedback" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => handleCopyPrompt('feedback')} variant="outline" size="sm">
                Copy Prompt
              </Button>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Feedback Synthesis Prompt</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">
{`Analyze the following workplace survey responses and provide:
1. A summary of key themes and sentiment
2. Top 3 strengths identified
3. Top 3 areas for improvement
4. 1-2 notable quotes that represent the overall sentiment
5. 3 specific, actionable recommendations

Survey responses:
{SURVEY_RESPONSES_JSON}

Format the response as JSON with the following structure:
{
  "summary": "overall summary text",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvementAreas": ["area 1", "area 2", "area 3"],
  "notableQuotes": ["quote 1", "quote 2"],
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
}`}
              </pre>
            </div>
          </TabsContent>
          
          <TabsContent value="open-ended" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => handleCopyPrompt('open-ended')} variant="outline" size="sm">
                Copy Prompt
              </Button>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Open-Ended Feedback Synthesis</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">
{`You are an organizational psychologist summarizing employee feedback.
Input: A list of open-ended responses to a workplace survey.
Task: Identify 3 key themes and rate the overall sentiment (Positive, Neutral, or Negative).

Survey responses:
{OPEN_ENDED_RESPONSES}

Return:
1. Key Themes (with supporting quotes)
2. Summary Tone
3. One-sentence cultural insight

Format your response like this:
---
Themes:
- Leadership Transparency: "Leaders are approachable and honest."
- Growth Concerns: "There aren't enough development paths."
- Team Spirit: "My team feels like a family."

Sentiment: Neutral

Insight: While team culture is strong, there's concern around leadership and career growth.
---`}
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="process" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Process Open-Ended Feedback</h3>
              <p className="text-sm text-gray-600 mb-4">
                Enter free-text feedback to extract sentiment and themes using our AI analysis engine.
              </p>
              
              <Textarea 
                placeholder="Enter survey feedback text here..." 
                className="min-h-[120px] mb-4"
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                disabled={isProcessing}
              />
              
              {isProcessing && (
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">Processing feedback...</p>
                  <Progress value={progressValue} className="h-2" />
                </div>
              )}
              
              <Button 
                onClick={handleProcessFeedback} 
                className="w-full bg-pulse-gradient" 
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Analyze Feedback"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="sentiment" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => handleCopyPrompt('sentiment')} variant="outline" size="sm">
                Copy Prompt
              </Button>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Text Response Sentiment Analysis Prompt</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">
{`Analyze the sentiment and key themes in this workplace survey response:

"{TEXT_RESPONSE}"

Provide the following:
1. A sentiment score from 0 (extremely negative) to 100 (extremely positive)
2. The primary emotion expressed (e.g., satisfaction, frustration, hope)
3. Key themes mentioned (e.g., work-life balance, management, compensation)
4. Any action items implied in the feedback

Format the response as JSON.`}
              </pre>
            </div>
          </TabsContent>
          
          <TabsContent value="executive" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => handleCopyPrompt('executive')} variant="outline" size="sm">
                Copy Prompt
              </Button>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Executive Summary Prompt</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">
{`Generate an executive summary of this organization's PulseScore™ results:

Overall Score: {SCORE}/100
Tier: {TIER_LABEL}
Category Scores:
- Emotion Index: {EMOTION_SCORE}
- Engagement Stability: {ENGAGEMENT_SCORE}
- Culture Trust: {CULTURE_SCORE}

Highest Theme: {HIGHEST_THEME} ({HIGHEST_THEME_SCORE})
Lowest Theme: {LOWEST_THEME} ({LOWEST_THEME_SCORE})

Write a concise 3-paragraph executive summary that:
1. Summarizes the overall culture health and strengths
2. Identifies the most critical area for improvement
3. Provides strategic recommendations for the leadership team

Keep it concise, data-driven, and actionable.`}
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="certification" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => handleCopyPrompt('certification')} variant="outline" size="sm">
                Copy Prompt
              </Button>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Certification Eligibility Prompt</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">
{`Evaluate the following organization's PulseScore metrics for certification eligibility:

Overall PulseScore: {SCORE}/100
Emotion Index: {EMOTION_SCORE}/100
Engagement Stability: {ENGAGEMENT_SCORE}/100
Culture Trust: {CULTURE_SCORE}/100

Certification requires:
1. Overall PulseScore of 85+ for Pulse Certified™ status
2. No individual category below 75
3. At least 60% survey participation rate

Determine if the organization qualifies for certification, and provide a detailed justification for your decision with specific recommendations for improvement where needed.`}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PromptsContent;
