
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Plus,
  RefreshCw,
  ClipboardList,
  PieChart,
  BarChart3
} from "lucide-react";
import { useTaskProgress } from '../chat/hooks/useTaskProgress';
import { useToast } from '@/hooks/use-toast';
import { useTaskManager } from '@/contexts/TaskContext';
import TaskCompletionStatus from './TaskCompletionStatus';
import { TaskTracker } from '../chat/components/TaskTracker';
import ProjectProgressChart from './ProjectProgressChart';

export type ProjectPhase = {
  id: string;
  name: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  progress: number;
  tasks: PhaseTask[];
};

export type PhaseTask = {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo?: string;
  dueDate?: Date;
  createdAt: Date;
  progress: number;
};

const ProjectAuditDashboard: React.FC = () => {
  const { toast } = useToast();
  const { tasks: contextTasks, addTask } = useTaskManager();
  const { activeTasks, createTask } = useTaskProgress();
  const [isLoading, setIsLoading] = useState(false);
  const [projectPhases, setProjectPhases] = useState<ProjectPhase[]>([
    {
      id: '1',
      name: 'Foundation',
      status: 'completed',
      progress: 100,
      tasks: [
        { id: '1-1', title: 'Project setup', status: 'completed', priority: 'high', createdAt: new Date(), progress: 100 },
        { id: '1-2', title: 'UI component library', status: 'completed', priority: 'high', createdAt: new Date(), progress: 100 },
        { id: '1-3', title: 'Authentication framework', status: 'completed', priority: 'high', createdAt: new Date(), progress: 100 }
      ]
    },
    {
      id: '2',
      name: 'Core Features',
      status: 'in-progress',
      progress: 75,
      tasks: [
        { id: '2-1', title: 'Dashboard UI', status: 'completed', priority: 'high', createdAt: new Date(), progress: 100 },
        { id: '2-2', title: 'Chat functionality', status: 'completed', priority: 'high', createdAt: new Date(), progress: 100 },
        { id: '2-3', title: 'Task tracking system', status: 'in-progress', priority: 'medium', createdAt: new Date(), progress: 70 },
        { id: '2-4', title: 'Certification badges', status: 'in-progress', priority: 'medium', createdAt: new Date(), progress: 80 }
      ]
    },
    {
      id: '3',
      name: 'Advanced Features',
      status: 'in-progress',
      progress: 40,
      tasks: [
        { id: '3-1', title: 'AI Analytics', status: 'in-progress', priority: 'medium', createdAt: new Date(), progress: 60 },
        { id: '3-2', title: 'Team management', status: 'in-progress', priority: 'high', createdAt: new Date(), progress: 50 },
        { id: '3-3', title: 'Export functionality', status: 'in-progress', priority: 'medium', createdAt: new Date(), progress: 70 },
        { id: '3-4', title: 'Advanced reporting', status: 'pending', priority: 'low', createdAt: new Date(), progress: 0 }
      ]
    },
    {
      id: '4',
      name: 'Beta Launch',
      status: 'not-started',
      progress: 10,
      tasks: [
        { id: '4-1', title: 'Performance optimization', status: 'in-progress', priority: 'high', createdAt: new Date(), progress: 30 },
        { id: '4-2', title: 'Bug fixes', status: 'in-progress', priority: 'critical', createdAt: new Date(), progress: 20 },
        { id: '4-3', title: 'Documentation', status: 'pending', priority: 'medium', createdAt: new Date(), progress: 0 },
        { id: '4-4', title: 'Beta user onboarding', status: 'pending', priority: 'high', createdAt: new Date(), progress: 0 }
      ]
    }
  ]);

  // Calculate overall project completion
  const calculateOverallProgress = (): number => {
    const totalPhases = projectPhases.length;
    const progressSum = projectPhases.reduce((sum, phase) => sum + phase.progress, 0);
    return Math.round(progressSum / totalPhases);
  };

  // Count tasks by status
  const countTasksByStatus = () => {
    let completed = 0;
    let inProgress = 0;
    let pending = 0;
    let failed = 0;
    
    projectPhases.forEach(phase => {
      phase.tasks.forEach(task => {
        if (task.status === 'completed') completed++;
        else if (task.status === 'in-progress') inProgress++;
        else if (task.status === 'pending') pending++;
        else if (task.status === 'failed' || task.status === 'blocked') failed++;
      });
    });
    
    return { completed, inProgress, failed, pending, total: completed + inProgress + pending + failed };
  };

  // Create a new task in the TaskContext
  const handleCreateTask = (phaseId: string, task: Omit<PhaseTask, 'id' | 'createdAt'>) => {
    // Add to task context
    addTask({
      title: task.title,
      description: task.description,
      completed: false,
      priority: task.priority,
      dueDate: task.dueDate
    });
    
    // Also create in task progress system if applicable
    createTask({
      title: task.title,
      description: task.description
    });
    
    // Update local state
    setProjectPhases(prev => prev.map(phase => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          tasks: [
            ...phase.tasks,
            {
              id: Date.now().toString(),
              ...task,
              createdAt: new Date()
            }
          ]
        };
      }
      return phase;
    }));
    
    toast({
      title: "Task Created",
      description: `New task "${task.title}" added to phase "${projectPhases.find(p => p.id === phaseId)?.name}"`,
    });
  };

  // Mark a task as complete
  const handleCompleteTask = (phaseId: string, taskId: string) => {
    setProjectPhases(prev => prev.map(phase => {
      if (phase.id === phaseId) {
        const updatedTasks = phase.tasks.map(task => 
          task.id === taskId ? { ...task, status: 'completed', progress: 100 } : task
        );
        
        // Calculate new phase progress
        const totalTasks = updatedTasks.length;
        const completedTasks = updatedTasks.filter(t => t.status === 'completed').length;
        const newProgress = Math.round((completedTasks / totalTasks) * 100);
        
        return {
          ...phase,
          progress: newProgress,
          status: newProgress === 100 ? 'completed' : 'in-progress'
        };
      }
      return phase;
    }));
    
    toast({
      title: "Task Completed",
      description: "Task marked as completed and progress updated"
    });
  };

  // Task counts for the overview
  const taskCounts = countTasksByStatus();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex justify-between items-center">
              <span>Project Progress</span>
              <span className="text-2xl font-bold">{calculateOverallProgress()}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={calculateOverallProgress()} className="h-3" />
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-green-50 p-3 rounded-md flex flex-col items-center">
                  <div className="text-green-600 font-semibold text-lg">{projectPhases.filter(p => p.status === 'completed').length}</div>
                  <div className="text-xs text-gray-600">Phases Completed</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-md flex flex-col items-center">
                  <div className="text-blue-600 font-semibold text-lg">{projectPhases.filter(p => p.status === 'in-progress').length}</div>
                  <div className="text-xs text-gray-600">Phases In Progress</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-md flex flex-col items-center">
                  <div className="text-yellow-600 font-semibold text-lg">{taskCounts.inProgress}</div>
                  <div className="text-xs text-gray-600">Active Tasks</div>
                </div>
                <div className="bg-red-50 p-3 rounded-md flex flex-col items-center">
                  <div className="text-red-600 font-semibold text-lg">{taskCounts.failed}</div>
                  <div className="text-xs text-gray-600">Blocked Tasks</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <TaskCompletionStatus 
          totalTasks={taskCounts.total}
          completedTasks={taskCounts.completed}
          failedTasks={taskCounts.failed}
          pendingTasks={taskCounts.pending}
        />
      </div>
      
      <TaskTracker mode="dialog" />
      
      <Tabs defaultValue="phases">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="phases">
            <ClipboardList className="h-4 w-4 mr-2" />
            Project Phases
          </TabsTrigger>
          <TabsTrigger value="charts">
            <PieChart className="h-4 w-4 mr-2" />
            Progress Charts
          </TabsTrigger>
          <TabsTrigger value="active">
            <Clock className="h-4 w-4 mr-2" />
            Active Tasks
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="phases" className="space-y-4">
          {projectPhases.map((phase) => (
            <Card key={phase.id} className={`border-l-4 ${
              phase.status === 'completed' ? 'border-l-green-500' : 
              phase.status === 'in-progress' ? 'border-l-blue-500' : 
              phase.status === 'blocked' ? 'border-l-red-500' : 
              'border-l-gray-300'
            }`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center">
                    {phase.name}
                    {phase.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />}
                    {phase.status === 'blocked' && <AlertTriangle className="h-5 w-5 text-red-500 ml-2" />}
                  </CardTitle>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">{phase.progress}%</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleCreateTask(phase.id, {
                        title: `New task in ${phase.name}`,
                        status: 'pending',
                        priority: 'medium',
                        progress: 0
                      })}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Task
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={phase.progress} className="h-2 mb-4" />
                
                <div className="space-y-3">
                  {phase.tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={`p-3 rounded-md border ${
                        task.status === 'completed' ? 'bg-green-50 border-green-100' : 
                        task.status === 'in-progress' ? 'bg-blue-50 border-blue-100' : 
                        task.status === 'failed' || task.status === 'blocked' ? 'bg-red-50 border-red-100' : 
                        'bg-gray-50 border-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium flex items-center">
                            {task.title}
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                              task.priority === 'critical' ? 'bg-red-100 text-red-800' :
                              task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                              task.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {task.priority}
                            </span>
                          </div>
                          {task.description && (
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          )}
                        </div>
                        
                        {task.status !== 'completed' && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleCompleteTask(phase.id, task.id)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        )}
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-1.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="charts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Phase Progress</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ProjectProgressChart phases={projectPhases} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Task Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold text-green-600">{taskCounts.completed}</div>
                      <div className="text-sm text-gray-500">Completed</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold text-blue-600">{taskCounts.inProgress}</div>
                      <div className="text-sm text-gray-500">In Progress</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold text-yellow-600">{taskCounts.pending}</div>
                      <div className="text-sm text-gray-500">Pending</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold text-red-600">{taskCounts.failed}</div>
                      <div className="text-sm text-gray-500">Blocked/Failed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="active">
          <div className="space-y-4">
            <Button variant="outline" className="mb-4">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Tasks
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectPhases.flatMap(phase => 
                phase.tasks
                  .filter(task => task.status === 'in-progress')
                  .map(task => (
                    <Card key={`${phase.id}-${task.id}`}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{task.title}</h3>
                            <p className="text-sm text-gray-500">Phase: {phase.name}</p>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            task.priority === 'critical' ? 'bg-red-100 text-red-800' :
                            task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                            task.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Button size="sm" onClick={() => handleCompleteTask(phase.id, task.id)}>
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Mark Complete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
              
              {projectPhases.flatMap(phase => phase.tasks).filter(task => task.status === 'in-progress').length === 0 && (
                <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
                  <h3 className="text-xl font-medium">All Caught Up!</h3>
                  <p className="text-gray-500 mt-1">No tasks currently in progress</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectAuditDashboard;
