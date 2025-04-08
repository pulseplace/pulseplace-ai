
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface FeedbackDistributionChartProps {
  positive: number;
  negative: number;
  isLoading: boolean;
  fullSize?: boolean; // Added optional fullSize prop
}

const FeedbackDistributionChart: React.FC<FeedbackDistributionChartProps> = ({ 
  positive, 
  negative, 
  isLoading,
  fullSize = false // Default to false if not provided
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Distribution</CardTitle>
        <CardDescription>Ratio of positive to negative feedback</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Skeleton className="h-52 w-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={fullSize ? 400 : 250}>
            <BarChart
              data={[
                { name: 'Positive', value: positive },
                { name: 'Negative', value: negative }
              ]}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8">
                <Cell fill="#4ade80" />
                <Cell fill="#f87171" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackDistributionChart;
