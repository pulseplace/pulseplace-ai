
import React, { useEffect } from 'react';
import { useTaskRunner } from './hooks/useTaskRunner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const TaskRunner: React.FC = () => {
  const { currentTask, isRunning, lastError, completedTasks, runTaskLoop } = useTaskRunner(true);

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
      <CardContent>
        {currentTask ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Current Task:</h3>
            <div className="bg-muted p-3 rounded-md">
              <p className="font-medium">{currentTask.task_title}</p>
              {currentTask.task_description && (
                <p className="text-sm text-muted-foreground mt-1">{currentTask.task_description}</p>
              )}
            </div>
            <Progress value={45} className="h-2" />
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground">
              {completedTasks.length > 0 
                ? "All pending tasks completed" 
                : "No active tasks"}
            </p>
          </div>
        )}

        {lastError && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
            {lastError}
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Completed Tasks: {completedTasks.length}</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {completedTasks.map((task) => (
              <div key={task.id} className="flex items-center text-sm">
                <Badge variant="outline" className="mr-2">Done</Badge>
                <span>{task.task_title}</span>
              </div>
            ))}
          </div>
        </div>

        <Button 
          className="w-full mt-6" 
          onClick={() => runTaskLoop()} 
          disabled={isRunning}
        >
          Run Task Check
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskRunner;
