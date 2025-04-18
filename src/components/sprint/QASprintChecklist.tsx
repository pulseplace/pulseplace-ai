
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Smartphone, 
  MessageSquare, 
  FileDown,
  Bug, 
  Rocket,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import TaskList from './demo-day/TaskList';
import CountdownTimer from './demo-day/CountdownTimer';
import { QATask } from './demo-day/types';

// Demo Day date (April 28, 2025)
const DEMO_DAY = new Date('2025-04-28T09:00:00');

const QASprintChecklist = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<QATask[]>([
    {
      id: "qa-cross-browser",
      category: 'Immediate Fixes',
      description: 'QA cross-browser testing for HeroStats, PulseBot, and insight cards',
      priority: 'High',
      status: 'In Progress',
      icon: <Search className="h-5 w-5" />
    },
    {
      id: "mobile-view",
      category: 'Immediate Fixes',
      description: 'Mobile view optimization: toast placement, timestamp legibility, layout test',
      priority: 'High',
      status: 'In Progress',
      icon: <Smartphone className="h-5 w-5" />
    },
    {
      id: "pulsebot-tips",
      category: 'PulseBot UX Polish',
      description: 'Add PulseBot tooltip/quick tips (e.g. suggested prompts for demo)',
      priority: 'Medium',
      status: 'Completed',
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      id: "insights-export",
      category: 'Insights Export',
      description: 'Implement export button for insights (mock PDF or CSV ok for demo)',
      priority: 'Medium',
      status: 'Completed',
      icon: <FileDown className="h-5 w-5" />
    },
    {
      id: "code-refactor",
      category: 'Code Health Note',
      description: 'TaskSummary.tsx modular refactor post-demo (split into components)',
      priority: 'Post-Demo',
      status: 'Planned',
      icon: <Bug className="h-5 w-5" />
    },
    {
      id: "routes-validation",
      category: 'Demo Readiness',
      description: 'Validate all routes work without 404s: dashboard, insights, teams, qa-sprint',
      priority: 'High',
      status: 'Not Started',
      icon: <Rocket className="h-5 w-5" />
    }
  ]);
  
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Update countdown timer
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = DEMO_DAY.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const updateTaskStatus = (taskId: string, newStatus: QATask['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    
    toast({
      title: "Task Updated",
      description: `Task status has been updated to ${newStatus}`,
    });
  };
  
  // Calculate completion percentage
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const totalTasks = tasks.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">
            PulsePlace.ai — Final QA Sprint Checklist (April 2025)
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            Generated on April 15, 2025
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Tracking final tasks before Demo Day
        </p>
      </CardHeader>
      <CardContent>
        <CountdownTimer 
          timeRemaining={timeRemaining}
          completionPercentage={completionPercentage}
        />
        
        <div className="mt-6 overflow-auto">
          <TaskList 
            tasks={tasks}
            onUpdateTask={updateTaskStatus}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/10 px-6 py-3">
        <p className="text-xs text-muted-foreground">
          Last updated: April 15, 2025 at 10:30 AM
        </p>
        <Button variant="outline" size="sm" onClick={() => 
          toast({
            title: "Sprint Status Report",
            description: "Report has been sent to all stakeholders"
          })
        }>
          <Download className="h-3.5 w-3.5 mr-1" />
          Export Report
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QASprintChecklist;
