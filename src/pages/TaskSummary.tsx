
import React from 'react';
import MetaTags from '@/components/MetaTags';
import TaskCompletionSummary from '@/components/task-admin/TaskCompletionSummary';
import { Card, CardContent } from "@/components/ui/card";
import { ProjectPhase } from '@/components/task-admin/ProjectAuditDashboard';
import ProjectProgressChart from '@/components/task-admin/ProjectProgressChart';

const TaskSummary: React.FC = () => {
  // Sample project phases data for the chart
  const phases: ProjectPhase[] = [
    {
      id: "phase-1",
      name: "Foundation",
      progress: 100,
      status: "completed",
      startDate: "2025-01-01",
      endDate: "2025-02-15",
      tasks: []
    },
    {
      id: "phase-2",
      name: "Core Features",
      progress: 65,
      status: "in-progress",
      startDate: "2025-02-16",
      endDate: "2025-04-15",
      tasks: []
    },
    {
      id: "phase-3",
      name: "Beta Launch",
      progress: 10,
      status: "in-progress",
      startDate: "2025-04-16",
      endDate: "2025-06-01",
      tasks: []
    },
    {
      id: "phase-4",
      name: "Public Release",
      progress: 0,
      status: "not-started",
      startDate: "2025-06-02",
      endDate: "2025-07-15",
      tasks: []
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <MetaTags 
        title="Task Summary | PulsePlace.ai" 
        description="Review task completion statistics and project progress."
      />
      
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Task Summary</h1>
          <p className="text-gray-600 mb-6">
            Review task completion percentages and priority-based statistics for your project.
          </p>
        </div>
        
        <TaskCompletionSummary />
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Project Phase Progress</h2>
              <div className="h-[300px]">
                <ProjectProgressChart phases={phases} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;
