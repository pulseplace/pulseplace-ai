
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer 
} from 'recharts';
import { COLORS, CustomTooltip } from './utils/chartConfig';
import { benchmarkData } from './data/analyticsData';

const BenchmarksTabContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg border h-[400px]">
        <h3 className="text-sm font-medium mb-4">Industry Benchmark Comparison</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={benchmarkData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis type="category" dataKey="name" width={100} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" name="Your Score" fill={COLORS.pulseScore} />
            <Bar dataKey="benchmark" name="Industry Average" fill="#94A3B8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-sm font-medium mb-4">Benchmark Summary</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your Score</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry Avg</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {benchmarkData.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-sm">{item.name}</td>
                  <td className="px-4 py-2 text-sm">{item.value}</td>
                  <td className="px-4 py-2 text-sm">{item.benchmark}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={item.value > item.benchmark ? "text-green-600" : "text-red-600"}>
                      {Math.round((item.value / item.benchmark) * 50)}th
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-sm font-medium mb-4">Benchmark Context</h3>
          <div className="text-sm text-gray-600 space-y-4">
            <p>
              Your organization's PulseScore™ is currently <strong>8 points</strong> above the industry average of 78, placing you in the <strong>top 25%</strong> of comparable organizations.
            </p>
            <p>
              The most significant positive differential is in <strong>Culture</strong> (+10 points), while the area with the greatest opportunity for improvement is <strong>Recognition</strong> (+6 points).
            </p>
            <p>
              Based on your industry and company size, your engagement scores show statistically significant positive deviation in 4 out of 6 major dimensions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarksTabContent;
