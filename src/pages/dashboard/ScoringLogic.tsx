
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PulseScoreCalculator from '@/components/dashboard/PulseScoreCalculator';
import { useToast } from "@/hooks/use-toast";
import { getFeedbackSynthesisPrompt } from '@/utils/scoring';
import { Button } from "@/components/ui/button";

const ScoringLogic = () => {
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
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">PulseScore™ Methodology</h1>
      
      <Tabs defaultValue="calculator">
        <TabsList className="mb-6">
          <TabsTrigger value="calculator">Score Calculator</TabsTrigger>
          <TabsTrigger value="schema">Scoring Schema</TabsTrigger>
          <TabsTrigger value="prompts">AI Prompts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator">
          <PulseScoreCalculator />
        </TabsContent>
        
        <TabsContent value="schema">
          <Card>
            <CardHeader>
              <CardTitle>PulseScore Calculation Schema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-semibold mb-2">Core Components</h3>
                  <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`{
  "thematic_buckets": [
    "trust_in_leadership",
    "psychological_safety",
    "inclusion_belonging",
    "motivation_fulfillment",
    "mission_alignment",
    "engagement_continuity"
  ],
  
  "categories": {
    "emotion_index": {
      "weight": 0.4,
      "themes": ["inclusion_belonging", "motivation_fulfillment"]
    },
    "engagement_stability": {
      "weight": 0.3,
      "themes": ["mission_alignment", "engagement_continuity"]
    },
    "culture_trust": {
      "weight": 0.3,
      "themes": ["trust_in_leadership", "psychological_safety"]
    }
  },
  
  "certification_tiers": {
    "pulse_certified": {
      "min_score": 85,
      "label": "Pulse Certified™ – Lovable Workplace"
    },
    "growth_culture": {
      "min_score": 70,
      "label": "Growth Culture – Building Excellence"
    },
    "developing": {
      "min_score": 50,
      "label": "Developing – Needs Improvement"
    },
    "at_risk": {
      "min_score": 0,
      "label": "At-Risk – Critical Culture Risk"
    }
  }
}`}
                  </pre>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-semibold mb-2">Normalization Logic</h3>
                  <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`{
  "response_normalization": {
    "likert_5point": {
      "1": 0,
      "2": 25,
      "3": 50,
      "4": 75,
      "5": 100
    },
    "emoji_scale": {
      "very_negative": 0,
      "negative": 25,
      "neutral": 50,
      "positive": 75,
      "very_positive": 100
    },
    "binary": {
      "no": 0,
      "yes": 100
    },
    "text": "Uses sentiment analysis to derive a 0-100 score"
  }
}`}
                  </pre>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-semibold mb-2">Scoring Algorithm Pseudocode</h3>
                  <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`function calculatePulseScore(responses):
  // 1. Normalize all responses to 0-100 scale
  normalized_responses = normalize_responses(responses)
  
  // 2. Calculate theme scores
  theme_scores = {}
  for each theme in thematic_buckets:
    theme_questions = filter questions by theme
    theme_scores[theme] = average of normalized_responses for theme_questions
  
  // 3. Calculate category scores
  category_scores = {}
  for each category, config in categories:
    category_themes = config.themes
    category_scores[category] = average of theme_scores for category_themes
  
  // 4. Calculate overall weighted score
  overall_score = 0
  for each category, score in category_scores:
    weight = categories[category].weight
    overall_score += score * weight
  
  // 5. Determine certification tier
  tier = determine_tier(overall_score)
  
  // 6. Generate insights and recommendations
  insights = generate_insights(theme_scores, category_scores)
  recommendations = generate_recommendations(theme_scores, overall_score)
  
  return {
    overall_score,
    category_scores,
    theme_scores,
    tier,
    insights,
    recommendations
  }`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prompts">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScoringLogic;
