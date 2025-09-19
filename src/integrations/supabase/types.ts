export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      daily_logs: {
        Row: {
          created_at: string | null
          date: string
          digestion_rating: number | null
          energy_level: number | null
          id: string
          mood_rating: number | null
          notes: string | null
          user_id: string
          weight_kg: number | null
        }
        Insert: {
          created_at?: string | null
          date?: string
          digestion_rating?: number | null
          energy_level?: number | null
          id?: string
          mood_rating?: number | null
          notes?: string | null
          user_id: string
          weight_kg?: number | null
        }
        Update: {
          created_at?: string | null
          date?: string
          digestion_rating?: number | null
          energy_level?: number | null
          id?: string
          mood_rating?: number | null
          notes?: string | null
          user_id?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      diet_entries: {
        Row: {
          calories: number | null
          created_at: string | null
          date: string
          doctor_notes: string | null
          food_name: string
          id: string
          meal_type: string
          properties: Json | null
          rasa: string[] | null
          user_id: string
        }
        Insert: {
          calories?: number | null
          created_at?: string | null
          date: string
          doctor_notes?: string | null
          food_name: string
          id?: string
          meal_type: string
          properties?: Json | null
          rasa?: string[] | null
          user_id: string
        }
        Update: {
          calories?: number | null
          created_at?: string | null
          date?: string
          doctor_notes?: string | null
          food_name?: string
          id?: string
          meal_type?: string
          properties?: Json | null
          rasa?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      doctor_messages: {
        Row: {
          created_at: string | null
          doctor_id: string | null
          id: string
          is_read: boolean | null
          message: string
          patient_id: string
        }
        Insert: {
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          patient_id: string
        }
        Update: {
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          patient_id?: string
        }
        Relationships: []
      }
      lifestyle_habits: {
        Row: {
          category: string | null
          completed_today: boolean | null
          created_at: string | null
          habit_name: string
          id: string
          last_completed: string | null
          streak_count: number | null
          user_id: string
        }
        Insert: {
          category?: string | null
          completed_today?: boolean | null
          created_at?: string | null
          habit_name: string
          id?: string
          last_completed?: string | null
          streak_count?: number | null
          user_id: string
        }
        Update: {
          category?: string | null
          completed_today?: boolean | null
          created_at?: string | null
          habit_name?: string
          id?: string
          last_completed?: string | null
          streak_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          allergies: string[] | null
          created_at: string | null
          dominant_dosha: string | null
          dosha_scores: Json | null
          email: string | null
          food_preferences: string[] | null
          full_name: string | null
          height_cm: number | null
          id: string
          medical_conditions: string[] | null
          questionnaire_completed: boolean | null
          updated_at: string | null
          user_id: string
          weight_kg: number | null
        }
        Insert: {
          age?: number | null
          allergies?: string[] | null
          created_at?: string | null
          dominant_dosha?: string | null
          dosha_scores?: Json | null
          email?: string | null
          food_preferences?: string[] | null
          full_name?: string | null
          height_cm?: number | null
          id?: string
          medical_conditions?: string[] | null
          questionnaire_completed?: boolean | null
          updated_at?: string | null
          user_id: string
          weight_kg?: number | null
        }
        Update: {
          age?: number | null
          allergies?: string[] | null
          created_at?: string | null
          dominant_dosha?: string | null
          dosha_scores?: Json | null
          email?: string | null
          food_preferences?: string[] | null
          full_name?: string | null
          height_cm?: number | null
          id?: string
          medical_conditions?: string[] | null
          questionnaire_completed?: boolean | null
          updated_at?: string | null
          user_id?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      remedies: {
        Row: {
          completed_today: boolean | null
          condition: string | null
          created_at: string | null
          duration: string | null
          id: string
          ingredients: string[] | null
          instructions: string
          last_completed: string | null
          timing: string | null
          title: string
          user_id: string
        }
        Insert: {
          completed_today?: boolean | null
          condition?: string | null
          created_at?: string | null
          duration?: string | null
          id?: string
          ingredients?: string[] | null
          instructions: string
          last_completed?: string | null
          timing?: string | null
          title: string
          user_id: string
        }
        Update: {
          completed_today?: boolean | null
          condition?: string | null
          created_at?: string | null
          duration?: string | null
          id?: string
          ingredients?: string[] | null
          instructions?: string
          last_completed?: string | null
          timing?: string | null
          title?: string
          user_id?: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
