
import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SparklineChartProps {
  data: { value: number; timestamp: string }[];
  color: string;
  trend: 'up' | 'down' | 'neutral';
  height?: number;
}

const SparklineChart: React.FC<SparklineChartProps> = ({ 
  data, 
  color, 
  trend, 
  height = 40 
}) => {
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';
  
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-500">Trend</span>
        <span className={`flex items-center text-xs ${trendColor}`}>
          {trend === 'up' ? (
            <><TrendingUp className="h-3 w-3 mr-1" /> Increasing</>
          ) : trend === 'down' ? (
            <><TrendingDown className="h-3 w-3 mr-1" /> Decreasing</>
          ) : null}
        </span>
      </div>
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`sparkline-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white shadow-md rounded p-2 text-xs border">
                      <p className="font-medium">{payload[0].value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              fillOpacity={1}
              fill={`url(#sparkline-${color})`} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SparklineChart;
