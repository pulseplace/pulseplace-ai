export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      demo_bookings: {
        Row: {
          created_at: string | null
          email: string | null
          event_type: string | null
          id: string
          name: string | null
          scheduled_time: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          event_type?: string | null
          id?: string
          name?: string | null
          scheduled_time?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          event_type?: string | null
          id?: string
          name?: string | null
          scheduled_time?: string | null
        }
        Relationships: []
      }
      lovable_tasks: {
        Row: {
          assigned_to: string | null
          created_at: string
          description: string | null
          error_message: string | null
          execution_log: string | null
          id: string
          priority: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          error_message?: string | null
          execution_log?: string | null
          id?: string
          priority?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          error_message?: string | null
          execution_log?: string | null
          id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      mailchimp_events: {
        Row: {
          confirmed_at: string | null
          email: string | null
          event_type: string
          id: string
          list_id: string | null
          processed_at: string
          raw_data: string | null
          timestamp: string
        }
        Insert: {
          confirmed_at?: string | null
          email?: string | null
          event_type: string
          id?: string
          list_id?: string | null
          processed_at?: string
          raw_data?: string | null
          timestamp?: string
        }
        Update: {
          confirmed_at?: string | null
          email?: string | null
          event_type?: string
          id?: string
          list_id?: string | null
          processed_at?: string
          raw_data?: string | null
          timestamp?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company: string | null
          confirmed_opt_in: boolean | null
          created_at: string | null
          department: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          mailchimp_tags: string[] | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          confirmed_opt_in?: boolean | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          mailchimp_tags?: string[] | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          confirmed_opt_in?: boolean | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          mailchimp_tags?: string[] | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pulsebot_feedback: {
        Row: {
          feedback_type: string | null
          id: string
          message: string
          timestamp: string | null
          user_identifier: string | null
        }
        Insert: {
          feedback_type?: string | null
          id?: string
          message: string
          timestamp?: string | null
          user_identifier?: string | null
        }
        Update: {
          feedback_type?: string | null
          id?: string
          message?: string
          timestamp?: string | null
          user_identifier?: string | null
        }
        Relationships: []
      }
      pulsebot_logs: {
        Row: {
          avatar_state: string | null
          bot_reply: string | null
          created_at: string | null
          id: string
          language: string | null
          session_id: string | null
          user_message: string | null
        }
        Insert: {
          avatar_state?: string | null
          bot_reply?: string | null
          created_at?: string | null
          id?: string
          language?: string | null
          session_id?: string | null
          user_message?: string | null
        }
        Update: {
          avatar_state?: string | null
          bot_reply?: string | null
          created_at?: string | null
          id?: string
          language?: string | null
          session_id?: string | null
          user_message?: string | null
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
