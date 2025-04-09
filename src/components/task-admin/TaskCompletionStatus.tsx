
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface TaskCompletionStatusProps {
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  pendingTasks: number;
}

const TaskCompletionStatus: React.FC<TaskCompletionStatusProps> = ({
  totalTasks,
  completedTasks,
  failedTasks,
  pendingTasks
}) => {
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const inProgressTasks = totalTasks - completedTasks - failedTasks - pendingTasks;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Task Completion Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Completion Rate</span>
              <span className="text-sm font-medium">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-md p-3 flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <div className="text-sm font-medium">Completed</div>
                <div className="text-lg font-bold">{completedTasks}</div>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-md p-3 flex items-center">
              <Clock className="h-5 w-5 text-yellow-600 mr-2" />
              <div>
                <div className="text-sm font-medium">In Progress</div>
                <div className="text-lg font-bold">{inProgressTasks}</div>
              </div>
            </div>
            
            <div className="bg-red-50 rounded-md p-3 flex items-center">
              <XCircle className="h-5 w-5 text-red-600 mr-2" />
              <div>
                <div className="text-sm font-medium">Failed</div>
                <div className="text-lg font-bold">{failedTasks}</div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-md p-3 flex items-center">
              <Clock className="h-5 w-5 text-gray-600 mr-2" />
              <div>
                <div className="text-sm font-medium">Pending</div>
                <div className="text-lg font-bold">{pendingTasks}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCompletionStatus;
