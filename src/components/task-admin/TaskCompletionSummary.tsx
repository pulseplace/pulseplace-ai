
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface TaskSummary {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  failedTasks: number;
  highPriorityTasks: number;
  mediumPriorityTasks: number;
  lowPriorityTasks: number;
  highPriorityCompleted: number;
  mediumPriorityCompleted: number;
  lowPriorityCompleted: number;
}

const TaskCompletionSummary: React.FC = () => {
  const { data: taskSummary, isLoading, error } = useQuery({
    queryKey: ['taskSummary'],
    queryFn: async (): Promise<TaskSummary> => {
      const { data: tasks, error } = await supabase
        .from('lovable_tasks')
        .select('*');

      if (error) throw error;

      const summary: TaskSummary = {
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => t.status === 'completed' || t.status === 'done').length,
        pendingTasks: tasks.filter(t => t.status === 'pending').length,
        inProgressTasks: tasks.filter(t => t.status === 'in-progress' || t.status === 'in_progress').length,
        failedTasks: tasks.filter(t => t.status === 'failed' || t.status === 'error').length,
        highPriorityTasks: tasks.filter(t => t.priority === 'high').length,
        mediumPriorityTasks: tasks.filter(t => t.priority === 'medium').length,
        lowPriorityTasks: tasks.filter(t => t.priority === 'low').length,
        highPriorityCompleted: tasks.filter(t => t.priority === 'high' && (t.status === 'completed' || t.status === 'done')).length,
        mediumPriorityCompleted: tasks.filter(t => t.priority === 'medium' && (t.status === 'completed' || t.status === 'done')).length,
        lowPriorityCompleted: tasks.filter(t => t.priority === 'low' && (t.status === 'completed' || t.status === 'done')).length,
      };

      return summary;
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Task Completion Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-64">
            <p>Loading task summary...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !taskSummary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Task Completion Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">Error loading task data. Please try again.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate completion percentages
  const overallCompletionPercentage = 
    taskSummary.totalTasks > 0 ? Math.round((taskSummary.completedTasks / taskSummary.totalTasks) * 100) : 0;
  
  const highPriorityCompletionPercentage = 
    taskSummary.highPriorityTasks > 0 ? Math.round((taskSummary.highPriorityCompleted / taskSummary.highPriorityTasks) * 100) : 0;
  
  const mediumPriorityCompletionPercentage = 
    taskSummary.mediumPriorityTasks > 0 ? Math.round((taskSummary.mediumPriorityCompleted / taskSummary.mediumPriorityTasks) * 100) : 0;
  
  const lowPriorityCompletionPercentage = 
    taskSummary.lowPriorityTasks > 0 ? Math.round((taskSummary.lowPriorityCompleted / taskSummary.lowPriorityTasks) * 100) : 0;

  // Data for the status pie chart
  const statusData = [
    { name: 'Completed', value: taskSummary.completedTasks, color: '#10b981' }, // green
    { name: 'In Progress', value: taskSummary.inProgressTasks, color: '#3b82f6' }, // blue
    { name: 'Pending', value: taskSummary.pendingTasks, color: '#6b7280' }, // gray
    { name: 'Failed', value: taskSummary.failedTasks, color: '#ef4444' }, // red
  ].filter(item => item.value > 0);

  // Data for the priority pie chart
  const priorityData = [
    { name: 'High', value: taskSummary.highPriorityTasks, color: '#ef4444' }, // red
    { name: 'Medium', value: taskSummary.mediumPriorityTasks, color: '#f59e0b' }, // amber
    { name: 'Low', value: taskSummary.lowPriorityTasks, color: '#6b7280' }, // gray
  ].filter(item => item.value > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Completion Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall completion rate */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Overall Completion Rate</span>
              <span className="text-sm font-medium">{overallCompletionPercentage}%</span>
            </div>
            <Progress value={overallCompletionPercentage} className="h-2" />
          </div>

          {/* Priority based completion rates */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Completion by Priority</h3>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">High Priority</span>
                <span className="text-sm">{highPriorityCompletionPercentage}%</span>
              </div>
              <Progress value={highPriorityCompletionPercentage} className="h-2" indicatorClassName="bg-red-500" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Medium Priority</span>
                <span className="text-sm">{mediumPriorityCompletionPercentage}%</span>
              </div>
              <Progress value={mediumPriorityCompletionPercentage} className="h-2" indicatorClassName="bg-amber-500" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Low Priority</span>
                <span className="text-sm">{lowPriorityCompletionPercentage}%</span>
              </div>
              <Progress value={lowPriorityCompletionPercentage} className="h-2" indicatorClassName="bg-gray-500" />
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-sm font-medium mb-2 text-center">Tasks by Status</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Tasks']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2 text-center">Tasks by Priority</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priorityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {priorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Tasks']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Task counts summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="bg-green-50 rounded-md p-3 text-center">
              <div className="text-sm text-gray-600">Completed</div>
              <div className="text-xl font-bold text-green-600">{taskSummary.completedTasks}</div>
            </div>
            
            <div className="bg-blue-50 rounded-md p-3 text-center">
              <div className="text-sm text-gray-600">In Progress</div>
              <div className="text-xl font-bold text-blue-600">{taskSummary.inProgressTasks}</div>
            </div>
            
            <div className="bg-gray-50 rounded-md p-3 text-center">
              <div className="text-sm text-gray-600">Pending</div>
              <div className="text-xl font-bold text-gray-600">{taskSummary.pendingTasks}</div>
            </div>
            
            <div className="bg-red-50 rounded-md p-3 text-center">
              <div className="text-sm text-gray-600">Failed</div>
              <div className="text-xl font-bold text-red-600">{taskSummary.failedTasks}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCompletionSummary;
