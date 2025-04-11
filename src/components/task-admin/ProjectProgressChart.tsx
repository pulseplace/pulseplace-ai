
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ProjectPhase } from './ProjectAuditDashboard';

interface ProjectProgressChartProps {
  phases: ProjectPhase[];
}

const ProjectProgressChart: React.FC<ProjectProgressChartProps> = ({ phases }) => {
  const [animatedData, setAnimatedData] = useState<any[]>([]);

  // Simulate progressive loading of chart data
  useEffect(() => {
    // Reset data when phases change
    setAnimatedData([]);
    
    // Gradually load each phase with animation
    phases.forEach((phase, index) => {
      setTimeout(() => {
        setAnimatedData(prev => [
          ...prev,
          {
            name: phase.name,
            progress: phase.progress,
            color: phase.status === 'completed' 
              ? '#10b981' // green-500
              : phase.status === 'in-progress' 
                ? '#3b82f6' // blue-500
                : phase.status === 'blocked' 
                  ? '#ef4444' // red-500
                  : '#6b7280' // gray-500
          }
        ]);
      }, 300 * index); // Stagger the animation
    });
  }, [phases]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={animatedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis unit="%" domain={[0, 100]} />
        <Tooltip 
          formatter={(value) => [`${value}%`, 'Progress']}
          labelStyle={{ color: '#111827' }}
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Legend />
        <Bar 
          dataKey="progress" 
          name="Completion Percentage"
          radius={[4, 4, 0, 0]}
          barSize={40}
          fillOpacity={0.9}
          fill={(entry) => entry.color}
          animationDuration={1000}
          animationBegin={0}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProjectProgressChart;
