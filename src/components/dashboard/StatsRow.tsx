
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, 
  Users, 
  TrendingUp, 
  Award 
} from 'lucide-react';

interface StatsRowProps {
  timeRange?: string;
}

const StatsRow: React.FC<StatsRowProps> = ({ timeRange = '30days' }) => {
  // Calculate stats based on time range
  const getStats = () => {
    switch(timeRange) {
      case '7days':
        return {
          pulseScore: 85,
          previousPulseScore: 83,
          responseRate: 92,
          previousResponseRate: 90,
          employeesEngaged: 148,
          previousEmployeesEngaged: 142,
          insights: 12,
          previousInsights: 8
        };
      case '90days':
        return {
          pulseScore: 83,
          previousPulseScore: 76,
          responseRate: 87,
          previousResponseRate: 72,
          employeesEngaged: 235,
          previousEmployeesEngaged: 180,
          insights: 42,
          previousInsights: 28
        };
      case 'year':
        return {
          pulseScore: 87,
          previousPulseScore: 68,
          responseRate: 85,
          previousResponseRate: 65,
          employeesEngaged: 280,
          previousEmployeesEngaged: 140,
          insights: 96,
          previousInsights: 48
        };
      case '30days':
      default:
        return {
          pulseScore: 86,
          previousPulseScore: 82,
          responseRate: 89,
          previousResponseRate: 85,
          employeesEngaged: 212,
          previousEmployeesEngaged: 195,
          insights: 24,
          previousInsights: 18
        };
    }
  };
  
  const stats = getStats();
  const pulseScoreChange = stats.pulseScore - stats.previousPulseScore;
  const responseRateChange = stats.responseRate - stats.previousResponseRate;
  const employeesChange = stats.employeesEngaged - stats.previousEmployeesEngaged;
  const insightsChange = stats.insights - stats.previousInsights;
  
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
              <p className="text-2xl font-bold">{stats.insights}</p>
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
