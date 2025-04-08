
import React from 'react';
import TeamAdminDashboard from '@/components/dashboard/TeamAdminDashboard';
import { Card, CardContent } from "@/components/ui/card";

const TeamAdminPage = () => {
  return (
    <div className="container mx-auto py-6">
      <Card className="shadow-md">
        <CardContent className="p-0">
          <TeamAdminDashboard />
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamAdminPage;
