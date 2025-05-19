
import { db } from '@/integrations/firebase/client';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { SurveyTheme, ScoringCategory, PulseScoreTier } from '@/types/scoring.types';
import { calculatePulseScore } from '@/utils/survey-scoring';

export interface CategoryScore {
  category: string;
  score: number;
  weight: number; // Adding weight property to match insightsService
}

export interface SentimentData {
  category: string;
  score: number;
  responses: {
    question: string;
    response: string;
    sentiment: "positive" | "neutral" | "negative";
  }[];
}

/**
 * Service for calculating scores from survey responses
 */
export const scoringService = {
  /**
   * Calculate scores for a given survey
   */
  async calculateScores(surveyId: string): Promise<{
    overallScore: number;
    categoryScores: CategoryScore[];
    sentimentData: SentimentData[];
  }> {
    try {
      console.log(`Calculating scores for survey ${surveyId}`);
      
      // Get survey responses
      const responsesQuery = query(
        collection(db, 'responses'),
        where('surveyId', '==', surveyId)
      );
      
      const responsesSnapshot = await getDocs(responsesQuery);
      const responses = responsesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Get survey questions
      const surveyDoc = await getDoc(doc(db, 'surveys', surveyId));
      
      if (!surveyDoc.exists()) {
        throw new Error(`Survey ${surveyId} not found`);
      }
      
      const survey = {
        id: surveyDoc.id,
        ...surveyDoc.data()
      };
      
      // Calculate score using the utility function
      const overallScore = calculatePulseScore(responses);
      
      // Category weights matching the calculation specification
      const categoryWeights = {
        "trust_safety": 0.3,
        "engagement_stability": 0.3,
        "culture_belonging": 0.4
      };
      
      // Mock category scores for demonstration - now with weights
      const categoryScores: CategoryScore[] = [
        { category: "trust_safety", score: Math.round(overallScore * 0.9), weight: categoryWeights.trust_safety },
        { category: "engagement_stability", score: Math.round(overallScore * 1.1), weight: categoryWeights.engagement_stability },
        { category: "culture_belonging", score: Math.round(overallScore * 0.95), weight: categoryWeights.culture_belonging }
      ];
      
      // Mock sentiment data
      const sentimentData = [
        {
          category: "trust_safety",
          score: Math.round(overallScore * 0.9),
          responses: [
            {
              question: "I trust the leadership to make good decisions",
              response: "Leadership is very transparent about company decisions",
              sentiment: "positive"
            }
          ]
        },
        {
          category: "engagement_stability",
          score: Math.round(overallScore * 1.1),
          responses: [
            {
              question: "I feel engaged with my work",
              response: "My projects are challenging and interesting",
              sentiment: "positive"
            }
          ]
        }
      ] as SentimentData[];
      
      console.log(`Calculated overall score: ${overallScore}`);
      
      return {
        overallScore,
        categoryScores,
        sentimentData
      };
    } catch (error: any) {
      console.error('Error calculating scores:', error);
      throw error;
    }
  }
};

/**
 * Helper function to calculate a pulse score based on category scores
 * Implements the weighted logic: 40% Emotion + 30% Stability + 30% Trust
 */
export function calculateWeightedPulseScore(categoryScores: CategoryScore[]): number {
  // Map category names to their logical groups
  const categoryMapping: Record<string, string> = {
    "culture_belonging": "emotion",
    "engagement_stability": "stability",
    "trust_safety": "trust"
  };
  
  // Define weights for each logical group
  const groupWeights: Record<string, number> = {
    "emotion": 0.4,
    "stability": 0.3,
    "trust": 0.3
  };
  
  // Group scores by logical group
  const groupScores: Record<string, { sum: number; count: number }> = {
    "emotion": { sum: 0, count: 0 },
    "stability": { sum: 0, count: 0 },
    "trust": { sum: 0, count: 0 }
  };
  
  // Aggregate scores by group
  categoryScores.forEach(catScore => {
    const group = categoryMapping[catScore.category] || "other";
    if (groupScores[group]) {
      groupScores[group].sum += catScore.score;
      groupScores[group].count += 1;
    }
  });
  
  // Calculate weighted average
  let totalWeight = 0;
  let weightedSum = 0;
  
  Object.entries(groupScores).forEach(([group, data]) => {
    if (data.count > 0) {
      const avgScore = data.sum / data.count;
      const weight = groupWeights[group] || 0;
      weightedSum += avgScore * weight;
      totalWeight += weight;
    }
  });
  
  // Return final score (or default if no valid data)
  return totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) / 100 : 0;
}

/**
 * Determine certification tier based on overall score
 */
export function determineCertificationTier(score: number): PulseScoreTier {
  if (score >= 85) {
    return 'pulse_certified';
  } else if (score >= 70) {
    return 'emerging_culture';
  } else if (score >= 55) {
    return 'at_risk';
  } else {
    return 'intervention_advised';
  }
}
