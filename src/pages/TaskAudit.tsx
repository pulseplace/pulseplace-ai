
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import TaskProgressIndicator from '@/components/chat/components/TaskProgressIndicator';
import { TaskProgressList } from '@/components/chat/components/TaskProgressList';
import { TaskDemoPanel } from '@/components/chat/components/TaskDemoPanel';
import ProjectAuditDashboard from '@/components/task-admin/ProjectAuditDashboard';
import MetaTags from '@/components/MetaTags';
import { DashboardProvider } from '@/contexts/DashboardContext';

const TaskAudit: React.FC = () => {
  return (
    <DashboardProvider>
      <div className="container mx-auto py-8 px-4">
        <MetaTags 
          title="Project Task Audit | PulsePlace.ai" 
          description="Track project progress, manage tasks, and monitor beta launch preparation."
        />
        
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Project Task Audit</h1>
            <p className="text-gray-600 mb-6">
              Track project progress, manage tasks, and monitor beta launch preparation.
            </p>
          </div>
          
          <ProjectAuditDashboard />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Task Demo Panel</h2>
                <TaskDemoPanel />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Sample Task States</h2>
                <div className="space-y-4">
                  <TaskProgressIndicator 
                    status="pending"
                    progress={0}
                    title="Database Migration"
                    description="Scheduled for next sprint"
                  />
                  
                  <TaskProgressIndicator 
                    status="in-progress"
                    progress={45}
                    title="User Authentication Improvements"
                    description="Adding social login options"
                  />
                  
                  <TaskProgressIndicator 
                    status="completed"
                    progress={100}
                    title="Dashboard UI Redesign"
                    description="New layout and charts implemented"
                  />
                  
                  <TaskProgressIndicator 
                    status="failed"
                    progress={100}
                    title="Legacy API Integration"
                    description="API deprecation requires new approach"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default TaskAudit;
