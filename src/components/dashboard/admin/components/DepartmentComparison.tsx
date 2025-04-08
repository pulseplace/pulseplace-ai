
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DepartmentStats } from '../AdminDashboardService';
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface DepartmentComparisonProps {
  departmentStats: DepartmentStats[];
}

const DepartmentComparison: React.FC<DepartmentComparisonProps> = ({ departmentStats }) => {
  // Sort departments by score (highest first)
  const sortedStats = [...departmentStats].sort((a, b) => b.score - a.score);
  
  // Get relative performance data
  const averageScore = sortedStats.reduce((sum, dept) => sum + dept.score, 0) / 
                       (sortedStats.length || 1);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Department PulseScore™ Comparison</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info size={16} className="text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-sm">
                PulseScore™ comparison across departments helps identify areas of strength and 
                opportunities for improvement in organizational culture.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedStats.map((dept, index) => (
            <div key={index} className="group">
              <div className="flex justify-between mb-1">
                <div className="flex items-center">
                  <span className="text-sm font-medium">{dept.department}</span>
                  {dept.score > averageScore + 10 && (
                    <span className="ml-2 text-xs px-1.5 py-0.5 bg-green-100 text-green-800 rounded">
                      Top Performer
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className={`text-sm ${
                    dept.score >= 85 ? 'text-green-600' : 
                    dept.score >= 70 ? 'text-blue-600' : 
                    dept.score >= 50 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {dept.score}/100
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({dept.responseCount} {dept.responseCount === 1 ? 'response' : 'responses'})
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 group-hover:h-3 transition-all">
                <div 
                  className={`h-full rounded-full transition-all ${
                    dept.score >= 85 ? 'bg-green-600' : 
                    dept.score >= 70 ? 'bg-blue-600' : 
                    dept.score >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                  }`} 
                  style={{ width: `${dept.score}%` }}
                ></div>
              </div>
              {index === 0 && (
                <div className="mt-1 text-xs text-green-600">
                  Highest performing department
                </div>
              )}
              {dept.score < 60 && (
                <div className="mt-1 text-xs text-red-600">
                  Requires attention
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Average department score:</span>
            <span className="font-medium">{Math.round(averageScore)}/100</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentComparison;
