
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, FileText, Users, Settings } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">PulsePlace Dashboard</h1>
      <p className="text-gray-600 mb-8">View your organization's culture insights and certification status.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-pulse-600" />
              PulseBot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Chat with our AI assistant about workplace culture.
            </p>
            <Link to="/pulsebot">
              <Button variant="outline" className="w-full">Open PulseBot</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-pulse-600" />
              Team Dashboards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              View team-specific culture analytics.
            </p>
            <Link to="/dashboard/teams">
              <Button variant="outline" className="w-full">View Teams</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-pulse-600" />
              Certification Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Track certification progress and status.
            </p>
            <Link to="/dashboard/certification">
              <Button variant="outline" className="w-full">View Report</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-pulse-600" />
              Admin View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Manage organization settings and users.
            </p>
            <Link to="/dashboard/admin">
              <Button variant="outline" className="w-full">Open Admin</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
