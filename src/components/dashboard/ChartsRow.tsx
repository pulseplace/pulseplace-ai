
import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Sample data for charts
const pulseScoreData = [
  { month: 'Jan', score: 72 },
  { month: 'Feb', score: 70 },
  { month: 'Mar', score: 75 },
  { month: 'Apr', score: 78 },
  { month: 'May', score: 82 },
  { month: 'Jun', score: 85 },
  { month: 'Jul', score: 83 },
  { month: 'Aug', score: 86 },
];

const departmentData = [
  { department: 'Engineering', score: 84 },
  { department: 'Marketing', score: 79 },
  { department: 'Sales', score: 75 },
  { department: 'Support', score: 81 },
  { department: 'Operations', score: 77 },
];

const ChartsRow = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">PulseScore™ Trend</CardTitle>
          <CardDescription>8-month score evolution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pulseScoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#9333ea" fill="#e9d5ff" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Department Comparison</CardTitle>
          <CardDescription>PulseScore™ by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[60, 100]} />
                <YAxis dataKey="department" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsRow;
