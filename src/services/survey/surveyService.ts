
import { collection, doc, getDoc, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { Survey, CreateSurveyParams } from './types';

export const surveyService = {
  async getSurveys(): Promise<Survey[]> {
    try {
      const q = query(
        collection(db, 'pulse_surveys'),
        orderBy('created_at', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Survey[];
    } catch (error) {
      console.error('Error fetching surveys:', error);
      return [];
    }
  },
  
  async getSurveyById(surveyId: string): Promise<Survey | null> {
    try {
      const docRef = doc(db, 'pulse_surveys', surveyId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Survey;
      }
      
      return null;
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
      
      const docRef = await addDoc(collection(db, 'pulse_surveys'), {
        title,
        description,
        department,
        is_active: true,
        is_anonymous,
        questions: defaultQuestions,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
      return {
        success: true,
        id: docRef.id
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
