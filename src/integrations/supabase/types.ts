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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          created_at: string | null
          excerpt: string | null
          gradient: string | null
          hero_variant: string | null
          id: string
          intro: string | null
          publish_date: string | null
          published: boolean | null
          rank: number | null
          read_time: string | null
          sections_json: Json | null
          slug: string
          source_url: string | null
          tag: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          excerpt?: string | null
          gradient?: string | null
          hero_variant?: string | null
          id?: string
          intro?: string | null
          publish_date?: string | null
          published?: boolean | null
          rank?: number | null
          read_time?: string | null
          sections_json?: Json | null
          slug: string
          source_url?: string | null
          tag?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          excerpt?: string | null
          gradient?: string | null
          hero_variant?: string | null
          id?: string
          intro?: string | null
          publish_date?: string | null
          published?: boolean | null
          rank?: number | null
          read_time?: string | null
          sections_json?: Json | null
          slug?: string
          source_url?: string | null
          tag?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cards: {
        Row: {
          applepay: boolean | null
          apply_url: string | null
          bonus: string | null
          categories: string[] | null
          color: string | null
          created_at: string | null
          currencies: string[] | null
          detail_json: Json | null
          display_json: Json | null
          fx: number | null
          geo: string | null
          id: string
          issue_rub: number | null
          kyc: string | null
          monthly_rub: number | null
          name: string
          on_main: number | null
          rank: number | null
          reviews: number | null
          score: number | null
          services: string[] | null
          slug: string
          term: string | null
          term_short: boolean | null
          three_ds: boolean | null
          topup: string | null
          topup_fee: number | null
          tx_fee_usd: number | null
          updated_at: string | null
        }
        Insert: {
          applepay?: boolean | null
          apply_url?: string | null
          bonus?: string | null
          categories?: string[] | null
          color?: string | null
          created_at?: string | null
          currencies?: string[] | null
          detail_json?: Json | null
          display_json?: Json | null
          fx?: number | null
          geo?: string | null
          id?: string
          issue_rub?: number | null
          kyc?: string | null
          monthly_rub?: number | null
          name: string
          on_main?: number | null
          rank?: number | null
          reviews?: number | null
          score?: number | null
          services?: string[] | null
          slug: string
          term?: string | null
          term_short?: boolean | null
          three_ds?: boolean | null
          topup?: string | null
          topup_fee?: number | null
          tx_fee_usd?: number | null
          updated_at?: string | null
        }
        Update: {
          applepay?: boolean | null
          apply_url?: string | null
          bonus?: string | null
          categories?: string[] | null
          color?: string | null
          created_at?: string | null
          currencies?: string[] | null
          detail_json?: Json | null
          display_json?: Json | null
          fx?: number | null
          geo?: string | null
          id?: string
          issue_rub?: number | null
          kyc?: string | null
          monthly_rub?: number | null
          name?: string
          on_main?: number | null
          rank?: number | null
          reviews?: number | null
          score?: number | null
          services?: string[] | null
          slug?: string
          term?: string | null
          term_short?: boolean | null
          three_ds?: boolean | null
          topup?: string | null
          topup_fee?: number | null
          tx_fee_usd?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      countries: {
        Row: {
          card_note: string | null
          category: string | null
          count_text: string | null
          created_at: string | null
          faq_json: Json | null
          flag: string | null
          gradient: string | null
          hero_title: string | null
          id: string
          list_text: string | null
          pill_text: string | null
          published: boolean | null
          quick_facts: Json | null
          rank: number | null
          sections_json: Json | null
          slug: string
          summary: string | null
          tips: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          card_note?: string | null
          category?: string | null
          count_text?: string | null
          created_at?: string | null
          faq_json?: Json | null
          flag?: string | null
          gradient?: string | null
          hero_title?: string | null
          id?: string
          list_text?: string | null
          pill_text?: string | null
          published?: boolean | null
          quick_facts?: Json | null
          rank?: number | null
          sections_json?: Json | null
          slug: string
          summary?: string | null
          tips?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          card_note?: string | null
          category?: string | null
          count_text?: string | null
          created_at?: string | null
          faq_json?: Json | null
          flag?: string | null
          gradient?: string | null
          hero_title?: string | null
          id?: string
          list_text?: string | null
          pill_text?: string | null
          published?: boolean | null
          quick_facts?: Json | null
          rank?: number | null
          sections_json?: Json | null
          slug?: string
          summary?: string | null
          tips?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string | null
          value_json: Json
        }
        Insert: {
          key: string
          updated_at?: string | null
          value_json: Json
        }
        Update: {
          key?: string
          updated_at?: string | null
          value_json?: Json
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
