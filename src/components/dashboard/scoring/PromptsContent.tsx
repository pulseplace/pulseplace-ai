
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getFeedbackSynthesisPrompt } from '@/utils/scoring';

const PromptsContent = () => {
  const { toast } = useToast();
  
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(getFeedbackSynthesisPrompt({
      "sampleResponse1": "I love the collaborative culture here, but sometimes feel meetings could be more efficient.",
      "sampleResponse2": "The leadership team is transparent but we could use more clarity on career paths."
    }));
    
    toast({
      title: "Prompt copied!",
      description: "AI prompt template has been copied to clipboard.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>AI Prompt Templates</span>
          <Button onClick={handleCopyPrompt} variant="outline" size="sm">
            Copy Prompt
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptsContent;
