
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUp, 
  BarChart2,
  Smartphone,
  MessageSquare,
  FileDown,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface DemoTask {
  id: string;
  description: string;
  priority: 'High' | 'Medium';
  completed: boolean;
  category: string;
}

// Updated to April 28, 2025, 10:00 AM IST
const DEMO_DATE = new Date('2025-04-28T04:30:00Z'); // 10:00 AM IST in UTC

const DemoDayCountdown: React.FC = () => {
  const { toast } = useToast();
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
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
  
  // Project phases progress data
  const phasesProgress = [
    { phase: "Foundation Phase", progress: 100, status: "completed" },
    { phase: "Core Features", progress: 65, status: "in-progress" },
    { phase: "Beta Readiness (UX + AI)", progress: 90, status: "in-progress" },
    { phase: "QA Sprint", progress: 75, status: "in-progress" }
  ];
  
  // Milestone data
  const milestones = [
    { date: "April 15", title: "Core Features Release", status: "completed" },
    { date: "April 15", title: "AI Insights Lock", status: "completed" },
    { date: "April 28", title: "Beta Onboarding Begins", status: "upcoming" },
    { date: "May 15", title: "Beta Expansion Phase", status: "planned" },
    { date: "June 1", title: "Pre-Launch Campaign", status: "planned" },
    { date: "July 15", title: "Public Launch", status: "planned" }
  ];

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
  
  // Group tasks by priority
  const highPriorityTasks = tasks.filter(task => task.priority === 'High' && !task.completed);
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'Medium' && !task.completed);
  const completedTasksList = tasks.filter(task => task.completed);

  // Format last updated time
  const formatLastUpdated = (date: Date) => {
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <Card className="shadow-lg border-t-4 border-t-purple-500">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">
            Beta Demo Day Countdown
          </CardTitle>
          <Badge 
            variant={completedTasks === tasks.length ? "default" : "outline"}
            className={`${completedTasks === tasks.length ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}
          >
            {completedTasks === tasks.length ? 
              <CheckCircle2 className="h-3 w-3 mr-1" /> : 
              <Clock className="h-3 w-3 mr-1 animate-pulse" />
            }
            {completedTasks === tasks.length ? 
              'Ready for demo!' : 
              `${completedTasks}/${tasks.length} completed`
            }
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Countdown timer */}
        <div className="grid grid-cols-4 gap-2 p-3 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-purple-600">{timeRemaining.days}</span>
            <span className="text-xs text-gray-500">days</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-purple-600">{timeRemaining.hours}</span>
            <span className="text-xs text-gray-500">hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-purple-600">{timeRemaining.minutes}</span>
            <span className="text-xs text-gray-500">min</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-purple-600">{timeRemaining.seconds}</span>
            <span className="text-xs text-gray-500">sec</span>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Overall readiness</span>
            <span className="font-medium">{overallReadiness}%</span>
          </div>
          <Progress value={overallReadiness} className="h-2" />
        </div>
        
        {/* Project phases progress */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Project Phase Progress</h3>
          <div className="space-y-2">
            {phasesProgress.map((phase, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center">
                    {phase.status === "completed" ? (
                      <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                    ) : (
                      <Clock className="h-3 w-3 mr-1 text-amber-600" />
                    )}
                    {phase.phase}
                  </span>
                  <span className="font-medium">{phase.progress}%</span>
                </div>
                <Progress 
                  value={phase.progress} 
                  className="h-1.5" 
                  indicatorClassName={
                    phase.status === "completed" 
                      ? "bg-green-500" 
                      : phase.progress >= 80 
                        ? "bg-amber-500" 
                        : "bg-blue-500"
                  }
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Today's Focus */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center">
            <ArrowUp className="h-3 w-3 mr-1 text-red-500" />
            Today's Focus
          </h3>
          
          {/* High priority tasks */}
          {highPriorityTasks.length > 0 && (
            <ul className="space-y-2">
              {highPriorityTasks.map(task => (
                <li key={task.id} className="flex items-start gap-2 p-2 bg-red-50 rounded-md">
                  <Checkbox 
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                    className="mt-1"
                  />
                  <div>
                    <label 
                      htmlFor={`task-${task.id}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {task.description}
                    </label>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs bg-white">
                        {task.category}
                      </Badge>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          
          {/* Medium priority tasks */}
          {mediumPriorityTasks.length > 0 && (
            <ul className="space-y-2">
              {mediumPriorityTasks.map(task => (
                <li key={task.id} className="flex items-start gap-2 p-2 bg-amber-50 rounded-md">
                  <Checkbox 
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                    className="mt-1"
                  />
                  <div>
                    <label 
                      htmlFor={`task-${task.id}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {task.description}
                    </label>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs bg-white">
                        {task.category}
                      </Badge>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          
          {/* Completed tasks */}
          {completedTasksList.length > 0 && (
            <details>
              <summary className="text-sm font-medium cursor-pointer">
                Completed Tasks ({completedTasksList.length})
              </summary>
              <ul className="space-y-2 mt-2">
                {completedTasksList.map(task => (
                  <li key={task.id} className="flex items-start gap-2 p-2 bg-gray-50 rounded-md opacity-70">
                    <Checkbox 
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                      className="mt-1"
                    />
                    <div>
                      <label 
                        htmlFor={`task-${task.id}`}
                        className="text-sm line-through cursor-pointer"
                      >
                        {task.description}
                      </label>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-xs bg-white">
                          {task.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-white ml-1">
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
        
        {/* Milestone Tracker */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Milestone Tracker</h3>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs font-medium text-gray-500">
                <tr>
                  <th className="px-4 py-2 text-left">Milestone</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {milestones.map((milestone, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{milestone.title}</td>
                    <td className="px-4 py-2">{milestone.date}</td>
                    <td className="px-4 py-2">
                      {milestone.status === "completed" ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Completed
                        </span>
                      ) : milestone.status === "upcoming" ? (
                        <span className="flex items-center text-blue-600">
                          <ArrowRight className="h-4 w-4 mr-1" />
                          Upcoming
                        </span>
                      ) : (
                        <span className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          Planned
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Quick Access Buttons */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Quick Access</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 text-xs justify-start"
              onClick={() => {
                window.location.href = "/dashboard/qa-sprint";
              }}
            >
              <BarChart2 className="h-3.5 w-3.5 mr-1.5" />
              QA Sprint Tracker
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 text-xs justify-start"
              onClick={() => {
                window.location.href = "/pulsebot";
              }}
            >
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
              PulseBot Demo Mode
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 text-xs justify-start"
              onClick={() => {
                toast({
                  title: "Cross-Browser QA",
                  description: "Opening browser testing interface..."
                });
              }}
            >
              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
              Cross-Browser QA
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 text-xs justify-start"
              onClick={() => {
                toast({
                  title: "Demo State Reset",
                  description: "Resetting demo environment to initial state..."
                });
              }}
            >
              <ArrowRight className="h-3.5 w-3.5 mr-1.5" />
              Reset Demo State
            </Button>
          </div>
        </div>

        {/* Last updated timestamp */}
        <div className="flex justify-end text-xs text-gray-500 pt-2 border-t mt-4">
          Last updated: {formatLastUpdated(lastUpdated)}
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoDayCountdown;
