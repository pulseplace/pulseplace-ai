
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, 
  LineChart, Line, 
  PieChart, Pie, 
  ResponsiveContainer, 
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell,
  Legend, 
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTierDisplay } from '@/utils/scoring';
import { AlertCircle, TrendingUp, TrendingDown, Users, Calendar } from 'lucide-react';

// Sample theme frequency data
const themeFrequencyData = [
  { theme: 'Trust in Leadership', frequency: 78, mentions: 145 },
  { theme: 'Psychological Safety', frequency: 62, mentions: 98 },
  { theme: 'Work-Life Balance', frequency: 85, mentions: 172 },
  { theme: 'Career Growth', frequency: 57, mentions: 124 },
  { theme: 'Compensation', frequency: 45, mentions: 67 },
  { theme: 'Team Collaboration', frequency: 72, mentions: 115 },
];

// Sample time-based trend data
const trendData = [
  { month: 'Jan', pulseScore: 72, sentimentScore: 68, responseRate: 78 },
  { month: 'Feb', pulseScore: 70, sentimentScore: 65, responseRate: 75 },
  { month: 'Mar', pulseScore: 75, sentimentScore: 70, responseRate: 80 },
  { month: 'Apr', pulseScore: 78, sentimentScore: 74, responseRate: 82 },
  { month: 'May', pulseScore: 82, sentimentScore: 78, responseRate: 85 },
  { month: 'Jun', pulseScore: 85, sentimentScore: 80, responseRate: 88 },
  { month: 'Jul', pulseScore: 83, sentimentScore: 79, responseRate: 84 },
  { month: 'Aug', pulseScore: 86, sentimentScore: 82, responseRate: 90 },
];

// Sample industry benchmark data
const benchmarkData = [
  { category: 'Emotion Index', yourScore: 82, industryAvg: 75, topPerformers: 88 },
  { category: 'Engagement Stability', yourScore: 88, industryAvg: 72, topPerformers: 91 },
  { category: 'Culture Trust', yourScore: 85, industryAvg: 70, topPerformers: 89 },
  { category: 'Overall PulseScore', yourScore: 86, industryAvg: 74, topPerformers: 90 },
];

// Sample attrition risk data
const attritionRiskData = [
  { department: 'Engineering', risk: 18, change: -5, riskLevel: 'low' },
  { department: 'Sales', risk: 24, change: 8, riskLevel: 'medium' },
  { department: 'Marketing', risk: 12, change: -3, riskLevel: 'low' },
  { department: 'Customer Support', risk: 32, change: 12, riskLevel: 'high' },
  { department: 'Operations', risk: 22, change: 4, riskLevel: 'medium' },
];

// Sample theme sentiment data for radar chart
const themeRadarData = [
  { theme: 'Leadership', score: 78, fullMark: 100 },
  { theme: 'Safety', score: 62, fullMark: 100 },
  { theme: 'Work-Life', score: 85, fullMark: 100 },
  { theme: 'Growth', score: 57, fullMark: 100 },
  { theme: 'Compensation', score: 45, fullMark: 100 },
  { theme: 'Collaboration', score: 72, fullMark: 100 },
];

