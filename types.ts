export interface Database {
  public: {
    Tables: {
      businesses: {
        Row: {
          id: string; slug: string; name: string; phone: string | null;
          email: string | null; address: string | null; city: string | null;
          country: string; timezone: string; currency: string;
          logo_url: string | null; brand_color: string | null;
          is_active: boolean; created_at: string; updated_at: string;
        };
        Insert: { id?: string; slug: string; name: string; phone?: string | null; email?: string | null; address?: string | null; city?: string | null; country?: string; timezone?: string; currency?: string; logo_url?: string | null; brand_color?: string | null; is_active?: boolean; };
        Update: { slug?: string; name?: string; phone?: string | null; email?: string | null; address?: string | null; city?: string | null; country?: string; timezone?: string; currency?: string; logo_url?: string | null; brand_color?: string | null; is_active?: boolean; };
      };
      employees: {
        Row: {
          id: string; business_id: string; slug: string; name: string;
          phone: string | null; email: string | null; color: string | null;
          role: "owner" | "manager" | "employee"; is_active: boolean;
          avatar_url: string | null; notes: string | null;
          created_at: string; updated_at: string;
        };
        Insert: { id?: string; business_id: string; slug: string; name: string; phone?: string | null; email?: string | null; color?: string | null; role?: "owner" | "manager" | "employee"; is_active?: boolean; avatar_url?: string | null; notes?: string | null; };
        Update: { slug?: string; name?: string; phone?: string | null; email?: string | null; color?: string | null; role?: "owner" | "manager" | "employee"; is_active?: boolean; avatar_url?: string | null; notes?: string | null; };
      };
      business_working_hours: {
        Row: {
          id: string; business_id: string; day_of_week: number;
          is_closed: boolean; open_time: string | null; close_time: string | null;
          created_at: string; updated_at: string;
        };
        Insert: { id?: string; business_id: string; day_of_week: number; is_closed?: boolean; open_time?: string | null; close_time?: string | null; };
        Update: { day_of_week?: number; is_closed?: boolean; open_time?: string | null; close_time?: string | null; };
      };
      employee_working_hours: {
        Row: {
          id: string; employee_id: string; business_id: string; day_of_week: number;
          is_closed: boolean; open_time: string | null; close_time: string | null;
          created_at: string; updated_at: string;
        };
        Insert: { id?: string; employee_id: string; business_id: string; day_of_week: number; is_closed?: boolean; open_time?: string | null; close_time?: string | null; };
        Update: { day_of_week?: number; is_closed?: boolean; open_time?: string | null; close_time?: string | null; };
      };
      employee_breaks: {
        Row: {
          id: string; employee_id: string; business_id: string; day_of_week: number;
          start_time: string; end_time: string; label: string | null;
          created_at: string; updated_at: string;
        };
        Insert: { id?: string; employee_id: string; business_id: string; day_of_week: number; start_time: string; end_time: string; label?: string | null; };
        Update: { day_of_week?: number; start_time?: string; end_time?: string; label?: string | null; };
      };
      employee_blocked_dates: {
        Row: {
          id: string; employee_id: string; business_id: string; blocked_date: string;
          blocked_from: string | null; blocked_until: string | null; reason: string | null;
          created_at: string; updated_at: string;
        };
        Insert: { id?: string; employee_id: string; business_id: string; blocked_date: string; blocked_from?: string | null; blocked_until?: string | null; reason?: string | null; };
        Update: { blocked_date?: string; blocked_from?: string | null; blocked_until?: string | null; reason?: string | null; };
      };
      service_categories: {
        Row: {
          id: string; business_id: string; name: string; sort_order: number; is_active: boolean;
          created_at: string; updated_at: string;
        };
        Insert: { id?: string; business_id: string; name: string; sort_order?: number; is_active?: boolean; };
        Update: { name?: string; sort_order?: number; is_active?: boolean; };
      };
      services: {
        Row: {
          id: string; business_id: string; category_id: string | null; slug: string; name: string;
          description: string | null; duration_min: number; price: number; is_active: boolean;
          sort_order: number; created_at: string; updated_at: string;
        };
        Insert: { id?: string; business_id: string; category_id?: string | null; slug: string; name: string; description?: string | null; duration_min: number; price?: number; is_active?: boolean; sort_order?: number; };
        Update: { category_id?: string | null; slug?: string; name?: string; description?: string | null; duration_min?: number; price?: number; is_active?: boolean; sort_order?: number; };
      };
      employee_services: {
        Row: {
          id: string; employee_id: string; service_id: string; business_id: string; created_at: string;
        };
        Insert: { id?: string; employee_id: string; service_id: string; business_id: string; };
        Update: { employee_id?: string; service_id?: string; };
      };
      appointments: {
        Row: {
          id: string; business_id: string; employee_id: string | null; service_id: string | null;
          customer_name: string; customer_phone: string; customer_email: string | null;
          service_name: string; service_price: number; service_duration_min: number;
          appointment_date: string; appointment_time: string;
          status: "confirmed" | "cancelled" | "completed" | "no_show";
          source: "website" | "admin" | "ai_agent";
          notes: string | null; internal_notes: string | null; deleted_at: string | null;
          confirmation_sent_at: string | null; reminder_sent_at: string | null;
          cancellation_sent_at: string | null;
          created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; business_id: string; employee_id?: string | null; service_id?: string | null;
          customer_name: string; customer_phone: string; customer_email?: string | null;
          service_name: string; service_price: number; service_duration_min: number;
          appointment_date: string; appointment_time: string;
          status?: "confirmed" | "cancelled" | "completed" | "no_show";
          source?: "website" | "admin" | "ai_agent";
          notes?: string | null; internal_notes?: string | null;
        };
        Update: {
          employee_id?: string | null; service_id?: string | null; customer_name?: string; customer_phone?: string;
          customer_email?: string | null; service_name?: string;
          service_price?: number; service_duration_min?: number;
          appointment_date?: string; appointment_time?: string;
          status?: "confirmed" | "cancelled" | "completed" | "no_show";
          notes?: string | null; internal_notes?: string | null; deleted_at?: string | null;
          confirmation_sent_at?: string | null; reminder_sent_at?: string | null;
          cancellation_sent_at?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
