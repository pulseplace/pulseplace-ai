
import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import ExportButtons from './ExportButtons';

const AnalyticsHeader: React.FC = () => {
  return (
    <CardHeader className="pb-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <CardTitle>Advanced Analytics Dashboard</CardTitle>
        <ExportButtons className="mt-2 sm:mt-0" />
      </div>
    </CardHeader>
  );
};

export default AnalyticsHeader;
