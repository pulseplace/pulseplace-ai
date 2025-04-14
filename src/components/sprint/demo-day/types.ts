
export interface DemoTask {
  id: string;
  description: string;
  priority: 'High' | 'Medium';
  completed: boolean;
  category: string;
}

export interface PhaseProgress {
  phase: string;
  progress: number;
  status: "completed" | "in-progress" | "planned";
}

export interface Milestone {
  date: string;
  title: string;
  status: "completed" | "upcoming" | "planned";
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
