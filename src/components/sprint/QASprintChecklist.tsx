
import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Clock, 
  Smartphone, 
  Search, 
  Download, 
  Bug, 
  MessageSquare, 
  FileDown,
  Rocket
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Demo Day date (April 28, 2025)
const DEMO_DAY = new Date('2025-04-28T09:00:00');

interface QATask {
  id: string;
  category: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low' | 'Post-Demo';
  status: 'Completed' | 'In Progress' | 'Not Started' | 'Planned';
  icon: React.ReactNode;
}

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
        // Demo day has arrived
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
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
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Not Started':
        return 'bg-gray-100 text-gray-800';
      case 'Planned':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-amber-100 text-amber-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Post-Demo':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-600 animate-pulse" />;
      case 'Not Started':
        return null;
      default:
        return null;
    }
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
        {/* Demo Day Countdown */}
        <div className="mb-6 p-4 bg-pulse-50 rounded-lg border border-pulse-100">
          <h3 className="text-md font-medium mb-2 flex items-center">
            <Rocket className="h-4 w-4 mr-2 text-pulse-600" />
            Time Until Demo Day
          </h3>
          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="text-center">
              <span className="text-2xl font-bold text-pulse-600">{timeRemaining.days}</span>
              <p className="text-xs text-gray-600">days</p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-pulse-600">{timeRemaining.hours}</span>
              <p className="text-xs text-gray-600">hours</p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-pulse-600">{timeRemaining.minutes}</span>
              <p className="text-xs text-gray-600">min</p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-pulse-600">{timeRemaining.seconds}</span>
              <p className="text-xs text-gray-600">sec</p>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </div>
        
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Task Category</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Task Description</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Priority</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-100 hover:bg-muted/30">
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-md bg-muted">
                        {task.icon}
                      </div>
                      <span>{task.category}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{task.description}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs ${getStatusColor(task.status)}`}>
                      {getStatusIcon(task.status)}
                      <span>{task.status}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-1">
                      {task.status !== 'Completed' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => updateTaskStatus(task.id, 'Completed')}
                        >
                          Complete
                        </Button>
                      )}
                      {task.status === 'Not Started' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => updateTaskStatus(task.id, 'In Progress')}
                        >
                          Start
                        </Button>
                      )}
                      {task.status === 'Completed' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => updateTaskStatus(task.id, 'In Progress')}
                        >
                          Reopen
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
