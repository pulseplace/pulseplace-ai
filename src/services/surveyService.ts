
import { supabase } from '@/integrations/supabase/client';
import { teamAdminService, ProcessedSurveyResponse } from './teamAdminService';

export interface Survey {
  id: string;
  title: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  questions: any[];
}

export interface SurveyResponse {
  id?: string;
  surveyId: string;
  userId: string;
  responses: Record<string, any>;
  createdAt?: string;
}

export const surveyService = {
  async getSurveys(): Promise<Survey[]> {
    try {
      const { data, error } = await supabase
        .from('pulse_surveys')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error fetching surveys:', error);
      return [];
    }
  },
  
  async getSurveyById(surveyId: string): Promise<Survey | null> {
    try {
      const { data, error } = await supabase
        .from('pulse_surveys')
        .select('*')
        .eq('id', surveyId)
        .single();
      
      if (error) throw error;
      
      return data || null;
    } catch (error) {
      console.error(`Error fetching survey ${surveyId}:`, error);
      return null;
    }
  },
  
  async submitSurveyResponse(response: SurveyResponse): Promise<{
    success: boolean;
    data?: ProcessedSurveyResponse;
    error?: string;
  }> {
    try {
      if (!response.userId || !response.surveyId) {
        throw new Error('User ID and Survey ID are required');
      }
      
      // Process the survey response to calculate pulse scores
      const processedResponse = await teamAdminService.processSurveyResponse(
        response.surveyId,
        response.userId,
        response.responses
      );
      
      // Update the user's survey status to 'completed'
      await this.updateTeamMemberSurveyStatus(response.userId, 'completed');
      
      return {
        success: true,
        data: processedResponse
      };
    } catch (error: any) {
      console.error('Error submitting survey response:', error);
      return {
        success: false,
        error: error.message || 'Failed to submit survey response'
      };
    }
  },
  
  async updateTeamMemberSurveyStatus(userId: string, status: 'completed' | 'pending' | 'not_sent'): Promise<boolean> {
    try {
      // Get the team member ID from the user ID
      const { data: teamMember, error: teamMemberError } = await supabase
        .from('team_members')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (teamMemberError) {
        // Team member might not be found if the user is not in the team_members table
        console.warn('Team member not found for user:', userId);
        return false;
      }
      
      // Update the team member's survey status
      const { error: updateError } = await supabase
        .from('team_members')
        .update({ 
          surveyStatus: status,
          lastActive: new Date().toISOString()
        })
        .eq('id', teamMember.id);
      
      if (updateError) throw updateError;
      
      return true;
    } catch (error) {
      console.error('Error updating team member survey status:', error);
      return false;
    }
  },
  
  async getSurveyResponses(surveyId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('survey_responses')
        .select(`
          id,
          survey_id,
          user_id,
          responses,
          created_at,
          pulse_score,
          sentiment_score
        `)
        .eq('survey_id', surveyId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error(`Error fetching survey responses for ${surveyId}:`, error);
      return [];
    }
  }
};
