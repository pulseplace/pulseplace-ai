
import React from 'react';
import { Card } from "@/components/ui/card";
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import DashboardOverview from './DashboardOverview';

const DashboardUI = () => {
  return (
    <Card className="overflow-hidden border-2 border-gray-200 shadow-xl">
      <div className="flex flex-col md:flex-row">
        <DashboardSidebar />
        <div className="flex flex-col flex-grow">
          <DashboardHeader />
          <DashboardOverview />
        </div>
      </div>
    </Card>
  );
};

export default DashboardUI;
