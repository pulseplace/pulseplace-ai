
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { category: 'Leadership', positive: 75, neutral: 15, negative: 10 },
  { category: 'Communication', positive: 65, neutral: 20, negative: 15 },
  { category: 'Work Environment', positive: 80, neutral: 10, negative: 10 },
  { category: 'Career Growth', positive: 60, neutral: 25, negative: 15 },
  { category: 'Team Dynamics', positive: 70, neutral: 20, negative: 10 },
];

const SentimentAnalysis = () => {
  return (
    <Card className="col-span-4 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="category" type="category" width={120} />
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
                                backgroundColor: entry.name === 'positive' 
                                  ? '#10b981' 
                                  : entry.name === 'neutral' 
                                    ? '#6b7280' 
                                    : '#ef4444' 
                              }} 
                            />
                            <p className="text-sm capitalize">
                              {entry.name}: {entry.value}%
                            </p>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="positive" 
                stackId="a" 
                fill="#10b981" 
                name="Positive"
              />
              <Bar 
                dataKey="neutral" 
                stackId="a" 
                fill="#6b7280" 
                name="Neutral"
              />
              <Bar 
                dataKey="negative" 
                stackId="a" 
                fill="#ef4444" 
                name="Negative"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-sm text-gray-600">Positive</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500" />
            <span className="text-sm text-gray-600">Neutral</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm text-gray-600">Negative</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentAnalysis;
