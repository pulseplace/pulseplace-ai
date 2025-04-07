import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, RadarChart, Radar, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter
} from 'recharts';
import { 
  Download, Filter, Calendar, BarChart3, PieChart as PieChartIcon,
  LineChart as LineChartIcon, ArrowUpRight, Layers, AlertTriangle,
  FileText, Users, TrendingUp, BrainCircuit
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AdvancedAnalytics = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('trends');
  const [timePeriod, setTimePeriod] = useState('1year');
  const [department, setDepartment] = useState('all');
  const [chartType, setChartType] = useState('line');
  
  // Sample data - in a real app this would be fetched from an API
  const trendData = [
    { month: 'Jan', pulseScore: 81, sentiment: 77, responseRate: 85 },
    { month: 'Feb', pulseScore: 82, sentiment: 78, responseRate: 82 },
    { month: 'Mar', pulseScore: 80, sentiment: 76, responseRate: 80 },
    { month: 'Apr', pulseScore: 79, sentiment: 74, responseRate: 83 },
    { month: 'May', pulseScore: 81, sentiment: 77, responseRate: 86 },
    { month: 'Jun', pulseScore: 83, sentiment: 79, responseRate: 84 },
    { month: 'Jul', pulseScore: 84, sentiment: 81, responseRate: 85 },
    { month: 'Aug', pulseScore: 85, sentiment: 82, responseRate: 87 },
    { month: 'Sep', pulseScore: 87, sentiment: 83, responseRate: 88 },
    { month: 'Oct', pulseScore: 86, sentiment: 82, responseRate: 86 },
    { month: 'Nov', pulseScore: 85, sentiment: 81, responseRate: 85 },
    { month: 'Dec', pulseScore: 86, sentiment: 82, responseRate: 87 }
  ];
  
  const themeData = [
    { name: 'Work-Life Balance', frequency: 245, sentiment: 78 },
    { name: 'Career Growth', frequency: 190, sentiment: 65 },
    { name: 'Team Dynamics', frequency: 210, sentiment: 82 },
    { name: 'Management', frequency: 180, sentiment: 77 },
    { name: 'Compensation', frequency: 150, sentiment: 60 },
    { name: 'Culture', frequency: 220, sentiment: 86 },
    { name: 'Tools & Resources', frequency: 160, sentiment: 73 },
  ];
  
  const benchmarkData = [
    { name: 'Overall Score', value: 86, benchmark: 78 },
    { name: 'Emotion Index', value: 82, benchmark: 74 },
    { name: 'Engagement', value: 88, benchmark: 77 },
    { name: 'Trust', value: 85, benchmark: 76 },
    { name: 'Alignment', value: 81, benchmark: 73 },
    { name: 'Recognition', value: 83, benchmark: 75 },
  ];
  
  const attritionData = [
    { id: 1, department: 'Engineering', risk: 'low', score: 15, employees: 42 },
    { id: 2, department: 'Sales', risk: 'medium', score: 35, employees: 24 },
    { id: 3, department: 'Customer Support', risk: 'high', score: 72, employees: 18 },
    { id: 4, department: 'Marketing', risk: 'medium', score: 45, employees: 12 },
    { id: 5, department: 'HR', risk: 'low', score: 20, employees: 8 },
    { id: 6, department: 'Product', risk: 'low', score: 18, employees: 15 },
  ];
  
  // Dashboard colors
  const COLORS = {
    pulseScore: '#9B87F5',
    sentiment: '#22C55E',
    responseRate: '#3B82F6',
    low: '#22C55E',
    medium: '#EAB308',
    high: '#EF4444',
    secondary: '#6E59A5',
    tertiary: '#1EAEDB',
  };
  
  // Color array for pie charts
  const PIE_COLORS = ['#9B87F5', '#22C55E', '#3B82F6', '#EAB308', '#EC4899', '#6366F1', '#14B8A6'];
  
  // Custom tooltip content
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`tooltip-${index}`} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
  
    return null;
  };
  
  // Handle export functionality
  const handleExport = (format: string) => {
    toast({
      title: `Export as ${format.toUpperCase()}`,
      description: `Analytics data exported as ${format.toUpperCase()} file`
    });
  };
  
  // Get risk color
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return COLORS.low;
      case 'medium':
        return COLORS.medium;
      case 'high':
        return COLORS.high;
      default:
        return COLORS.low;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <CardTitle>Advanced Analytics Dashboard</CardTitle>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('csv')}
                className="text-xs"
              >
                <FileText className="h-3.5 w-3.5 mr-1" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('excel')}
                className="text-xs"
              >
                <FileText className="h-3.5 w-3.5 mr-1" />
                Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('pdf')}
                className="text-xs"
              >
                <Download className="h-3.5 w-3.5 mr-1" />
                PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <Label className="text-xs font-medium mb-1 block">Time Period</Label>
              <Select 
                value={timePeriod} 
                onValueChange={setTimePeriod}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="2years">Last 2 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs font-medium mb-1 block">Department</Label>
              <Select 
                value={department} 
                onValueChange={setDepartment}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs font-medium mb-1 block">Chart Type</Label>
              <Select 
                value={chartType} 
                onValueChange={setChartType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select chart type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="radar">Radar Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button className="w-full" size="sm">
                <Filter className="h-3.5 w-3.5 mr-1" />
                Apply Filters
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="trends" className="text-xs">
                <TrendingUp className="h-3.5 w-3.5 mr-1" />
                Time Trends
              </TabsTrigger>
              <TabsTrigger value="themes" className="text-xs">
                <Layers className="h-3.5 w-3.5 mr-1" />
                Theme Analysis
              </TabsTrigger>
              <TabsTrigger value="benchmarks" className="text-xs">
                <BarChart3 className="h-3.5 w-3.5 mr-1" />
                Benchmarks
              </TabsTrigger>
              <TabsTrigger value="attrition" className="text-xs">
                <BrainCircuit className="h-3.5 w-3.5 mr-1" />
                Attrition Prediction
              </TabsTrigger>
            </TabsList>
            
            {/* Time Trends Tab */}
            <TabsContent value="trends">
              <div className="space-y-4">
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
                
                <div className="bg-white p-4 rounded-lg border h-[400px]">
                  <h3 className="text-sm font-medium mb-4">PulseScore™ Trends Over Time</h3>
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
                      </BarChart>
                    ) : chartType === 'radar' ? (
                      <RadarChart outerRadius={150} width={500} height={350} data={trendData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="month" />
                        <PolarRadiusAxis domain={[0, 100]} />
                        <Radar name="PulseScore" dataKey="pulseScore" stroke={COLORS.pulseScore} fill={COLORS.pulseScore} fillOpacity={0.6} />
                        <Radar name="Sentiment" dataKey="sentiment" stroke={COLORS.sentiment} fill={COLORS.sentiment} fillOpacity={0.6} />
                        <Radar name="Response Rate" dataKey="responseRate" stroke={COLORS.responseRate} fill={COLORS.responseRate} fillOpacity={0.6} />
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
              </div>
            </TabsContent>
            
            {/* Theme Analysis Tab */}
            <TabsContent value="themes">
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
            </TabsContent>
            
            {/* Benchmarks Tab */}
            <TabsContent value="benchmarks">
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
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {benchmarkData.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 text-sm">{item.name}</td>
                            <td className="px-4 py-2 text-sm">{item.value}</td>
                            <td className="px-4 py-2 text-sm">{item.benchmark}</td>
                            <td className="px-4 py-2 text-sm">
                              <span className={`${item.value > item.benchmark ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                                {item.value > item.benchmark ? '+' : ''}{item.value - item.benchmark}
                                {item.value > item.benchmark ? (
                                  <ArrowUpRight className="h-3 w-3 ml-1 text-green-600" />
                                ) : (
                                  <ArrowUpRight className="h-3 w-3 ml-1 text-red-600 transform rotate-90" />
                                )}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border">
                    <h3 className="text-sm font-medium mb-4">Percentile Ranking</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium">Overall Score</span>
                          <span className="text-xs font-medium">82nd Percentile</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-pulse-600 rounded-full" style={{ width: '82%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium">Emotion Index</span>
                          <span className="text-xs font-medium">78th Percentile</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-pulse-600 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium">Engagement</span>
                          <span className="text-xs font-medium">85th Percentile</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-pulse-600 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium">Trust</span>
                          <span className="text-xs font-medium">80th Percentile</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-pulse-600 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Attrition Prediction Tab */}
            <TabsContent value="attrition">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Overall Attrition Risk</h3>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                        <span className="text-xs font-medium">Medium</span>
                      </div>
                    </div>
                    <div className="text-3xl font-bold mt-2">24%</div>
                    <div className="mt-2 text-xs text-gray-500">Predicted turnover in next 6 months</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">High Risk Employees</h3>
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="text-3xl font-bold mt-2">18</div>
                    <div className="mt-2 text-xs text-gray-500">Employees showing critical risk patterns</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Departments at Risk</h3>
                      <Users className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="text-3xl font-bold mt-2">2</div>
                    <div className="mt-2 text-xs text-gray-500">Departments with above-average risk</div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-sm font-medium mb-4">Attrition Risk by Department</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {attritionData.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-2 text-sm">{item.department}</td>
                            <td className="px-4 py-2">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  item.risk === 'high'
                                    ? 'bg-red-100 text-red-800'
                                    : item.risk === 'medium'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                                }`}
                              >
                                {item.risk.charAt(0).toUpperCase() + item.risk.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-sm">{item.score}/100</td>
                            <td className="px-4 py-2 text-sm">{item.employees}</td>
                            <td className="px-4 py-2">
                              <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div 
                                  className="h-2 rounded-full" 
                                  style={{ 
                                    width: `${item.score}%`,
                                    backgroundColor: getRiskColor(item.risk)
                                  }}
                                ></div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-sm font-medium mb-4">Contributing Factors to Attrition Risk</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart 
                        data={[
                          { name: 'Work-Life Balance', value: 78 },
                          { name: 'Career Growth', value: 65 },
                          { name: 'Compensation', value: 52 },
                          { name: 'Management', value: 45 },
                          { name: 'Team Dynamics', value: 38 },
                        ]}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis type="category" dataKey="name" width={100} />
                        <Tooltip />
                        <Bar dataKey="value" name="Impact Score" fill={COLORS.secondary} />
                      </BarChart>
                    </ResponsiveContainer>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded
