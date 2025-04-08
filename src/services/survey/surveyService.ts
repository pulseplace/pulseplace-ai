
import { supabase } from '@/integrations/supabase/client';
import { createSurveyResponse } from './surveyResponseService';
import { Survey, CreateSurveyParams } from './types';

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
      const { title, description = '', department = null, is_anonymous = true } = params;
      
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
          is_anonymous,
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
  }
};

export const { createSurvey } = surveyService;
