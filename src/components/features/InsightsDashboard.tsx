
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Sector, Cell, 
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Sample data for charts
const pulseScoreData = [
  { month: 'Jan', score: 67, industry: 62 },
  { month: 'Feb', score: 70, industry: 63 },
  { month: 'Mar', score: 73, industry: 65 },
  { month: 'Apr', score: 76, industry: 67 },
  { month: 'May', score: 81, industry: 68 },
  { month: 'Jun', score: 84, industry: 70 }
];

const sentimentData = [
  { name: 'Positive', value: 65 },
  { name: 'Neutral', value: 25 },
  { name: 'Negative', value: 10 }
];

const COLORS = ['#32D27E', '#3F8CFF', '#FF566B'];

const departmentData = [
  { name: 'Engineering', score: 82 },
  { name: 'Marketing', score: 78 },
  { name: 'Sales', score: 74 },
  { name: 'Customer Support', score: 86 },
  { name: 'HR', score: 89 },
  { name: 'Product', score: 80 }
];

const InsightsDashboard = () => {
  const [userView, setUserView] = useState('admin');

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-2">Interactive Dashboard Analytics</h2>
              <p className="text-gray-600">Real-time visualization of your workplace culture metrics</p>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-4 mt-4 md:mt-0 bg-white p-3 rounded-lg shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-medium text-gray-600">View As:</span>
              <div className="flex items-center space-x-2">
                <Label 
                  htmlFor="user-view"
                  className={`text-sm ${userView === 'employee' ? 'text-gray-600' : 'text-pulse-600 font-medium'}`}
                >
                  Admin
                </Label>
                <Switch 
                  id="user-view" 
                  checked={userView === 'employee'}
                  onCheckedChange={(checked) => setUserView(checked ? 'employee' : 'admin')}
                />
                <Label 
                  htmlFor="user-view"
                  className={`text-sm ${userView === 'employee' ? 'text-pulse-600 font-medium' : 'text-gray-600'}`}
                >
                  Employee
                </Label>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Tabs defaultValue="trends" className="w-full">
              <TabsList className="bg-white w-full justify-start mb-6 p-1 overflow-x-auto flex-nowrap">
                <TabsTrigger value="trends" className="px-4">Pulse Score Trends</TabsTrigger>
                <TabsTrigger value="sentiment" className="px-4">Sentiment Analysis</TabsTrigger>
                <TabsTrigger value="department" className="px-4">Department Benchmarks</TabsTrigger>
                {userView === 'admin' && (
                  <TabsTrigger value="predictions" className="px-4">Predictive Insights</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="trends" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Pulse Score Trend Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={pulseScoreData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[50, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            name="Your Score" 
                            stroke="#3F8CFF" 
                            strokeWidth={3} 
                            dot={{ r: 6 }}
                            activeDot={{ r: 8 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="industry" 
                            name="Industry Avg." 
                            stroke="#8A888A" 
                            strokeWidth={2} 
                            strokeDasharray="5 5"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-blue-800">
                        <strong>Key Insight:</strong> Your organization's pulse score has consistently improved over the past 6 months, increasing from 67 to 84, significantly outperforming the industry average.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="sentiment" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Sentiment Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex flex-col md:flex-row items-center justify-center">
                      <div className="w-full md:w-1/2 h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={sentimentData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={110}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                              label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {sentimentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="w-full md:w-1/2 pl-0 md:pl-6 mt-6 md:mt-0">
                        <h4 className="text-lg font-medium mb-4">Sentiment Analysis</h4>
                        <p className="text-gray-600 mb-4">
                          AI-powered analysis of open-ended responses from your team members reveals a predominantly positive sentiment across the organization.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
                            <span className="text-sm text-gray-700">
                              <strong>65% Positive:</strong> Expressions of satisfaction, enthusiasm, and engagement
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-pulse-blue mr-2"></div>
                            <span className="text-sm text-gray-700">
                              <strong>25% Neutral:</strong> Balanced comments with mixed feedback
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-ember-coral mr-2"></div>
                            <span className="text-sm text-gray-700">
                              <strong>10% Negative:</strong> Expressions of concern or dissatisfaction
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="department" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Department Benchmark Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={departmentData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Bar 
                            dataKey="score" 
                            name="Department Score" 
                            fill="#3F8CFF" 
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <h5 className="font-medium text-sm mb-1">Top Performing</h5>
                        <p className="text-xl font-bold text-success">HR Team</p>
                        <p className="text-sm text-gray-600 mt-1">Score: 89/100</p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <h5 className="font-medium text-sm mb-1">Most Improved</h5>
                        <p className="text-xl font-bold text-pulse-blue">Customer Support</p>
                        <p className="text-sm text-gray-600 mt-1">+12 points in 3 months</p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <h5 className="font-medium text-sm mb-1">Attention Needed</h5>
                        <p className="text-xl font-bold text-ember-coral">Sales Team</p>
                        <p className="text-sm text-gray-600 mt-1">Score: 74/100</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {userView === 'admin' && (
                <TabsContent value="predictions" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">AI-Powered Predictive Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-6 space-y-6">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <h4 className="text-lg font-medium text-blue-800 mb-2">Retention Forecast</h4>
                          <p className="text-sm text-blue-700 mb-3">
                            Based on current engagement trends, we predict a 15% improvement in retention rates over the next two quarters.
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-600">Current Retention: 78%</span>
                            <span className="text-xs text-blue-600">Projected: 93%</span>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                          <h4 className="text-lg font-medium text-green-800 mb-2">Culture Growth Areas</h4>
                          <p className="text-sm text-green-700 mb-3">
                            AI analysis suggests focusing on these areas for maximum improvement in overall culture score:
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Career Development</span>
                              <span className="text-xs font-medium bg-green-200 text-green-800 px-2 py-1 rounded">High Impact</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Work-Life Balance</span>
                              <span className="text-xs font-medium bg-green-200 text-green-800 px-2 py-1 rounded">High Impact</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Team Communication</span>
                              <span className="text-xs font-medium bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Medium Impact</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                          <h4 className="text-lg font-medium text-purple-800 mb-2">Next Survey Recommendations</h4>
                          <p className="text-sm text-purple-700 mb-3">
                            Based on current data gaps, we recommend including these focus areas in your next pulse survey:
                          </p>
                          <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                            <li>Team collaboration across departments</li>
                            <li>Professional development opportunities</li>
                            <li>Management effectiveness and support</li>
                            <li>Decision-making transparency</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InsightsDashboard;
