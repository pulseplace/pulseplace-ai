
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  progressValue?: number;
  progressColor?: string;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
}

interface TeamSummaryStatsProps {
  participationRate: number;
  averageScore: number;
  completedSurveys: number;
  pendingSurveys: number;
  themeScores: {
    theme: string;
    score: number;
  }[];
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  progressValue,
  progressColor = "bg-pulse-gradient",
  trend
}) => (
  <Card>
    <CardContent className="pt-5">
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <div className="flex items-baseline justify-between mb-2">
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className={`text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
            <span className="inline-block mr-1">{trend.isPositive ? '▲' : '▼'}</span>
            {trend.value}% {trend.label}
          </div>
        )}
      </div>
      
      {progressValue !== undefined && (
        <div className="mb-1">
          <Progress value={progressValue} className={progressColor} />
        </div>
      )}
      
      {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
    </CardContent>
  </Card>
);

const TeamSummaryStats: React.FC<TeamSummaryStatsProps> = ({
  participationRate,
  averageScore,
  completedSurveys,
  pendingSurveys,
  themeScores
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Participation Rate"
          value={`${participationRate}%`}
          progressValue={participationRate}
          description={`${completedSurveys} completed, ${pendingSurveys} pending`}
          trend={{
            value: 5,
            label: "from last month",
            isPositive: true
          }}
        />
        
        <StatCard
          title="Average PulseScore™"
          value={averageScore}
          progressValue={averageScore}
          description="Overall team wellness score"
          trend={{
            value: 2,
            label: "from last month",
            isPositive: true
          }}
        />
        
        <StatCard
          title="Survey Completion"
          value={completedSurveys}
          description={`${pendingSurveys} surveys still pending`}
        />
        
        <StatCard
          title="Certification Status"
          value={averageScore >= 80 ? "Certified" : "In Progress"}
          description={averageScore >= 80 ? "Pulse Certified™ badge earned" : `${80 - averageScore} more points needed`}
        />
      </div>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Theme Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themeScores.map((theme, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">{theme.theme}</h4>
                <span className="text-sm font-bold">{theme.score}/100</span>
              </div>
              <Progress value={theme.score} className="mb-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSummaryStats;
