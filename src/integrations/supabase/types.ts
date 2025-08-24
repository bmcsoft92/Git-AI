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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_type: string | null
          created_at: string
          id: string
          lead_id: string | null
          notes: string | null
          roi_calculation_id: string | null
          status: string | null
          updated_at: string
          user_email: string
          user_name: string
          user_phone: string | null
        }
        Insert: {
          appointment_date: string
          appointment_type?: string | null
          created_at?: string
          id?: string
          lead_id?: string | null
          notes?: string | null
          roi_calculation_id?: string | null
          status?: string | null
          updated_at?: string
          user_email: string
          user_name: string
          user_phone?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_type?: string | null
          created_at?: string
          id?: string
          lead_id?: string | null
          notes?: string | null
          roi_calculation_id?: string | null
          status?: string | null
          updated_at?: string
          user_email?: string
          user_name?: string
          user_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_roi_calculation_id_fkey"
            columns: ["roi_calculation_id"]
            isOneToOne: false
            referencedRelation: "roi_calculations"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          lead_id: string | null
          message: string
          name: string
          phone: string | null
          source: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          lead_id?: string | null
          message: string
          name: string
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          lead_id?: string | null
          message?: string
          name?: string
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_messages_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          annual_savings: number | null
          business_type: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          last_contact_date: string | null
          name: string | null
          next_followup_date: string | null
          notes: string | null
          phone: string | null
          roi_potential: number | null
          score: string | null
          source: string | null
          status: Database["public"]["Enums"]["lead_status"]
          team_size: string | null
          updated_at: string
        }
        Insert: {
          annual_savings?: number | null
          business_type?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          last_contact_date?: string | null
          name?: string | null
          next_followup_date?: string | null
          notes?: string | null
          phone?: string | null
          roi_potential?: number | null
          score?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          team_size?: string | null
          updated_at?: string
        }
        Update: {
          annual_savings?: number | null
          business_type?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          last_contact_date?: string | null
          name?: string | null
          next_followup_date?: string | null
          notes?: string | null
          phone?: string | null
          roi_potential?: number | null
          score?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          team_size?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      roi_calculations: {
        Row: {
          annual_savings: number
          automation_goals: string[] | null
          budget_range: string | null
          business_type: string | null
          created_at: string
          current_tools: string[] | null
          employees: number
          hourly_rate: number
          hours_per_week: number
          id: string
          investment: number
          lead_id: string | null
          main_activities: string[] | null
          pain_points: string[] | null
          priority_processes: string[] | null
          priority_projects: Json | null
          repetitive_tasks: string[] | null
          roi_percentage: number
          success_metrics: string[] | null
          team_size: string | null
          technical_level: string | null
          timeline: string | null
          updated_at: string
          user_email: string
          user_name: string | null
          user_phone: string | null
        }
        Insert: {
          annual_savings: number
          automation_goals?: string[] | null
          budget_range?: string | null
          business_type?: string | null
          created_at?: string
          current_tools?: string[] | null
          employees: number
          hourly_rate: number
          hours_per_week: number
          id?: string
          investment: number
          lead_id?: string | null
          main_activities?: string[] | null
          pain_points?: string[] | null
          priority_processes?: string[] | null
          priority_projects?: Json | null
          repetitive_tasks?: string[] | null
          roi_percentage: number
          success_metrics?: string[] | null
          team_size?: string | null
          technical_level?: string | null
          timeline?: string | null
          updated_at?: string
          user_email: string
          user_name?: string | null
          user_phone?: string | null
        }
        Update: {
          annual_savings?: number
          automation_goals?: string[] | null
          budget_range?: string | null
          business_type?: string | null
          created_at?: string
          current_tools?: string[] | null
          employees?: number
          hourly_rate?: number
          hours_per_week?: number
          id?: string
          investment?: number
          lead_id?: string | null
          main_activities?: string[] | null
          pain_points?: string[] | null
          priority_processes?: string[] | null
          priority_projects?: Json | null
          repetitive_tasks?: string[] | null
          roi_percentage?: number
          success_metrics?: string[] | null
          team_size?: string | null
          technical_level?: string | null
          timeline?: string | null
          updated_at?: string
          user_email?: string
          user_name?: string | null
          user_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roi_calculations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_lead_score: {
        Args: {
          p_annual_savings?: number
          p_budget_range?: string
          p_roi_potential?: number
        }
        Returns: string
      }
      upsert_lead: {
        Args:
          | {
              p_annual_savings?: number
              p_budget_range?: string
              p_business_type?: string
              p_company?: string
              p_email: string
              p_name?: string
              p_phone?: string
              p_roi_potential?: number
              p_status?: Database["public"]["Enums"]["lead_status"]
              p_team_size?: string
            }
          | {
              p_annual_savings?: number
              p_business_type?: string
              p_company?: string
              p_email: string
              p_name?: string
              p_phone?: string
              p_roi_potential?: number
              p_status?: Database["public"]["Enums"]["lead_status"]
              p_team_size?: string
            }
        Returns: string
      }
    }
    Enums: {
      lead_status:
        | "nouveau_lead"
        | "diagnostic_envoye"
        | "rdv_demande"
        | "rdv_confirme"
        | "proposition_envoyee"
        | "client_signe"
        | "perdu"
        | "rdv_en_attente_confirmation"
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
    Enums: {
      lead_status: [
        "nouveau_lead",
        "diagnostic_envoye",
        "rdv_demande",
        "rdv_confirme",
        "proposition_envoyee",
        "client_signe",
        "perdu",
        "rdv_en_attente_confirmation",
      ],
    },
  },
} as const
