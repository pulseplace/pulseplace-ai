
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: 'Jan', management: 72, culture: 65, worklife: 78 },
  { month: 'Feb', management: 75, culture: 68, worklife: 80 },
  { month: 'Mar', management: 74, culture: 72, worklife: 79 },
  { month: 'Apr', management: 78, culture: 75, worklife: 82 },
  { month: 'May', management: 82, culture: 78, worklife: 85 },
  { month: 'Jun', management: 85, culture: 80, worklife: 84 },
];

const TeamPulseTrends = () => {
  return (
    <Card className="col-span-4 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Team Pulse Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
              <XAxis dataKey="month" />
              <YAxis domain={[60, 100]} tickCount={5} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
                        <p className="font-semibold">{label}</p>
                        {payload.map((entry) => (
                          <div 
                            key={entry.name}
                            className="flex items-center gap-2"
                          >
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ 
                                backgroundColor: entry.name === 'management' 
                                  ? '#4f46e5' 
                                  : entry.name === 'culture' 
                                    ? '#10b981' 
                                    : '#f59e0b' 
                              }} 
                            />
                            <p className="text-sm capitalize">
                              {entry.name}: {entry.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="management" 
                stroke="#4f46e5" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                name="Management"
              />
              <Line 
                type="monotone" 
                dataKey="culture" 
                stroke="#10b981" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                name="Culture"
              />
              <Line 
                type="monotone" 
                dataKey="worklife" 
                stroke="#f59e0b" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                name="Work/Life"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-600" />
            <span className="text-sm text-gray-600">Management</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-sm text-gray-600">Culture</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-sm text-gray-600">Work/Life</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamPulseTrends;
