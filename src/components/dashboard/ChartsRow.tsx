
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PulseScoreTrend from './PulseScoreTrend';
import PulseScoreBadge from './PulseScoreBadge';

interface ChartsRowProps {
  timeRange: string;
}

const ChartsRow = ({ timeRange }: ChartsRowProps) => {
  // Sample data - in a real implementation, this would come from API/context
  const pulseScoreData = [
    { date: 'Nov 1', score: 62 },
    { date: 'Dec 1', score: 65 },
    { date: 'Jan 1', score: 71 },
    { date: 'Feb 1', score: 68 },
    { date: 'Mar 1', score: 74 },
    { date: 'Apr 1', score: 82 },
  ];
  
  const currentScore = pulseScoreData[pulseScoreData.length - 1].score;
  const previousScore = pulseScoreData[pulseScoreData.length - 2].score;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* PulseScore Badge with Trend */}
      <Card className="lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">PulseScore™</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center pt-0">
          <PulseScoreBadge 
            score={currentScore} 
            previousScore={previousScore}
            size="lg"
          />
        </CardContent>
      </Card>
      
      {/* PulseScore Trend Chart */}
      <div className="lg:col-span-2">
        <PulseScoreTrend data={pulseScoreData} />
      </div>
    </div>
  );
};

export default ChartsRow;
