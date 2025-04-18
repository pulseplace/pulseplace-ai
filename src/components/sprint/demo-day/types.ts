
export interface QATask {
  id: string;
  category: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low' | 'Post-Demo';
  status: 'Completed' | 'In Progress' | 'Not Started' | 'Planned';
  icon: React.ReactNode;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface PhaseProgress {
  phase: string;
  progress: number;
}
