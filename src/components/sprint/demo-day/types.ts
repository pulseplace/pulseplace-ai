
import React from 'react';

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
  status: 'completed' | 'in-progress' | 'planned';
}

export interface DemoTask extends QATask {
  // DemoTask now extends QATask to ensure compatibility
  // We can add additional properties specific to DemoTask here if needed
}

export interface Milestone {
  date: string;
  title: string;
  status: 'completed' | 'upcoming' | 'planned';
}
