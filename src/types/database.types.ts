export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          role: string | null
          company: string | null
          department: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          role?: string | null
          company?: string | null
          department?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          role?: string | null
          company?: string | null
          department?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pulse_surveys: {
        Row: {
          id: string
          title: string
          description: string | null
          created_by: string | null
          company: string | null
          department: string | null
          created_at: string
          updated_at: string
          is_active: boolean
          is_anonymous: boolean
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          created_by?: string | null
          company?: string | null
          department?: string | null
          created_at?: string
          updated_at?: string
          is_active?: boolean
          is_anonymous?: boolean
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          created_by?: string | null
          company?: string | null
          department?: string | null
          created_at?: string
          updated_at?: string
          is_active?: boolean
          is_anonymous?: boolean
        }
      }
      survey_responses: {
        Row: {
          id: string
          survey_id: string
          user_id: string | null
          responses: Json
          sentiment_score: number | null
          pulse_score: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          survey_id: string
          user_id?: string | null
          responses: Json
          sentiment_score?: number | null
          pulse_score?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          survey_id?: string
          user_id?: string | null
          responses?: Json
          sentiment_score?: number | null
          pulse_score?: Json | null
          created_at?: string
        }
      }
      pulse_survey_responses: {
        Row: {
          id: string
          created_at: string
          responses: Json
          score: number | null
          email: string | null
          marketing_opt_in: boolean | null
        }
        Insert: {
          id?: string
          created_at?: string
          responses: Json
          score?: number | null
          email?: string | null
          marketing_opt_in?: boolean | null
        }
        Update: {
          id?: string
          created_at?: string
          responses?: Json
          score?: number | null
          email?: string | null
          marketing_opt_in?: boolean | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Insertables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updateables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

export type DebugLog = {
  id: string;
  dateLogged: Date;
  component: string;
  description: string;
  severity: 'Critical' | 'Major' | 'Minor';
  status: 'Open' | 'In Progress' | 'Fixed';
  loggedBy: string;
  fixLink?: string;
};
