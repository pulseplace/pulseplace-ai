
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface CategoryScore {
  category: string;
  score: number;
  weight: number;
}

export interface SentimentResponse {
  question: string;
  response: string;
  sentiment: "positive" | "neutral" | "negative";
}

export interface SentimentData {
  category: string;
  score: number;
  responses: SentimentResponse[];
}

export interface InsightRequest {
  companyName: string;
  departmentName?: string;
  overallScore: number;
  categoryScores: CategoryScore[];
  sentimentData: SentimentData[];
  certificationType: string;
  responseCount: number;
  previousScore?: number;
}

export interface InsightResponse {
  summary: string;
  strengths: string[];
  opportunities: string[];
  actionItems: string[];
  certificateText: string;
}

/**
 * Service for generating AI insights from survey data
 */
export const insightsService = {
  /**
   * Generates insights from survey data using the LLM
   */
  generateInsights: async (data: InsightRequest): Promise<InsightResponse> => {
    try {
      console.log('Generating insights for', data.companyName);
      
      // Call the Supabase Edge Function
      const { data: response, error } = await supabase.functions.invoke('generate-insights', {
        body: data
      });
      
      if (error) {
        console.error('Insights service error:', error);
        toast.error(`Failed to generate insights: ${error.message}`);
        throw new Error(error.message || 'Failed to generate insights');
      }
      
      console.log('Insights generated successfully:', response);
      return response as InsightResponse;
    } catch (error) {
      console.error('Unexpected error in insights service:', error);
      toast.error('Failed to generate insights. Please try again later.');
      throw error;
    }
  },
  
  /**
   * Generates a test insight to verify the LLM integration is working
   */
  generateTestInsight: async (): Promise<InsightResponse> => {
    try {
      const testData: InsightRequest = {
        companyName: "Tayana Solutions",
        departmentName: "Engineering",
        overallScore: 82,
        certificationType: "Pulse Certified",
        responseCount: 42,
        categoryScores: [
          { category: "trust_safety", score: 85, weight: 0.4 },
          { category: "engagement_stability", score: 78, weight: 0.3 },
          { category: "culture_belonging", score: 84, weight: 0.3 }
        ],
        sentimentData: [
          {
            category: "trust_safety",
            score: 85,
            responses: [
              {
                question: "I trust the leadership to make good decisions",
                response: "Leadership is very transparent about company decisions",
                sentiment: "positive"
              },
              {
                question: "I feel safe expressing my opinions",
                response: "Sometimes I'm hesitant to speak up in meetings",
                sentiment: "negative"
              },
              {
                question: "My manager supports my professional development",
                response: "My manager regularly checks in about my career goals",
                sentiment: "positive"
              }
            ]
          },
          {
            category: "engagement_stability",
            score: 78,
            responses: [
              {
                question: "I feel engaged with my work",
                response: "My projects are challenging and interesting",
                sentiment: "positive"
              },
              {
                question: "I have a good work-life balance",
                response: "I often work late to meet deadlines",
                sentiment: "negative"
              },
              {
                question: "I see myself working here in two years",
                response: "I'm happy with my role and the company culture",
                sentiment: "positive"
              }
            ]
          },
          {
            category: "culture_belonging",
            score: 84,
            responses: [
              {
                question: "I feel like I belong at this company",
                response: "The company values align with my personal values",
                sentiment: "positive"
              },
              {
                question: "My team celebrates diverse perspectives",
                response: "Our team actively seeks out different viewpoints",
                sentiment: "positive"
              },
              {
                question: "Company events are inclusive",
                response: "Some events are scheduled at times that are difficult for parents",
                sentiment: "negative"
              }
            ]
          }
        ]
      };
      
      return await insightsService.generateInsights(testData);
    } catch (error) {
      console.error('Test insight error:', error);
      throw error;
    }
  }
};
