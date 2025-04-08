
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, 
  Users, 
  TrendingUp, 
  Award 
} from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

interface StatsRowProps {
  timeRange?: string;
}

const StatsRow: React.FC<StatsRowProps> = ({ timeRange = '30days' }) => {
  const { stats } = useDashboard();
  
  // Get previous period stats based on time range
  // In a real app, this would come from historical data in the database
  const getPreviousStats = () => {
    switch(timeRange) {
      case '7days':
        return {
          pulseScore: stats.pulseScore - 2,
          responseRate: stats.responseRate - 2,
          employeesEngaged: stats.employeesEngaged - 6,
          insightsGenerated: stats.insightsGenerated - 4
        };
      case '90days':
        return {
          pulseScore: stats.pulseScore - 7,
          responseRate: stats.responseRate - 15,
          employeesEngaged: stats.employeesEngaged - 55,
          insightsGenerated: stats.insightsGenerated - 14
        };
      case 'year':
        return {
          pulseScore: stats.pulseScore - 19,
          responseRate: stats.responseRate - 20,
          employeesEngaged: Math.round(stats.employeesEngaged / 2),
          insightsGenerated: Math.round(stats.insightsGenerated / 2)
        };
      case '30days':
      default:
        return {
          pulseScore: stats.pulseScore - 4,
          responseRate: stats.responseRate - 4,
          employeesEngaged: stats.employeesEngaged - 17,
          insightsGenerated: stats.insightsGenerated - 6
        };
    }
  };
  
  const previousStats = getPreviousStats();
  const pulseScoreChange = stats.pulseScore - previousStats.pulseScore;
  const responseRateChange = stats.responseRate - previousStats.responseRate;
  const employeesChange = stats.employeesEngaged - previousStats.employeesEngaged;
  const insightsChange = stats.insightsGenerated - previousStats.insightsGenerated;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">PulseScore™</p>
              <p className="text-2xl font-bold">{stats.pulseScore}/100</p>
              <p className="text-xs mt-1">
                <span className={pulseScoreChange >= 0 ? "text-green-600" : "text-red-600"}>
                  {pulseScoreChange >= 0 ? "▲" : "▼"} {Math.abs(pulseScoreChange)} points
                </span>
                <span className="text-gray-500"> from previous period</span>
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <BarChart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Response Rate</p>
              <p className="text-2xl font-bold">{stats.responseRate}%</p>
              <p className="text-xs mt-1">
                <span className={responseRateChange >= 0 ? "text-green-600" : "text-red-600"}>
                  {responseRateChange >= 0 ? "▲" : "▼"} {Math.abs(responseRateChange)}%
                </span>
                <span className="text-gray-500"> from previous period</span>
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Employees Engaged</p>
              <p className="text-2xl font-bold">{stats.employeesEngaged}</p>
              <p className="text-xs mt-1">
                <span className={employeesChange >= 0 ? "text-green-600" : "text-red-600"}>
                  {employeesChange >= 0 ? "▲" : "▼"} {Math.abs(employeesChange)}
                </span>
                <span className="text-gray-500"> from previous period</span>
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">AI Insights Generated</p>
              <p className="text-2xl font-bold">{stats.insightsGenerated}</p>
              <p className="text-xs mt-1">
                <span className={insightsChange >= 0 ? "text-green-600" : "text-red-600"}>
                  {insightsChange >= 0 ? "▲" : "▼"} {Math.abs(insightsChange)}
                </span>
                <span className="text-gray-500"> from previous period</span>
              </p>
            </div>
            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsRow;
