
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const data = [
  { name: 'Project A', completed: 20, inProgress: 10, notStarted: 5 },
  { name: 'Project B', completed: 15, inProgress: 8, notStarted: 12 },
  { name: 'Project C', completed: 30, inProgress: 5, notStarted: 2 },
  { name: 'Project D', completed: 10, inProgress: 15, notStarted: 8 },
];

const ProjectProgressChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-medium mb-4">Project Progress</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" stackId="a" fill="#4ade80" name="Completed" />
            <Bar dataKey="inProgress" stackId="a" fill="#facc15" name="In Progress" />
            <Bar dataKey="notStarted" stackId="a" fill="#f87171" name="Not Started" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectProgressChart;
