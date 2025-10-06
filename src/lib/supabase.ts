import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      datasets: {
        Row: {
          id: string;
          name: string;
          file_name: string;
          file_size: number;
          row_count: number;
          column_mapping: Record<string, unknown>;
          uploaded_by: string | null;
          uploaded_at: string;
          status: string;
        };
        Insert: {
          id?: string;
          name: string;
          file_name: string;
          file_size?: number;
          row_count?: number;
          column_mapping?: Record<string, unknown>;
          uploaded_by?: string | null;
          uploaded_at?: string;
          status?: string;
        };
        Update: {
          id?: string;
          name?: string;
          file_name?: string;
          file_size?: number;
          row_count?: number;
          column_mapping?: Record<string, unknown>;
          uploaded_by?: string | null;
          uploaded_at?: string;
          status?: string;
        };
      };
      reports: {
        Row: {
          id: string;
          name: string;
          description: string;
          report_type: string;
          filters: Record<string, unknown>;
          schedule: string;
          last_generated: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string;
          report_type?: string;
          filters?: Record<string, unknown>;
          schedule?: string;
          last_generated?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          report_type?: string;
          filters?: Record<string, unknown>;
          schedule?: string;
          last_generated?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
      };
      alerts: {
        Row: {
          id: string;
          title: string;
          message: string;
          severity: string;
          category: string;
          is_read: boolean;
          triggered_at: string;
          metadata: Record<string, unknown>;
        };
        Insert: {
          id?: string;
          title: string;
          message: string;
          severity?: string;
          category?: string;
          is_read?: boolean;
          triggered_at?: string;
          metadata?: Record<string, unknown>;
        };
        Update: {
          id?: string;
          title?: string;
          message?: string;
          severity?: string;
          category?: string;
          is_read?: boolean;
          triggered_at?: string;
          metadata?: Record<string, unknown>;
        };
      };
      sales_data: {
        Row: {
          id: string;
          date: string;
          category: string;
          region: string;
          revenue: number;
          units_sold: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          category: string;
          region: string;
          revenue?: number;
          units_sold?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          date?: string;
          category?: string;
          region?: string;
          revenue?: number;
          units_sold?: number;
          created_at?: string;
        };
      };
    };
  };
};
