
import React from 'react';
import { 
  Check, 
  Clock, 
  Smartphone, 
  Search, 
  Download, 
  Bug, 
  MessageSquare, 
  FileDown 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface QATask {
  category: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low' | 'Post-Demo';
  status: 'Completed' | 'In Progress' | 'Not Started' | 'Planned';
  icon: React.ReactNode;
}

const QASprintChecklist = () => {
  const tasks: QATask[] = [
    {
      category: 'Immediate Fixes',
      description: 'QA cross-browser testing for HeroStats, PulseBot, and insight cards',
      priority: 'High',
      status: 'In Progress',
      icon: <Search className="h-5 w-5" />
    },
    {
      category: 'Immediate Fixes',
      description: 'Mobile view optimization: toast placement, timestamp legibility, layout test',
      priority: 'High',
      status: 'In Progress',
      icon: <Smartphone className="h-5 w-5" />
    },
    {
      category: 'PulseBot UX Polish',
      description: 'Add PulseBot tooltip/quick tips (e.g. suggested prompts for demo)',
      priority: 'Medium',
      status: 'Not Started',
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      category: 'Insights Export',
      description: 'Implement export button for insights (mock PDF or CSV ok for demo)',
      priority: 'Medium',
      status: 'In Progress',
      icon: <FileDown className="h-5 w-5" />
    },
    {
      category: 'Code Health Note',
      description: 'TaskSummary.tsx modular refactor post-demo (split into components)',
      priority: 'Post-Demo',
      status: 'Planned',
      icon: <Bug className="h-5 w-5" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Not Started':
        return 'bg-gray-100 text-gray-800';
      case 'Planned':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-amber-100 text-amber-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Post-Demo':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-600 animate-pulse" />;
      case 'Not Started':
        return null;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">
            PulsePlace.ai — Final QA Sprint Checklist (April 2025)
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            Generated on April 13, 2025
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Tracking final tasks before Demo Day
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Task Category</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Task Description</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Priority</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-muted/30">
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-md bg-muted">
                        {task.icon}
                      </div>
                      <span>{task.category}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{task.description}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs ${getStatusColor(task.status)}`}>
                      {getStatusIcon(task.status)}
                      <span>{task.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default QASprintChecklist;
