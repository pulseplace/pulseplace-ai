
import { supabase } from '@/integrations/supabase/client';
import { ProcessedSurveyResponse } from './types';

export const surveyService = {
  async processSurveyResponse(surveyId: string, userId: string, responses: any): Promise<ProcessedSurveyResponse> {
    try {
      console.log(`Processing survey response for user ${userId} and survey ${surveyId}`);
      
      // Group responses by theme
      const themeResponses: Record<string, number[]> = {
        "Trust & Safety": [],
        "Engagement": [],
        "Culture": [],
        "Growth & Development": [],
        "Wellbeing": []
      };
      
      // Process each response and categorize by theme
      Object.entries(responses).forEach(([questionId, response]) => {
        // In a real implementation, this would map question IDs to themes
        // For now, we'll use a simple mapping based on question ID prefix
        let theme = "Culture"; // Default theme
        
        if (questionId.startsWith('trust')) {
          theme = "Trust & Safety";
        } else if (questionId.startsWith('engage')) {
          theme = "Engagement";
        } else if (questionId.startsWith('growth')) {
          theme = "Growth & Development";
        } else if (questionId.startsWith('wellbeing')) {
          theme = "Wellbeing";
        }
        
        // Add the numeric response to the theme array (if it's a number)
        const numericResponse = typeof response === 'number' ? response : 
                               (typeof response === 'string' && !isNaN(parseFloat(response))) ? 
                               parseFloat(response) : null;
        
        if (numericResponse !== null) {
          themeResponses[theme].push(numericResponse);
        }
      });
      
      // Calculate average score for each theme
      const themeScores = Object.entries(themeResponses).map(([theme, scores]) => {
        // Calculate average score on a 0-100 scale
        const average = scores.length > 0 ? 
          Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 20) : 0;
        
        return { theme, score: average };
      });
      
      // Calculate overall score (average of theme scores)
      const overallScore = themeScores.length > 0 ?
        Math.round(themeScores.reduce((sum, theme) => sum + theme.score, 0) / themeScores.length) : 0;
      
      // Basic sentiment analysis - in a real implementation, this would use NLP
      // Just a placeholder for now
      const sentimentScore = Math.min(100, Math.max(0, overallScore + Math.floor(Math.random() * 20) - 10));
      
      console.log(`Survey response processed. Overall score: ${overallScore}, Sentiment: ${sentimentScore}`);
      
      // Generate a processed response
      const processed: ProcessedSurveyResponse = {
        overallScore,
        themeScores,
        sentimentScore
      };
      
      // Store the processed response in the database
      const { error } = await supabase
        .from('survey_responses')
        .insert({
          survey_id: surveyId,
          user_id: userId,
          responses: responses,
          pulse_score: processed,
          sentiment_score: sentimentScore
        });
      
      if (error) throw error;
      
      console.log(`Survey response saved to database successfully`);
      
      return processed;
    } catch (error) {
      console.error('Error processing survey response:', error);
      throw error;
    }
  }
};
