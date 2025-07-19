
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ClipboardList, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TaskAudit = () => {
  const auditItems = [
    { id: 1, task: "Survey deployment system", status: "completed", priority: "high" },
    { id: 2, task: "AI analysis engine", status: "in-progress", priority: "high" },
    { id: 3, task: "Certification module", status: "pending", priority: "medium" },
    { id: 4, task: "Dashboard optimization", status: "completed", priority: "low" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      default:
        return <ClipboardList className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Task Audit | PulsePlace.ai</title>
        <meta name="description" content="Monitor and audit project tasks and development progress." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Task Audit Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monitor project progress and audit task completion across all development streams.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Current Sprint Tasks</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {auditItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(item.status)}
                      <span className="font-medium">{item.task}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.priority === 'high' ? 'bg-red-100 text-red-800' :
                        item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.priority}
                      </span>
                      <span className={`capitalize px-2 py-1 text-xs rounded-full ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800' :
                        item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="mr-4">
              Export Report
            </Button>
            <Button className="bg-pulse-gradient">
              Update Tasks
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskAudit;
