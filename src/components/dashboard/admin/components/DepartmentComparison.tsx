
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DepartmentStats } from '../AdminDashboardService';

interface DepartmentComparisonProps {
  departmentStats: DepartmentStats[];
}

const DepartmentComparison: React.FC<DepartmentComparisonProps> = ({ departmentStats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Department PulseScore™ Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {departmentStats.map((dept, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{dept.department}</span>
                <span className="text-sm text-gray-500">{dept.score}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    dept.score >= 85 ? 'bg-green-600' : 
                    dept.score >= 70 ? 'bg-blue-600' : 
                    dept.score >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                  }`} 
                  style={{ width: `${dept.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentComparison;
