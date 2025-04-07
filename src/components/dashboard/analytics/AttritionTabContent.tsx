
import React from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';
import { COLORS, getRiskColor } from './utils/chartConfig';
import { attritionData } from './data/analyticsData';

const AttritionTabContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border col-span-2 h-[400px]">
          <h3 className="text-sm font-medium mb-4">Attrition Risk by Department</h3>
          <ResponsiveContainer width="100%" height="90%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" dataKey="score" name="Risk Score" unit="%" domain={[0, 100]} />
              <YAxis type="number" dataKey="employees" name="Team Size" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'Risk Score' ? `${value}%` : value, 
                  name
                ]}
                labelFormatter={(label) => attritionData.find(item => item.id === label)?.department}
              />
              <Legend />
              <Scatter name="Department" data={attritionData} fill="#8884d8">
                {attritionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getRiskColor(entry.risk)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-sm font-medium mb-4">Risk Breakdown</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-medium text-red-700 mb-1">High Risk Departments</h4>
              <ul className="space-y-2">
                {attritionData
                  .filter(dept => dept.risk === 'high')
                  .map((dept, i) => (
                    <li key={i} className="flex items-center justify-between bg-red-50 p-2 rounded text-sm">
                      <span>{dept.department}</span>
                      <span className="font-medium">{dept.score}%</span>
                    </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-medium text-yellow-700 mb-1">Medium Risk Departments</h4>
              <ul className="space-y-2">
                {attritionData
                  .filter(dept => dept.risk === 'medium')
                  .map((dept, i) => (
                    <li key={i} className="flex items-center justify-between bg-yellow-50 p-2 rounded text-sm">
                      <span>{dept.department}</span>
                      <span className="font-medium">{dept.score}%</span>
                    </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-medium text-green-700 mb-1">Low Risk Departments</h4>
              <ul className="space-y-2">
                {attritionData
                  .filter(dept => dept.risk === 'low')
                  .map((dept, i) => (
                    <li key={i} className="flex items-center justify-between bg-green-50 p-2 rounded text-sm">
                      <span>{dept.department}</span>
                      <span className="font-medium">{dept.score}%</span>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-sm font-medium mb-4">Predicted Attrition Factors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-medium mb-2">Top Predictive Indicators</h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>Low recognition scores in last 2 surveys</li>
              <li>Compensation satisfaction below 65%</li>
              <li>Low manager effectiveness rating</li>
              <li>Reduced participation in team activities</li>
              <li>Sentiment shift in written feedback</li>
            </ol>
          </div>
          
          <div>
            <h4 className="text-xs font-medium mb-2">Recommended Interventions</h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>Schedule listening sessions with Customer Support team</li>
              <li>Conduct compensation benchmarking for Sales roles</li>
              <li>Leadership training for new managers in Marketing</li>
              <li>Recognition program enhancements</li>
              <li>Career path clarification workshops</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttritionTabContent;
