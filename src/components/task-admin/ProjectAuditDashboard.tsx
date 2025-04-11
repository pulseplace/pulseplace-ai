
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import ProjectProgressChart from './ProjectProgressChart';
import { Clipboard, FileCheck, RefreshCw, Plus, Check, Clock, AlertTriangle, AlertCircle } from 'lucide-react';

// Define types
export type ProjectPhase = {
  id: string;
  name: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  startDate: string;
  endDate: string;
  tasks: ProjectTask[];
};

export type TaskPriority = 'low' | 'medium' | 'high';

export type ProjectTask = {
  id: string;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  assignee?: string;
  priority: TaskPriority;
  phaseId: string;
  createdAt: string;
  dueDate?: string;
};

const ProjectAuditDashboard: React.FC = () => {
  // Sample data - in a real app, this would come from an API or database
  const [phases, setPhases] = useState<ProjectPhase[]>([
    {
      id: "phase-1",
      name: "Foundation",
      progress: 100,
      status: "completed",
      startDate: "2025-01-01",
      endDate: "2025-02-15",
      tasks: [
        {
          id: "task-1",
          title: "Project Setup",
          description: "Initialize repository and configure development environment",
          status: "completed",
          assignee: "Alex Chen",
          priority: "high",
          phaseId: "phase-1",
          createdAt: "2025-01-01",
          dueDate: "2025-01-07"
        },
        {
          id: "task-2",
          title: "Core Architecture",
          description: "Design and implement core system architecture",
          status: "completed",
          assignee: "Taylor Kim",
          priority: "high",
          phaseId: "phase-1",
          createdAt: "2025-01-08",
          dueDate: "2025-02-01"
        }
      ]
    },
    {
      id: "phase-2",
      name: "Core Features",
      progress: 65,
      status: "in-progress",
      startDate: "2025-02-16",
      endDate: "2025-04-15",
      tasks: [
        {
          id: "task-3",
          title: "User Authentication",
          description: "Implement secure login and registration system",
          status: "completed",
          assignee: "Jordan Lee",
          priority: "high",
          phaseId: "phase-2",
          createdAt: "2025-02-16",
          dueDate: "2025-03-01"
        },
        {
          id: "task-4",
          title: "Dashboard UI",
          description: "Create responsive dashboard interface with key metrics",
          status: "in-progress",
          assignee: "Casey Morgan",
          priority: "medium",
          phaseId: "phase-2",
          createdAt: "2025-03-02",
          dueDate: "2025-03-15"
        },
        {
          id: "task-5",
          title: "Data Integration",
          description: "Connect to external data sources and implement ETL processes",
          status: "blocked",
          assignee: "Riley Zhang",
          priority: "high",
          phaseId: "phase-2",
          createdAt: "2025-03-16",
          dueDate: "2025-04-01"
        }
      ]
    },
    {
      id: "phase-3",
      name: "Beta Launch",
      progress: 10,
      status: "in-progress",
      startDate: "2025-04-16",
      endDate: "2025-06-01",
      tasks: [
        {
          id: "task-6",
          title: "User Onboarding",
          description: "Create streamlined onboarding flow for new users",
          status: "in-progress",
          assignee: "Sam Patel",
          priority: "medium",
          phaseId: "phase-3",
          createdAt: "2025-04-16",
          dueDate: "2025-05-01"
        },
        {
          id: "task-7",
          title: "Beta User Selection",
          description: "Identify and invite initial beta testers",
          status: "not-started",
          assignee: "Jamie Wilson",
          priority: "low",
          phaseId: "phase-3",
          createdAt: "2025-04-20",
          dueDate: "2025-05-10"
        }
      ]
    }
  ]);

  // Calculate overall project completion
  const calculateOverallProgress = (): number => {
    if (phases.length === 0) return 0;
    
    return Math.round(
      phases.reduce((sum, phase) => sum + phase.progress, 0) / phases.length
    );
  };

  // Get status indicator component
  const getStatusIndicator = (status: 'not-started' | 'in-progress' | 'completed' | 'blocked') => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600"><Check className="h-3 w-3 mr-1" /> Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500 hover:bg-blue-600"><Clock className="h-3 w-3 mr-1" /> In Progress</Badge>;
      case 'blocked':
        return <Badge className="bg-red-500 hover:bg-red-600"><AlertCircle className="h-3 w-3 mr-1" /> Blocked</Badge>;
      default:
        return <Badge className="bg-gray-500 hover:bg-gray-600"><AlertTriangle className="h-3 w-3 mr-1" /> Not Started</Badge>;
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clipboard className="h-5 w-5 mr-2 text-blue-500" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Beta Launch Readiness</span>
                <span className="font-bold">{calculateOverallProgress()}%</span>
              </div>
              <Progress value={calculateOverallProgress()} className="h-3" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500">Phases</span>
                <span className="font-bold">{phases.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Tasks</span>
                <span className="font-bold">{phases.reduce((sum, phase) => sum + phase.tasks.length, 0)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Completed</span>
                <span className="font-bold">{phases.reduce((sum, phase) => 
                  sum + phase.tasks.filter(task => task.status === 'completed').length, 0)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Blocked</span>
                <span className="font-bold text-red-500">{phases.reduce((sum, phase) => 
                  sum + phase.tasks.filter(task => task.status === 'blocked').length, 0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center">
                <FileCheck className="h-5 w-5 mr-2 text-green-500" />
                Project Phases Progress
              </div>
              <Button variant="outline" size="sm" className="h-8">
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Update
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ProjectProgressChart phases={phases} />
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all-phases">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all-phases">All Phases</TabsTrigger>
            <TabsTrigger value="current">Current Phase</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Task
          </Button>
        </div>
        
        <TabsContent value="all-phases" className="space-y-4">
          {phases.map(phase => (
            <Card key={phase.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-md">{phase.name}</CardTitle>
                  {getStatusIndicator(phase.status)}
                </div>
                <div className="text-sm text-gray-500 flex justify-between items-center">
                  <div>
                    {new Date(phase.startDate).toLocaleDateString()} - {new Date(phase.endDate).toLocaleDateString()}
                  </div>
                  <div className="font-medium">{phase.progress}% complete</div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={phase.progress} className="h-2 mb-4" />
                
                <div className="space-y-3">
                  {phase.tasks.map(task => (
                    <div key={task.id} className="border rounded-md p-3 text-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{task.title}</div>
                        <div className="flex space-x-2">
                          {getPriorityBadge(task.priority)}
                          {getStatusIndicator(task.status)}
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm mb-2">{task.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <div>Assignee: {task.assignee || 'Unassigned'}</div>
                        {task.dueDate && <div>Due: {new Date(task.dueDate).toLocaleDateString()}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="current" className="space-y-4">
          {phases.filter(phase => phase.status === 'in-progress').map(phase => (
            <Card key={phase.id}>
              {/* Same content as above for current phase */}
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-md">{phase.name}</CardTitle>
                  {getStatusIndicator(phase.status)}
                </div>
                <div className="text-sm text-gray-500 flex justify-between items-center">
                  <div>
                    {new Date(phase.startDate).toLocaleDateString()} - {new Date(phase.endDate).toLocaleDateString()}
                  </div>
                  <div className="font-medium">{phase.progress}% complete</div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={phase.progress} className="h-2 mb-4" />
                
                <div className="space-y-3">
                  {phase.tasks.map(task => (
                    <div key={task.id} className="border rounded-md p-3 text-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{task.title}</div>
                        <div className="flex space-x-2">
                          {getPriorityBadge(task.priority)}
                          {getStatusIndicator(task.status)}
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm mb-2">{task.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <div>Assignee: {task.assignee || 'Unassigned'}</div>
                        {task.dueDate && <div>Due: {new Date(task.dueDate).toLocaleDateString()}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4">
          {phases.filter(phase => phase.status === 'not-started').map(phase => (
            <Card key={phase.id}>
              {/* Same content as above for upcoming phases */}
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-md">{phase.name}</CardTitle>
                  {getStatusIndicator(phase.status)}
                </div>
                <div className="text-sm text-gray-500 flex justify-between items-center">
                  <div>
                    {new Date(phase.startDate).toLocaleDateString()} - {new Date(phase.endDate).toLocaleDateString()}
                  </div>
                  <div className="font-medium">{phase.progress}% complete</div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={phase.progress} className="h-2 mb-4" />
                
                <div className="space-y-3">
                  {phase.tasks.map(task => (
                    <div key={task.id} className="border rounded-md p-3 text-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{task.title}</div>
                        <div className="flex space-x-2">
                          {getPriorityBadge(task.priority)}
                          {getStatusIndicator(task.status)}
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm mb-2">{task.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <div>Assignee: {task.assignee || 'Unassigned'}</div>
                        {task.dueDate && <div>Due: {new Date(task.dueDate).toLocaleDateString()}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectAuditDashboard;
