
import { Tables } from '@/types/database.types';

export interface DashboardStats {
  pulseScore: number;
  responseRate: number;
  employeesEngaged: number;
  insightsGenerated: number;
}

export interface DashboardContextType {
  surveys: Tables<'pulse_surveys'>[];
  responses: any[]; // Using any for flexibility with response data
  stats: DashboardStats;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  forceRefresh: () => void;
}
