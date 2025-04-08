
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { 
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { BotAvatarState } from '@/components/chat/types';

interface AvatarStateChartProps {
  avatarStateUsage: {
    state: BotAvatarState;
    count: number;
    percentage: number;
  }[];
  isLoading: boolean;
}

// Chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF6B6B'];

const AvatarStateChart: React.FC<AvatarStateChartProps> = ({ 
  avatarStateUsage, 
  isLoading 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Avatar State Usage</CardTitle>
        <CardDescription>Distribution of bot avatar states during interactions</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Skeleton className="h-52 w-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={avatarStateUsage}
                dataKey="count"
                nameKey="state"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ state, percentage }) => `${state}: ${percentage.toFixed(1)}%`}
              >
                {avatarStateUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} uses`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default AvatarStateChart;
