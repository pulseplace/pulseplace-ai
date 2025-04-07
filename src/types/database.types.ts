
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
        }
      }
      survey_responses: {
        Row: {
          id: string
          survey_id: string
          user_id: string | null
          responses: Json
          sentiment_score: number | null
          created_at: string
        }
        Insert: {
          id?: string
          survey_id: string
          user_id?: string | null
          responses: Json
          sentiment_score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          survey_id?: string
          user_id?: string | null
          responses?: Json
          sentiment_score?: number | null
          created_at?: string
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
