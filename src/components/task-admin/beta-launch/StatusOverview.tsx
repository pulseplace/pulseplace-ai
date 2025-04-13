
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from 'lucide-react';

const StatusOverview: React.FC = () => {
  return (
    <Card className="bg-blue-50 border-blue-100 mb-8">
      <CardContent className="pt-6">
        <div className="flex items-start">
          <AlertCircle className="text-blue-600 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
          <div>
            <h3 className="font-medium">Current Status Overview</h3>
            <p className="text-sm text-gray-700 mt-1">
              The project is currently in the <span className="font-medium">Core Features Phase (65% complete)</span>, 
              with plans to begin beta onboarding in late April. Development is on track with the 
              exception of the Certification Framework, which requires attention to meet the timeline.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusOverview;
