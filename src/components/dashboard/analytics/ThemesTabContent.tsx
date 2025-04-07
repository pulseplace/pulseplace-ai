
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, RadarChart, Radar, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { COLORS, CustomTooltip } from './utils/chartConfig';
import { themeData } from './data/analyticsData';

const ThemesTabContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border h-[400px]">
          <h3 className="text-sm font-medium mb-4">Theme Frequency</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={themeData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="frequency" fill={COLORS.pulseScore} name="Mention Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-4 rounded-lg border h-[400px]">
          <h3 className="text-sm font-medium mb-4">Theme Sentiment</h3>
          <ResponsiveContainer width="100%" height="90%">
            <RadarChart outerRadius={150} width={500} height={350} data={themeData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar name="Sentiment Score" dataKey="sentiment" stroke={COLORS.sentiment} fill={COLORS.sentiment} fillOpacity={0.6} />
              <Legend />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-sm font-medium mb-4">Theme Co-occurrence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary Theme</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Secondary Theme</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Co-occurrence %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-sm">Work-Life Balance</td>
                  <td className="px-4 py-2 text-sm">Management</td>
                  <td className="px-4 py-2 text-sm">68%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm">Career Growth</td>
                  <td className="px-4 py-2 text-sm">Compensation</td>
                  <td className="px-4 py-2 text-sm">57%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm">Culture</td>
                  <td className="px-4 py-2 text-sm">Team Dynamics</td>
                  <td className="px-4 py-2 text-sm">72%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm">Tools & Resources</td>
                  <td className="px-4 py-2 text-sm">Management</td>
                  <td className="px-4 py-2 text-sm">42%</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Insights:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Work-life balance concerns are strongly correlated with management discussions</li>
                <li>Career growth and compensation are frequently mentioned together</li>
                <li>Culture and team dynamics show the strongest correlation in feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemesTabContent;
