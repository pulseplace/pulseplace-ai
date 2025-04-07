
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
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, RadarChart, Radar, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter,
  ReferenceLine
} from 'recharts';
import { 
  Download, Filter, Calendar, BarChart3, PieChart as PieChartIcon,
  LineChart as LineChartIcon, ArrowUpRight, Layers, AlertTriangle,
  FileText, Users, TrendingUp, BrainCircuit, Settings, Pin,
  FileSpreadsheet, Save, Brain, Clock, MapPin,
  Eye, EyeOff, Calculator, BarChart2, Sparkles, Info
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { addDays, format, subDays, subMonths } from "date-fns";
import * as z from "zod";

// Sample data - in a real app this would be fetched from an API
const trendData = [
  { month: 'Jan', pulseScore: 81, sentiment: 77, responseRate: 85, benchmark: 76 },
  { month: 'Feb', pulseScore: 82, sentiment: 78, responseRate: 82, benchmark: 76 },
  { month: 'Mar', pulseScore: 80, sentiment: 76, responseRate: 80, benchmark: 77 },
  { month: 'Apr', pulseScore: 79, sentiment: 74, responseRate: 83, benchmark: 77 },
  { month: 'May', pulseScore: 81, sentiment: 77, responseRate: 86, benchmark: 78 },
  { month: 'Jun', pulseScore: 83, sentiment: 79, responseRate: 84, benchmark: 78 },
  { month: 'Jul', pulseScore: 84, sentiment: 81, responseRate: 85, benchmark: 79 },
  { month: 'Aug', pulseScore: 85, sentiment: 82, responseRate: 87, benchmark: 79 },
  { month: 'Sep', pulseScore: 87, sentiment: 83, responseRate: 88, benchmark: 80 },
  { month: 'Oct', pulseScore: 86, sentiment: 82, responseRate: 86, benchmark: 80 },
  { month: 'Nov', pulseScore: 85, sentiment: 81, responseRate: 85, benchmark: 81 },
  { month: 'Dec', pulseScore: 86, sentiment: 82, responseRate: 87, benchmark: 81 }
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

// AI-driven insights
const aiInsights = {
  topConcerns: [
    "Work-life balance continues to be the most mentioned concern",
    "Career advancement opportunities seen as limited",
    "Compensation packages viewed as below market value"
  ],
  predictiveFlags: [
    { department: "Customer Support", issue: "Trust Score trending down", severity: "high" },
    { department: "Sales", issue: "Engagement dropped 8% this month", severity: "medium" },
    { department: "Marketing", issue: "Response rate falling", severity: "low" }
  ],
  recommendedActions: [
    "Schedule listening sessions with Customer Support team",
    "Review Sales team quarterly objectives and recognition program",
    "Implement flexible working arrangements to improve work-life balance"
  ]
};

// Dashboard colors
const COLORS = {
  pulseScore: '#9B87F5',
  sentiment: '#22C55E',
  responseRate: '#3B82F6',
  benchmark: '#94A3B8',
  low: '#22C55E',
  medium: '#EAB308',
  high: '#EF4444',
  secondary: '#6E59A5',
  tertiary: '#1EAEDB',
};

// Color array for pie charts
const PIE_COLORS = ['#9B87F5', '#22C55E', '#3B82F6', '#EAB308', '#EC4899', '#6366F1', '#14B8A6'];

const AdvancedAnalytics = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('trends');
  
  // Interactive filtering options
  const [dateRange, setDateRange] = useState({ 
    from: subDays(new Date(), 90), 
    to: new Date() 
  });
  const [department, setDepartment] = useState('all');
  const [location, setLocation] = useState('all');
  const [chartType, setChartType] = useState('line');
  
  // Customizable dashboard options
  const [visibleMetrics, setVisibleMetrics] = useState({
    pulseScore: true,
    categoryBreakdown: true,
    aiInsights: true,
    participationRate: true,
    engagementRetention: false,
    benchmarks: true
  });
  
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

  // AI insight severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Toggle visible metrics
  const toggleMetric = (metric: string) => {
    setVisibleMetrics({
      ...visibleMetrics,
      [metric]: !visibleMetrics[metric as keyof typeof visibleMetrics]
    });
  };

  // Calculate statistical significance
  const calculateZScore = (value: number, benchmark: number) => {
    // Simplified z-score calculation (assumes standard deviation of 10)
    const stdDev = 10;
    return ((value - benchmark) / stdDev).toFixed(2);
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
                <FileSpreadsheet className="h-3.5 w-3.5 mr-1" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('excel')}
                className="text-xs"
              >
                <FileSpreadsheet className="h-3.5 w-3.5 mr-1" />
                Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('pdf')}
                className="text-xs"
              >
                <FileText className="h-3.5 w-3.5 mr-1" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast({
                  title: "Dashboard Saved",
                  description: "Custom dashboard configuration saved"
                })}
                className="text-xs"
              >
                <Save className="h-3.5 w-3.5 mr-1" />
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <Label className="text-xs font-medium mb-1 block">Time Period</Label>
              <DatePickerWithRange 
                date={dateRange}
                setDate={setDateRange}
              />
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
              <Label className="text-xs font-medium mb-1 block">Location</Label>
              <Select 
                value={location} 
                onValueChange={setLocation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="sf">San Francisco, CA</SelectItem>
                  <SelectItem value="nyc">New York, NY</SelectItem>
                  <SelectItem value="london">London, UK</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
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
          </div>

          {/* Customizable Dashboard Controls */}
          <Card className="p-3 mb-4 border border-dashed">
            <div className="flex flex-wrap gap-3">
              <div className="text-sm font-medium flex items-center mr-2">
                <Settings className="w-3.5 h-3.5 mr-1" /> 
                Customize Dashboard:
              </div>
              {Object.entries(visibleMetrics).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`show-${key}`} 
                    checked={value}
                    onCheckedChange={() => toggleMetric(key)}
                  />
                  <label
                    htmlFor={`show-${key}`}
                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                </div>
              ))}
            </div>
          </Card>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
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
              <TabsTrigger value="aiInsights" className="text-xs">
                <Brain className="h-3.5 w-3.5 mr-1" />
                AI Insights
              </TabsTrigger>
            </TabsList>
            
            {/* Time Trends Tab */}
            <TabsContent value="trends">
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
                          <Label position="insideBottomRight">At Risk Threshold</Label>
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
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <h4 className="text-sm font-medium text-amber-800 mb-2 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Key Risk Indicators
                        </h4>
                        <ul className="text-xs text-amber-700 space-y-1 ml-6 list-disc">
                          <li>Decreased survey response rates in Customer Support dept</li>
                          <li>Negative sentiment around compensation in Sales team</li>
                          <li>Work-life balance concerns increasing across all departments</li>
                          <li>Career growth mentions up 15% in past quarter</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-800 mb-2">AI-Powered Recommendations</h4>
                        <ul className="text-xs text-blue-700 space-y-1 ml-6 list-disc">
                          <li>Schedule 1-on-1s with high-risk employees in Customer Support</li>
                          <li>Review compensation structure for Sales team</li>
                          <li>Implement flexible work arrangements to improve work-life balance</li>
                          <li>Develop more transparent career progression paths</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI Insights Tab */}
            <TabsContent value="aiInsights">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center mb-4">
                    <Brain className="h-5 w-5 mr-2 text-purple-600" />
                    <h3 className="text-lg font-medium">AI-Generated Insights & Predictions</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-4">
                      <Card className="p-4 border border-purple-200 bg-purple-50">
                        <h4 className="text-sm font-semibold mb-2 flex items-center">
                          <Sparkles className="h-3.5 w-3.5 mr-1 text-purple-600" />
                          Top 3 Concerns (Last 30 Days)
                        </h4>
                        <ul className="space-y-2">
                          {aiInsights.topConcerns.map((concern, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="inline-block w-5 h-5 flex-shrink-0 rounded-full bg-purple-100 text-purple-800 text-xs flex items-center justify-center mr-2 mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="text-sm text-gray-700">{concern}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                      
                      <Card className="p-4 border-l-4 border-l-red-500 bg-white">
                        <h4 className="text-sm font-semibold mb-2 flex items-center">
                          <AlertTriangle className="h-3.5 w-3.5 mr-1 text-red-500" />
                          Critical Predictions
                        </h4>
                        <div className="space-y-2">
                          {aiInsights.predictiveFlags.map((flag, idx) => (
                            <div key={idx} className="flex items-start">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${getSeverityColor(flag.severity)} mr-2 mt-0.5`}>
                                {flag.severity.toUpperCase()}
                              </span>
                              <div className="text-sm">
                                <span className="font-medium">{flag.department}:</span> {flag.issue}
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                    
                    <div className="space-y-4">
                      <Card className="p-4 border border-blue-200 bg-blue-50">
                        <h4 className="text-sm font-semibold mb-2 flex items-center">
                          <Calculator className="h-3.5 w-3.5 mr-1 text-blue-600" />
                          At-Risk Assessment
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <div className="text-xs">Trust + Engagement Combined</div>
                              <div className="text-xs font-medium">
                                {/* If combined score < 60%, show warning */}
                                {((benchmarkData[2].value + benchmarkData[3].value) / 2) < 60 ? (
                                  <span className="text-red-600 flex items-center">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    At Risk ({(benchmarkData[2].value + benchmarkData[3].value) / 2}%)
                                  </span>
                                ) : (
                                  <span className="text-green-600">
                                    Healthy ({(benchmarkData[2].value + benchmarkData[3].value) / 2}%)
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                              <div 
                                className={`h-2 rounded-full ${((benchmarkData[2].value + benchmarkData[3].value) / 2) < 60 ? 'bg-red-500' : 'bg-green-500'}`} 
                                style={{ width: `${(benchmarkData[2].value + benchmarkData[3].value) / 2}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <div className="text-xs">Predicted Turnover (6 months)</div>
                              <div className="text-xs font-medium">24%</div>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                              <div className="h-2 rounded-full bg-amber-500" style={{ width: '24%' }}></div>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-xs text-gray-600 mt-1">
                            <Info className="h-3 w-3 mr-1" />
                            <span>Based on predictive modeling of 28 engagement signals</span>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-4 border border-green-200 bg-green-50">
                        <h4 className="text-sm font-semibold mb-2 flex items-center">
                          <BarChart2 className="h-3.5 w-3.5 mr-1 text-green-600" />
                          AI-Recommended Actions
                        </h4>
                        <ul className="space-y-2">
                          {aiInsights.recommendedActions.map((action, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="inline-block w-5 h-5 flex-shrink-0 rounded-full bg-green-100 text-green-800 text-xs flex items-center justify-center mr-2 mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="text-sm text-gray-700">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Last analyzed: Today at 9:45 AM
                    </div>
                    <Button 
                      variant="outline" 
                      className="text-xs"
                      onClick={() => toast({
                        title: "AI Insights Generated",
                        description: "AI has refreshed insights with the latest data"
                      })}
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Refresh Insights
                    </Button>
                  </div>
                </div>

                {/* Engagement vs Retention Heatmap - Only show if enabled */}
                {visibleMetrics.engagementRetention && (
                  <div className="bg-white p-4 rounded-lg border">
                    <h3 className="text-sm font-medium mb-4">Engagement vs. Retention Heatmap</h3>
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="relative h-full w-full">
                        <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-5 grid-rows-5 gap-1">
                          {Array.from({ length: 25 }).map((_, i) => {
                            const row = Math.floor(i / 5);
                            const col = i % 5;
                            const value = 100 - (row * 20) + (col * 5);
                            let bgColor = 'bg-green-100';
                            if (value < 40) bgColor = 'bg-red-100';
                            else if (value < 60) bgColor = 'bg-red-50';
                            else if (value < 70) bgColor = 'bg-amber-100';
                            else if (value < 80) bgColor = 'bg-amber-50';
                            else if (value < 90) bgColor = 'bg-green-50';
                            
                            return (
                              <div 
                                key={i} 
                                className={`${bgColor} flex items-center justify-center rounded border`}
                                style={{ opacity: 0.3 + (value / 100) * 0.7 }}
                              >
                                <span className="text-[10px] font-medium">{value}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -rotate-90 text-xs font-medium text-gray-500">
                          Retention Rate
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500">
                          Engagement Score
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-4">
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-100 mr-1"></div>
                          <span className="text-xs">High Risk</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-amber-100 mr-1"></div>
                          <span className="text-xs">Medium Risk</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-100 mr-1"></div>
                          <span className="text-xs">Low Risk</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalytics;

