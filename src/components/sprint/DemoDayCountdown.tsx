
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Clock, Calendar, CheckCircle2, AlertCircle, Clock3, ArrowUp } from 'lucide-react';

interface DemoTask {
  id: string;
  description: string;
  priority: 'High' | 'Medium';
  completed: boolean;
  category: string;
}

const DEMO_DATE = new Date('2025-04-21T09:00:00'); // April 21, 2025, 9:00 AM

const DemoDayCountdown: React.FC = () => {
  const { toast } = useToast();
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
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
            variant: newCompleted ? "default" : "outline"
          });
          
          return { ...task, completed: newCompleted };
        }
        return task;
      })
    );
  };

  // Calculate completion percentage
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = (completedTasks / tasks.length) * 100;
  
  // Group tasks by priority
  const highPriorityTasks = tasks.filter(task => task.priority === 'High' && !task.completed);
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'Medium' && !task.completed);
  const completedTasksList = tasks.filter(task => task.completed);

  return (
    <Card className="shadow-lg border-t-4 border-t-purple-500">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">
            Demo Day Countdown
          </CardTitle>
          <Badge 
            variant={completedTasks === tasks.length ? "success" : "outline"}
            className={`${completedTasks === tasks.length ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}
          >
            {completedTasks === tasks.length ? 
              <CheckCircle2 className="h-3 w-3 mr-1" /> : 
              <Clock3 className="h-3 w-3 mr-1 animate-pulse" />
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

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Overall progress</span>
            <span className="font-medium">{completionPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
        
        {/* High priority tasks */}
        {highPriorityTasks.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <ArrowUp className="h-3 w-3 mr-1 text-red-500" />
              High Priority Tasks
            </h3>
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
          </div>
        )}
        
        {/* Medium priority tasks */}
        {mediumPriorityTasks.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Medium Priority Tasks</h3>
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
          </div>
        )}
        
        {/* Completed tasks */}
        {completedTasksList.length > 0 && (
          <div className="space-y-2">
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
          </div>
        )}

        {/* Reminder for demo date */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Demo Day: April 21, 2025 (9:00 AM)</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 text-xs"
            onClick={() => {
              toast({
                title: "Calendar event added",
                description: "Demo Day event has been added to your calendar"
              });
            }}
          >
            Add to calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoDayCountdown;
