
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, FileText, UserCheck, Search } from 'lucide-react';

interface StatsProps {
  stats: {
    overallScore: number;
    activeSurveys: number;
    responseRate: number;
    insightsGenerated: number;
  };
}

const DashboardStats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Overall PulseScore™</p>
              <div className="text-2xl font-bold text-green-600">{stats.overallScore}/100</div>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <BarChart className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            <span className="text-green-600">▲ 4%</span> from last quarter
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Surveys</p>
              <div className="text-2xl font-bold text-blue-600">{stats.activeSurveys}</div>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            <span>{Math.min(stats.activeSurveys, 2)} closing in next 7 days</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Response Rate</p>
              <div className="text-2xl font-bold text-purple-600">{stats.responseRate}%</div>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            <span className="text-purple-600">▲ 12%</span> from last survey
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Insights Generated</p>
              <div className="text-2xl font-bold text-teal-600">{stats.insightsGenerated}</div>
            </div>
            <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center">
              <Search className="h-6 w-6 text-teal-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            <span>{Math.floor(stats.insightsGenerated / 3)} new this month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
