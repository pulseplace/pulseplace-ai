
import { useState, useEffect } from 'react';
import { DemoTask, TimeRemaining } from './types';
import { useToast } from "@/hooks/use-toast";

// Updated to April 28, 2025, 10:00 AM IST
const DEMO_DATE = new Date('2025-04-28T04:30:00Z'); // 10:00 AM IST in UTC

export const useDemoDay = () => {
  const { toast } = useToast();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({ 
    days: 0, hours: 0, minutes: 0, seconds: 0 
  });
  
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  const [tasks, setTasks] = useState<DemoTask[]>([
    {
      id: '1',
      description: 'QA cross-browser testing for HeroStats, PulseBot, and insight cards',
      priority: 'High',
      completed: false,
      category: 'Testing'
    },
    {
      id: '2',
      description: 'Mobile view optimization: toast placement, timestamp legibility, layout test',
      priority: 'High',
      completed: false,
      category: 'Mobile'
    },
    {
      id: '3',
      description: 'Add PulseBot tooltip/quick tips (e.g. suggested prompts for demo)',
      priority: 'Medium',
      completed: false,
      category: 'UX'
    },
    {
      id: '4',
      description: 'Implement export button for insights (mock PDF or CSV ok for demo)',
      priority: 'Medium',
      completed: false,
      category: 'Feature'
    }
  ]);

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = DEMO_DATE.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Demo day has arrived!
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          
          toast({
            title: newCompleted ? "Task completed" : "Task reopened",
            description: task.description.substring(0, 40) + "...",
            variant: newCompleted ? "default" : "destructive"
          });
          
          return { ...task, completed: newCompleted };
        }
        return task;
      })
    );
    setLastUpdated(new Date());
  };

  // Project phases progress data
  const phasesProgress = [
    { phase: "Foundation Phase", progress: 100, status: "completed" as const },
    { phase: "Core Features", progress: 65, status: "in-progress" as const },
    { phase: "Beta Readiness (UX + AI)", progress: 90, status: "in-progress" as const },
    { phase: "QA Sprint", progress: 75, status: "in-progress" as const }
  ];
  
  // Milestone data
  const milestones = [
    { date: "April 15", title: "Core Features Release", status: "completed" as const },
    { date: "April 15", title: "AI Insights Lock", status: "completed" as const },
    { date: "April 28", title: "Beta Onboarding Begins", status: "upcoming" as const },
    { date: "May 15", title: "Beta Expansion Phase", status: "planned" as const },
    { date: "June 1", title: "Pre-Launch Campaign", status: "planned" as const },
    { date: "July 15", title: "Public Launch", status: "planned" as const }
  ];

  // Calculate completion percentage
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = (completedTasks / tasks.length) * 100;
  
  // Calculate overall readiness (weighted average of all phases)
  const overallReadiness = Math.round(
    (phasesProgress[0].progress * 0.2) + 
    (phasesProgress[1].progress * 0.3) + 
    (phasesProgress[2].progress * 0.3) + 
    (phasesProgress[3].progress * 0.2)
  );

  // Format last updated time
  const formatLastUpdated = (date: Date) => {
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return {
    timeRemaining,
    tasks,
    phasesProgress,
    milestones,
    lastUpdated,
    completedTasks,
    completionPercentage,
    overallReadiness,
    toggleTaskCompletion,
    formatLastUpdated
  };
};
