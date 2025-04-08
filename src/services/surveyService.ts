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

export interface CreateSurveyParams {
  title: string;
  description?: string;
  department?: string;
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
  
  async createSurvey(params: CreateSurveyParams): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const { title, description = '', department = null } = params;
      
      const defaultQuestions = [
        {
          id: 'q1',
          text: 'How would you rate your work-life balance?',
          type: 'scale',
          options: [1, 2, 3, 4, 5],
          theme: 'Well-being'
        },
        {
          id: 'q2',
          text: 'How satisfied are you with the team collaboration?',
          type: 'scale',
          options: [1, 2, 3, 4, 5],
          theme: 'Teamwork'
        },
        {
          id: 'q3',
          text: 'Do you feel recognized for your contributions?',
          type: 'scale',
          options: [1, 2, 3, 4, 5],
          theme: 'Recognition'
        }
      ];
      
      const { data, error } = await supabase
        .from('pulse_surveys')
        .insert({
          title,
          description,
          department,
          is_active: true,
          questions: defaultQuestions,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select('id')
        .single();
      
      if (error) throw error;
      
      return {
        success: true,
        id: data.id
      };
    } catch (error: any) {
      console.error('Error creating survey:', error);
      return {
        success: false,
        error: error.message || 'Failed to create survey'
      };
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
      
      const processedResponse = await teamAdminService.processSurveyResponse(
        response.surveyId,
        response.userId,
        response.responses
      );
      
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
      const { data: teamMember, error: teamMemberError } = await supabase
        .from('team_members')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (teamMemberError) {
        console.warn('Team member not found for user:', userId);
        return false;
      }
      
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

export const { createSurvey } = surveyService;
