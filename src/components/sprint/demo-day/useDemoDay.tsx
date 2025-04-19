
import { useState, useEffect } from 'react';
import { QATask, TimeRemaining, PhaseProgress, Milestone } from './types';
import { 
  ClipboardCheck, 
  Code, 
  LayoutDashboard, 
  Presentation, 
  MessageSquare,
  Database,
  Shield,
  LineChart
} from 'lucide-react';

export const useDemoDay = () => {
  // Demo day date: April 21, 2025
  const demoDayDate = new Date('2025-04-21T14:00:00');
  
  // Current data
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Sample tasks
  const [tasks, setTasks] = useState<QATask[]>([
    {
      id: '1',
      category: 'QA',
      description: 'Test Authentication Flow',
      priority: 'High',
      status: 'Completed',
      icon: <ClipboardCheck className="h-4 w-4 text-green-500" />
    },
    {
      id: '2',
      category: 'Backend',
      description: 'Optimize Database Queries',
      priority: 'High',
      status: 'In Progress',
      icon: <Database className="h-4 w-4 text-blue-500" />
    },
    {
      id: '3',
      category: 'Frontend',
      description: 'Fix Responsive Design Issues',
      priority: 'Medium',
      status: 'Not Started',
      icon: <LayoutDashboard className="h-4 w-4 text-purple-500" />
    },
    {
      id: '4',
      category: 'Security',
      description: 'Implement API Rate Limiting',
      priority: 'Post-Demo',
      status: 'Planned',
      icon: <Shield className="h-4 w-4 text-gray-500" />
    }
  ]);
  
  // Progress by phase
  const phasesProgress: PhaseProgress[] = [
    {
      phase: 'Backend Development',
      progress: 85,
      status: 'in-progress'
    },
    {
      phase: 'Frontend Polish',
      progress: 70,
      status: 'in-progress'
    },
    {
      phase: 'Security Audit',
      progress: 60,
      status: 'in-progress'
    },
    {
      phase: 'Documentation',
      progress: 40,
      status: 'in-progress'
    }
  ];
  
  // Key milestones
  const milestones: Milestone[] = [
    {
      date: 'April 15',
      title: 'Feature Freeze',
      status: 'completed'
    },
    {
      date: 'April 17',
      title: 'Internal Demo',
      status: 'upcoming'
    },
    {
      date: 'April 19',
      title: 'QA Sign-off',
      status: 'planned'
    },
    {
      date: 'April 21',
      title: 'Stakeholder Demo',
      status: 'planned'
    }
  ];
  
  // Last updated timestamp
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Calculate overall readiness (based on task completion)
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const overallReadiness = Math.round((completedTasks / tasks.length) * 100);
  
  // Function to toggle task completion status
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === 'Completed' ? 'Not Started' : 'Completed'
        };
      }
      return task;
    }));
    
    // Update lastUpdated timestamp
    setLastUpdated(new Date());
  };
  
  // Format the last updated time
  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  };
  
  // Update countdown timer
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = demoDayDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    
    // Calculate immediately
    calculateTimeRemaining();
    
    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return {
    timeRemaining,
    tasks,
    phasesProgress,
    milestones,
    lastUpdated,
    completedTasks,
    overallReadiness,
    toggleTaskCompletion,
    formatLastUpdated
  };
};
