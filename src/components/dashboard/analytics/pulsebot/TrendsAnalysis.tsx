
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface TrendData {
  date: string;
  interactions: number;
  positiveRating: number;
  responseTime: number;
}

interface TrendsAnalysisProps {
  data?: TrendData[];
  isLoading: boolean;
}

const TrendsAnalysis: React.FC<TrendsAnalysisProps> = ({ data, isLoading }) => {
  // Generate mock data if none provided
  const chartData = data || generateMockTrendData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>PulseBot Performance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="interactions" 
                stroke="#8884d8" 
                name="Daily Interactions"
                activeDot={{ r: 8 }} 
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="positiveRating" 
                stroke="#4ade80" 
                name="Positive Rating %" 
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="responseTime" 
                stroke="#ff8042" 
                name="Avg Response Time (s)" 
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

// Helper function to generate mock trend data
function generateMockTrendData(): TrendData[] {
  const dates = [
    '2025-03-05', '2025-03-12', '2025-03-19', '2025-03-26', 
    '2025-04-02', '2025-04-09'
  ];
  
  return dates.map(date => ({
    date,
    interactions: Math.floor(Math.random() * 200) + 100,
    positiveRating: Math.floor(Math.random() * 20) + 75, // 75-95%
    responseTime: (Math.random() * 0.8) + 0.8 // 0.8-1.6s
  }));
}

export default TrendsAnalysis;
