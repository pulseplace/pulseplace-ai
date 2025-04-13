
export interface PhaseItem {
  title: string;
  description: string;
  timeframe: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  tasks: {
    name: string;
    status: 'completed' | 'in-progress' | 'pending' | 'at-risk';
    priority: 'high' | 'medium' | 'low';
  }[];
}

export interface MilestoneItem {
  date: string;
  title: string;
  description?: string;
  status: 'completed' | 'upcoming' | 'in-progress';
}

export interface FocusArea {
  title: string;
  description: string;
  color: string;
}
