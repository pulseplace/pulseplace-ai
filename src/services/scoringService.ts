
import { db } from '@/integrations/firebase/client';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { calculatePulseScore } from '@/utils/scoring';

export interface CategoryScore {
  category: string;
  score: number;
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
      // In a real implementation, this would use more sophisticated calculations
      const overallScore = calculateMockPulseScore(responses);
      
      // Mock category scores for demonstration
      const categoryScores = [
        { category: "trust_safety", score: Math.round(overallScore * 0.9) },
        { category: "engagement_stability", score: Math.round(overallScore * 1.1) },
        { category: "culture_belonging", score: Math.round(overallScore * 0.95) }
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
 * Helper function to calculate a mock pulse score
 * In a real implementation, this would be more sophisticated
 */
function calculateMockPulseScore(responses: any[]): number {
  // Simple mock implementation - in real app would be more complex
  const baseScore = 65 + Math.floor(Math.random() * 20);
  const responseCount = responses.length;
  
  // Adjust score based on number of responses
  let adjustedScore = baseScore;
  if (responseCount > 10) {
    adjustedScore += 5;
  } else if (responseCount > 5) {
    adjustedScore += 2;
  }
  
  // Ensure score is within valid range
  return Math.min(100, Math.max(0, adjustedScore));
}
