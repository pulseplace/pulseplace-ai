
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'Communication', A: 85, B: 65, fullMark: 100 },
  { subject: 'Problem Solving', A: 75, B: 80, fullMark: 100 },
  { subject: 'Teamwork', A: 90, B: 70, fullMark: 100 },
  { subject: 'Technical Skills', A: 65, B: 85, fullMark: 100 },
  { subject: 'Leadership', A: 70, B: 60, fullMark: 100 },
  { subject: 'Adaptability', A: 80, B: 75, fullMark: 100 },
];

const SkillsGapAnalysis = () => {
  return (
    <Card className="col-span-4 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Skills Gap Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Team Capabilities"
                dataKey="A"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.3}
              />
              <Radar
                name="Industry Benchmark"
                dataKey="B"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-600" />
            <span className="text-sm text-gray-600">Your Team</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-sm text-gray-600">Industry Benchmark</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsGapAnalysis;
