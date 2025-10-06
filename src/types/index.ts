export interface Dataset {
  id: string;
  name: string;
  file_name: string;
  file_size: number;
  row_count: number;
  column_mapping: Record<string, unknown>;
  uploaded_by: string | null;
  uploaded_at: string;
  status: 'processing' | 'completed' | 'failed';
}

export interface Report {
  id: string;
  name: string;
  description: string;
  report_type: string;
  filters: Record<string, unknown>;
  schedule: string;
  last_generated: string | null;
  created_by: string | null;
  created_at: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'stock' | 'revenue' | 'performance' | 'general';
  is_read: boolean;
  triggered_at: string;
  metadata: Record<string, unknown>;
}

export interface SalesData {
  id: string;
  date: string;
  category: string;
  region: string;
  revenue: number;
  units_sold: number;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  created_at: string;
  last_login: string | null;
}

export interface DashboardFilters {
  dateRange: { from: Date | undefined; to: Date | undefined };
  category: string;
  region: string;
}

export interface KPIMetric {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  icon: string;
}
