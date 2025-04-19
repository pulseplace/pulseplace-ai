
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { format } from 'date-fns';
import { getScoreBand, getScoreBandChartColor } from '@/utils/scoreBanding';

interface ScoreDataPoint {
  date: string | Date;
  score: number;
}

interface PulseScoreTrendProps {
  data: ScoreDataPoint[];
  className?: string;
}

const PulseScoreTrend: React.FC<PulseScoreTrendProps> = ({ data, className }) => {
  const chartData = data.map(point => ({
    date: typeof point.date === 'string' ? point.date : format(point.date, 'MMM d'),
    score: point.score,
    band: getScoreBand(point.score)
  }));

  // Calculate min and max for better chart visualization
  const minScore = Math.max(0, Math.min(...chartData.map(d => d.score)) - 10);
  const maxScore = Math.min(100, Math.max(...chartData.map(d => d.score)) + 10);

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">PulseScore™ Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickMargin={10}
              />
              <YAxis 
                domain={[minScore, maxScore]} 
                tick={{ fontSize: 12 }} 
                tickMargin={10}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}`, 'PulseScore']}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              
              {/* Reference lines for score bands */}
              <ReferenceLine y={80} stroke="#10B981" strokeDasharray="3 3" />
              <ReferenceLine y={60} stroke="#F59E0B" strokeDasharray="3 3" />
              <ReferenceLine y={40} stroke="#F97316" strokeDasharray="3 3" />
              
              <Line
                type="monotone"
                dataKey="score"
                stroke="#6366F1"
                strokeWidth={2}
                dot={(props) => {
                  const band = chartData[props.index]?.band;
                  return (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={5}
                      fill={band ? getScoreBandChartColor(band) : '#6366F1'}
                      stroke="white"
                      strokeWidth={2}
                    />
                  );
                }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center mt-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-emerald-500 rounded-full mr-1"></div>
            <span>Thriving (80-100)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
            <span>Stable (60-79)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-1"></div>
            <span>At Risk (40-59)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
            <span>Critical (0-39)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PulseScoreTrend;
