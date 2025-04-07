
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, RadarChart, Radar, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, ReferenceLine
} from 'recharts';
import { calculateZScore } from './utils/analyticsUtils';
import Label from './Label';

// Shared color constants
import { COLORS, CustomTooltip } from './utils/chartConfig';

// Sample data
import { trendData } from './data/analyticsData';

interface TrendsTabContentProps {
  chartType: string;
  visibleMetrics: {
    pulseScore: boolean;
    benchmarks: boolean;
    [key: string]: boolean;
  };
}

const TrendsTabContent: React.FC<TrendsTabContentProps> = ({ 
  chartType, 
  visibleMetrics 
}) => {
  return (
    <div className="space-y-4">
      {visibleMetrics.pulseScore && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 shadow-sm">
            <div className="text-sm font-medium mb-1">PulseScore™</div>
            <div className="text-2xl font-bold">{trendData[trendData.length - 1].pulseScore}</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              5% from previous period
            </div>
          </Card>
          <Card className="p-4 shadow-sm">
            <div className="text-sm font-medium mb-1">Sentiment Score</div>
            <div className="text-2xl font-bold">{trendData[trendData.length - 1].sentiment}</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              3% from previous period
            </div>
          </Card>
          <Card className="p-4 shadow-sm">
            <div className="text-sm font-medium mb-1">Response Rate</div>
            <div className="text-2xl font-bold">{trendData[trendData.length - 1].responseRate}%</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              2% from previous period
            </div>
          </Card>
        </div>
      )}
      
      <div className="bg-white p-4 rounded-lg border h-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">PulseScore™ Trends Over Time</h3>
          {visibleMetrics.benchmarks && (
            <div className="flex items-center">
              <div className="h-2 w-2 bg-gray-400 mr-1"></div>
              <span className="text-xs text-gray-500">Industry Benchmark</span>
            </div>
          )}
        </div>
        <ResponsiveContainer width="100%" height="90%">
          {chartType === 'line' ? (
            <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="pulseScore" 
                stroke={COLORS.pulseScore} 
                name="PulseScore" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="sentiment" 
                stroke={COLORS.sentiment} 
                name="Sentiment"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="responseRate" 
                stroke={COLORS.responseRate} 
                name="Response Rate"
                strokeWidth={2}
              />
              {visibleMetrics.benchmarks && (
                <Line 
                  type="monotone" 
                  dataKey="benchmark" 
                  stroke={COLORS.benchmark}
                  strokeDasharray="5 5" 
                  name="Industry Benchmark"
                  strokeWidth={1}
                />
              )}
              {/* Threshold reference line */}
              <ReferenceLine y={60} stroke="red" strokeDasharray="3 3">
                <g>
                  <Label value="At Risk Threshold" position="insideBottomRight" />
                </g>
              </ReferenceLine>
            </LineChart>
          ) : chartType === 'bar' ? (
            <BarChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="pulseScore" fill={COLORS.pulseScore} name="PulseScore" />
              <Bar dataKey="sentiment" fill={COLORS.sentiment} name="Sentiment" />
              <Bar dataKey="responseRate" fill={COLORS.responseRate} name="Response Rate" />
              {visibleMetrics.benchmarks && (
                <Bar dataKey="benchmark" fill={COLORS.benchmark} name="Industry Benchmark" />
              )}
            </BarChart>
          ) : chartType === 'radar' ? (
            <RadarChart outerRadius={150} width={500} height={350} data={trendData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="month" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar name="PulseScore" dataKey="pulseScore" stroke={COLORS.pulseScore} fill={COLORS.pulseScore} fillOpacity={0.6} />
              <Radar name="Sentiment" dataKey="sentiment" stroke={COLORS.sentiment} fill={COLORS.sentiment} fillOpacity={0.6} />
              <Radar name="Response Rate" dataKey="responseRate" stroke={COLORS.responseRate} fill={COLORS.responseRate} fillOpacity={0.6} />
              {visibleMetrics.benchmarks && (
                <Radar name="Industry Benchmark" dataKey="benchmark" stroke={COLORS.benchmark} fill={COLORS.benchmark} fillOpacity={0.4} />
              )}
              <Legend />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          ) : (
            <PieChart>
              <Pie
                data={[
                  { name: 'PulseScore', value: trendData[trendData.length - 1].pulseScore },
                  { name: 'Sentiment', value: trendData[trendData.length - 1].sentiment },
                  { name: 'Response Rate', value: trendData[trendData.length - 1].responseRate },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {[
                  { name: 'PulseScore', value: trendData[trendData.length - 1].pulseScore },
                  { name: 'Sentiment', value: trendData[trendData.length - 1].sentiment },
                  { name: 'Response Rate', value: trendData[trendData.length - 1].responseRate },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={[COLORS.pulseScore, COLORS.sentiment, COLORS.responseRate][index]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Statistical Significance */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-sm font-medium mb-4">Statistical Significance Analysis</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benchmark</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Z-Score</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Change (MoM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm">PulseScore™</td>
                <td className="px-4 py-2 text-sm">{trendData[trendData.length - 1].pulseScore}</td>
                <td className="px-4 py-2 text-sm">{trendData[trendData.length - 1].benchmark}</td>
                <td className="px-4 py-2 text-sm">
                  <span className={
                    Number(calculateZScore(trendData[trendData.length - 1].pulseScore, trendData[trendData.length - 1].benchmark)) > 1 
                      ? "text-green-600" 
                      : Number(calculateZScore(trendData[trendData.length - 1].pulseScore, trendData[trendData.length - 1].benchmark)) < -1
                        ? "text-red-600"
                        : "text-amber-600"
                  }>
                    {calculateZScore(trendData[trendData.length - 1].pulseScore, trendData[trendData.length - 1].benchmark)}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-green-600">+1.2%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm">Sentiment</td>
                <td className="px-4 py-2 text-sm">{trendData[trendData.length - 1].sentiment}</td>
                <td className="px-4 py-2 text-sm">76</td>
                <td className="px-4 py-2 text-sm">
                  <span className="text-green-600">0.60</span>
                </td>
                <td className="px-4 py-2 text-sm text-green-600">+1.0%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm">Response Rate</td>
                <td className="px-4 py-2 text-sm">{trendData[trendData.length - 1].responseRate}%</td>
                <td className="px-4 py-2 text-sm">82%</td>
                <td className="px-4 py-2 text-sm">
                  <span className="text-green-600">0.50</span>
                </td>
                <td className="px-4 py-2 text-sm text-green-600">+2.3%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrendsTabContent;
