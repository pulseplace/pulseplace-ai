
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TaskSummaryHeaderProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TaskSummaryHeader: React.FC<TaskSummaryHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">Task Summary</h1>
        <Badge className="bg-green-100 text-green-800">AI Integration: 100% Ready</Badge>
      </div>
      <p className="text-gray-600 mb-6">
        Review task completion percentages and priority-based statistics for your project.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="summary">Project Summary</TabsTrigger>
          <TabsTrigger value="beta-plan">Beta Launch Plan</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TaskSummaryHeader;
