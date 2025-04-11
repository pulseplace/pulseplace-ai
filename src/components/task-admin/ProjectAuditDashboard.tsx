
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, CalendarRange, Clock, Plus, RefreshCw, 
  FileText, Filter, ArrowUpDown, Search 
} from 'lucide-react';
import ProjectProgressChart, { ProjectPhase } from './ProjectProgressChart';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export type { ProjectPhase };

const ProjectAuditDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('progress');
  
  const handleRefresh = () => {
    toast({
      title: "Dashboard Refreshed",
      description: "Project data has been updated.",
    });
  };
  
  const handleAddTask = () => {
    toast({
      title: "Create Task",
      description: "Task creation dialog would open here.",
    });
  };
  
  // Sample project phases for the chart
  const phases: ProjectPhase[] = [
    {
      id: "phase-1",
      name: "Research",
      progress: 100,
      status: "completed",
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      tasks: []
    },
    {
      id: "phase-2",
      name: "Design",
      progress: 85,
      status: "in-progress",
      startDate: "2025-02-01",
      endDate: "2025-02-28",
      tasks: []
    },
    {
      id: "phase-3",
      name: "Development",
      progress: 45,
      status: "in-progress",
      startDate: "2025-03-01",
      endDate: "2025-05-31",
      tasks: []
    },
    {
      id: "phase-4",
      name: "Testing",
      progress: 10,
      status: "in-progress",
      startDate: "2025-06-01",
      endDate: "2025-06-30",
      tasks: []
    },
    {
      id: "phase-5",
      name: "Deployment",
      progress: 0,
      status: "not-started",
      startDate: "2025-07-01",
      endDate: "2025-07-15",
      tasks: []
    }
  ];
  
  // Sample tasks for the tasks list
  const tasks = [
    {
      id: "task-1",
      title: "Update API documentation",
      assignee: "Alex Kim",
      priority: "high",
      dueDate: "2025-04-15",
      status: "in-progress"
    },
    {
      id: "task-2",
      title: "Fix authentication bug",
      assignee: "Jordan Smith",
      priority: "critical",
      dueDate: "2025-04-12",
      status: "in-progress"
    },
    {
      id: "task-3",
      title: "Create dashboard wireframes",
      assignee: "Taylor Johnson",
      priority: "medium",
      dueDate: "2025-04-18",
      status: "not-started"
    },
    {
      id: "task-4",
      title: "Implement dark mode",
      assignee: "Casey Brown",
      priority: "low",
      dueDate: "2025-04-22",
      status: "not-started"
    },
    {
      id: "task-5",
      title: "Conduct user testing",
      assignee: "Riley Garcia",
      priority: "medium",
      dueDate: "2025-04-25",
      status: "not-started"
    }
  ];
  
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <CardTitle>Project Task Audit</CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Monitor project progress and manage tasks
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-gray-500"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleAddTask}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProjectProgressChart phases={phases} />
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm">48%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '48%' }}></div>
                    </div>
                    
                    <div className="pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tasks Completed</span>
                        <span>24/50</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Days Remaining</span>
                        <span>45</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Critical Issues</span>
                        <span className="text-red-500">3</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="pt-4">
              <Link to="/task-summary">
                <Button variant="outline" className="w-full">View Detailed Summary</Button>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="tasks">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search tasks..." className="pl-8 max-w-xs" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="h-4 w-4 mr-1" />
                    Sort
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{task.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.assignee}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            task.priority === 'critical' ? 'bg-red-100 text-red-800' :
                            task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                            task.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {task.priority}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <CalendarRange className="h-4 w-4 mr-1 text-gray-400" />
                            {task.dueDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            task.status === 'completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {task.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline">
            <div className="space-y-6">
              <p className="text-gray-500">Project timeline view would be displayed here, showing task dependencies and critical path.</p>
              
              <div className="border rounded-md p-6 bg-gray-50">
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <h3 className="font-medium">Upcoming Deadlines</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-md border">
                    <div>
                      <p className="font-medium">API Documentation</p>
                      <p className="text-sm text-gray-500">Assigned to Alex Kim</p>
                    </div>
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm text-red-500">Due in 4 days</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white rounded-md border">
                    <div>
                      <p className="font-medium">Authentication Bug Fix</p>
                      <p className="text-sm text-gray-500">Assigned to Jordan Smith</p>
                    </div>
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm text-red-500">Due in 1 day</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white rounded-md border">
                    <div>
                      <p className="font-medium">Dashboard Wireframes</p>
                      <p className="text-sm text-gray-500">Assigned to Taylor Johnson</p>
                    </div>
                    <div className="flex items-center">
                      <CalendarRange className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">Due in 7 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProjectAuditDashboard;
