
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SchemaContent = () => {
  return (
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
      "description": "Average score across all questions"
    },
    "engagement_stability": {
      "weight": 0.3,
      "description": "Average of engagement_continuity and motivation_fulfillment themes",
      "themes": ["motivation_fulfillment", "engagement_continuity"]
    },
    "culture_trust": {
      "weight": 0.3,
      "description": "Average of trust_in_leadership, psychological_safety, and inclusion_belonging themes",
      "themes": ["trust_in_leadership", "psychological_safety", "inclusion_belonging"]
    }
  },
  
  "pulse_score_formula": "0.4 * emotion_index + 0.3 * engagement_stability + 0.3 * culture_trust",
  
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
    if category == "emotion_index":
      category_scores[category] = average of ALL normalized_responses
    else:
      category_themes = config.themes
      category_scores[category] = average of theme_scores for category_themes
  
  // 4. Calculate overall weighted score
  overall_score = 0.4 * emotion_index + 0.3 * engagement_stability + 0.3 * culture_trust
  
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
  );
};

export default SchemaContent;
