
import React, { useEffect } from 'react';
import { useTaskRunner } from './hooks/useTaskRunner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TaskProgressIndicator from './components/TaskProgressIndicator';
import { useTaskProgress } from './hooks/useTaskProgress';
import { Clock, CheckCircle2, RefreshCw } from 'lucide-react';

const TaskRunner: React.FC = () => {
  const { currentTask, isRunning, lastError, completedTasks, runTaskLoop } = useTaskRunner(true);
  const { activeTasks, recentlyCompletedTasks, refreshTasks } = useTaskProgress({
    autoRefresh: true,
    refreshInterval: 3000
  });

  useEffect(() => {
    console.log('Task runner initialized');
    // Initial run
    runTaskLoop();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>PulseBot Task Runner</span>
          <Badge variant={isRunning ? "default" : "outline"}>
            {isRunning ? "Running" : "Idle"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Show either the current task from useTaskRunner or the active tasks from useTaskProgress */}
        {currentTask ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Current Task:</h3>
            <TaskProgressIndicator
              status="in-progress"
              progress={45}
              title={currentTask.task_title}
              description={currentTask.task_description || undefined}
            />
          </div>
        ) : activeTasks.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Active Tasks:</h3>
            {activeTasks.map(task => (
              <TaskProgressIndicator
                key={task.id}
                status={task.status}
                progress={task.progress}
                title={task.title}
                description={task.description}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="flex flex-col items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
              <p className="text-muted-foreground">
                All pending tasks completed
              </p>
            </div>
          </div>
        )}

        {lastError && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
            {lastError}
          </div>
        )}

        {/* Recently completed tasks section */}
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">
            Completed Tasks: {recentlyCompletedTasks.length || completedTasks.length}
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {/* Use recentlyCompletedTasks from useTaskProgress, fallback to completedTasks from useTaskRunner */}
            {recentlyCompletedTasks.length > 0 ? (
              recentlyCompletedTasks.map((task) => (
                <div key={task.id} className="flex items-center text-sm">
                  <Badge variant="outline" className="mr-2">Done</Badge>
                  <span>{task.title}</span>
                </div>
              ))
            ) : completedTasks.map((task) => (
              <div key={task.id} className="flex items-center text-sm">
                <Badge variant="outline" className="mr-2">Done</Badge>
                <span>{task.task_title}</span>
              </div>
            ))}
          </div>
        </div>

        <Button 
          className="w-full mt-6" 
          onClick={() => {
            runTaskLoop();
            refreshTasks();
          }} 
          disabled={isRunning}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Run Task Check
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskRunner;
