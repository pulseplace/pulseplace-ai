
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProjectPhase } from './ProjectAuditDashboard';

interface ProjectProgressChartProps {
  phases: ProjectPhase[];
}

const ProjectProgressChart: React.FC<ProjectProgressChartProps> = ({ phases }) => {
  // Transform phase data for the chart
  const chartData = phases.map(phase => ({
    name: phase.name,
    progress: phase.progress,
    color: phase.status === 'completed' 
      ? '#10b981' // green-500
      : phase.status === 'in-progress' 
        ? '#3b82f6' // blue-500
        : phase.status === 'blocked' 
          ? '#ef4444' // red-500
          : '#6b7280' // gray-500
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
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
        <Bar 
          dataKey="progress" 
          radius={[4, 4, 0, 0]}
          barSize={40}
          fill={(props) => chartData[props.index]?.color || '#3b82f6'}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProjectProgressChart;
