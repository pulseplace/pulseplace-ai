
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BarChart3, FileText } from 'lucide-react';

const TeamDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Team Dashboards</h1>
      <p className="text-gray-600 mb-8">View team culture metrics, feedback insights, and certification progress.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-pulse-600" />
              Team Sigma
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Engineering team with 12 members
            </p>
            <Button variant="outline" className="w-full">View Dashboard</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-pulse-600" />
              Team Alpha
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Product team with 8 members
            </p>
            <Button variant="outline" className="w-full">View Dashboard</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-pulse-600" />
              Team Beta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Marketing team with 6 members
            </p>
            <Button variant="outline" className="w-full">View Dashboard</Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-pulse-600" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Performance metrics visualization</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-pulse-600" />
              Certification Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Certification status dashboard</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamDashboard;