const AdvancedAnalytics = () => {
  const [activeTab, setActiveTab] = useState("trends");
  
  const COLORS = ['#4f46e5', '#8b5cf6', '#d946ef', '#f43f5e', '#f59e0b', '#10b981'];
  
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          Advanced Analytics
        </CardTitle>
        <CardDescription>
          AI-powered insights, trends, and predictive indicators
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trends" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="trends">Time Trends</TabsTrigger>
            <TabsTrigger value="themes">Theme Analysis</TabsTrigger>
            <TabsTrigger value="benchmarks">Industry Benchmarks</TabsTrigger>
            <TabsTrigger value="attrition">Attrition Risk</TabsTrigger>
          </TabsList>
          
          {/* Time Trends Tab */}
          <TabsContent value="trends" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pulseScore" stroke="#8b5cf6" name="PulseScore" strokeWidth={2} />
                  <Line type="monotone" dataKey="sentimentScore" stroke="#10b981" name="Sentiment" strokeWidth={2} />
                  <Line type="monotone" dataKey="responseRate" stroke="#3b82f6" name="Response Rate %" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2">AI-Generated Trend Summary</h3>
              <p className="text-gray-700">
                Your organization has shown a consistent upward trend in PulseScore, improving by 19% over the past 8 months. 
                Key drivers include leadership trust improvements (+24%) and better work-life balance satisfaction (+16%). 
                August shows your highest response rate (90%) and PulseScore (86), suggesting increased employee engagement.
              </p>
              <div className="mt-3 flex gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <TrendingUp className="h-3 w-3 mr-1" /> Positive Trend
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Users className="h-3 w-3 mr-1" /> 90% Participation
                </Badge>
              </div>
            </div>
          </TabsContent>
          
          {/* Theme Analysis Tab */}
          <TabsContent value="themes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={themeFrequencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="theme" angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="frequency" name="Frequency %" fill="#8b5cf6">
                      {themeFrequencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={themeRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="theme" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Theme Sentiment" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2">Theme Frequency Analysis</h3>
              <p className="text-gray-700">
                <strong>Work-Life Balance</strong> is the most frequently mentioned theme (85% of responses), followed by 
                <strong> Trust in Leadership</strong> (78%). Areas receiving less attention include <strong>Compensation</strong> (45%) 
                and <strong>Career Growth</strong> (57%), suggesting potential areas for focused improvement.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                {themeFrequencyData.slice(0, 3).map((theme, index) => (
                  <div key={index} className="bg-white p-3 rounded border border-gray-200">
                    <div className="text-sm font-medium">{theme.theme}</div>
                    <div className="text-2xl font-bold" style={{ color: COLORS[index % COLORS.length] }}>{theme.frequency}%</div>
                    <div className="text-xs text-gray-500">{theme.mentions} mentions</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Industry Benchmarks Tab */}
          <TabsContent value="benchmarks" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarkData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="category" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="yourScore" name="Your Score" fill="#8b5cf6" />
                  <Bar dataKey="industryAvg" name="Industry Average" fill="#94a3b8" />
                  <Bar dataKey="topPerformers" name="Top Performers" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2">Industry Benchmark Analysis</h3>
              <p className="text-gray-700">
                Your organization's PulseScore (86) is 16% above the industry average (74) and just 4% below top performers (90). 
                Your strongest differentiator is Engagement Stability at 22% above industry average. 
                All categories exceed the industry average, qualifying your organization for Pulse Certification.
              </p>
              <div className="mt-3 flex gap-2">
                <Badge className="bg-green-100 text-green-800">
                  {getTierDisplay('pulse_certified').label}
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Top 15% in Industry
                </Badge>
              </div>
            </div>
          </TabsContent>
          
          {/* Attrition Risk Tab */}
          <TabsContent value="attrition" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attritionRiskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="risk" name="Attrition Risk %" radius={[4, 4, 0, 0]}>
                      {attritionRiskData.map((entry) => (
                        <Cell 
                          key={`cell-${entry.department}`} 
                          fill={entry.riskLevel === 'high' ? '#ef4444' : entry.riskLevel === 'medium' ? '#f59e0b' : '#10b981'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Low Risk', value: 2 },
                        { name: 'Medium Risk', value: 2 },
                        { name: 'High Risk', value: 1 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: 'Low Risk', value: 2, color: '#10b981' },
                        { name: 'Medium Risk', value: 2, color: '#f59e0b' },
                        { name: 'High Risk', value: 1, color: '#ef4444' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-red-100 text-red-600 rounded-full mt-0.5">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Attrition Risk Alert</h3>
                  <p className="text-gray-700">
                    Customer Support shows a high attrition risk (32%, up 12% from last quarter). 
                    Key contributors include lower psychological safety scores and concerns about work-life balance.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <h4 className="font-medium mb-2">Recommended Actions</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0">1</span>
                    <span>Conduct focused listening sessions with Customer Support team members to identify specific concerns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0">2</span>
                    <span>Review workload distribution and establish clearer boundaries for after-hours support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0">3</span>
                    <span>Implement a targeted recognition program specifically for support team members</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedAnalytics;
