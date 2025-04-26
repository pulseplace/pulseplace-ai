
export type DebugLogStatus = 'Open' | 'In Progress' | 'Fixed' | 'Won\'t Fix';
export type DebugLogSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface DebugLog {
  id: string;
  description: string;
  status: DebugLogStatus;
  severity: DebugLogSeverity;
  component: string;
  loggedBy: string;
  dateLogged: string;
  dateFixed?: string;
  assignedTo?: string;
  notes?: string;
}
