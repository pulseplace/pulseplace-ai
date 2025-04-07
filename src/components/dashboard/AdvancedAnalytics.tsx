
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
  Radar,
  Brush
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { getTierDisplay } from '@/utils/scoring';
import { AlertCircle, TrendingUp, TrendingDown, Users, Calendar, Download, FileDown, Filter, ChevronDown } from 'lucide-react';
import { generateThemeInsights, ThemeFrequency, ThemeTrend, calculateAttritionRisk } from '@/utils/themeAnalysis';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

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

// Extended trend data for 2-year view
const extendedTrendData = [
  ...Array.from({ length: 24 }, (_, i) => {
    const month = new Date(2023, i % 12, 1).toLocaleString('default', { month: 'short' });
    const year = Math.floor(i / 12) + 2023;
    const multiplier = 1 + (i / 100);
    const base = 65 + (i % 5);
    
    return {
      date: `${month} ${year}`,
      month,
      pulseScore: Math.min(Math.round(base * multiplier), 100),
      sentimentScore: Math.min(Math.round((base - 5) * multiplier), 100),
      responseRate: Math.min(Math.round((base + 10) * multiplier), 100)
    };
  })
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

// Sample predictive data for attrition forecast
const predictiveData = [
  { month: 'Sep', predicted: 12, actual: 10 },
  { month: 'Oct', predicted: 14, actual: 12 },
  { month: 'Nov', predicted: 16, actual: 15 },
  { month: 'Dec', predicted: 18, actual: 16 },
  { month: 'Jan', predicted: 15, actual: null },
  { month: 'Feb', predicted: 12, actual: null },
  { month: 'Mar', predicted: 11, actual: null },
];

// Employee engagement model factors
const engagementFactors = [
  { factor: 'Management Support', impact: 85, change: 5 },
  { factor: 'Work Environment', impact: 72, change: -3 },
  { factor: 'Career Opportunities', impact: 68, change: 7 },
  { factor: 'Recognition', impact: 63, change: 12 },
  { factor: 'Work-Life Balance', impact: 81, change: -2 },
];

// Departments for filtering
const departments = [
  'All Departments',
  'Engineering',
  'Sales',
  'Marketing',
  'Customer Support',
  'Operations',
  'HR',
  'Finance'
];

// Time period options
const timePeriods = [
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last Quarter', value: '90d' },
  { label: 'Last 6 Months', value: '180d' },
  { label: 'Year to Date', value: 'ytd' },
  { label: 'Last Year', value: '1y' },
  { label: 'Last 2 Years', value: '2y' },
  { label: 'Custom Range', value: 'custom' }
];

const AdvancedAnalytics = () => {
  const [activeTab, setActiveTab] = useState("trends");
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('90d');
  const [showPredictions, setShowPredictions] = useState(true);
  const [showBrush, setShowBrush] = useState(false);
  const [chartData, setChartData] = useState(trendData);
  
  const COLORS = ['#4f46e5', '#8b5cf6', '#d946ef', '#f43f5e', '#f59e0b', '#10b981'];
  
  // Handle department filter change
  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    // In a real app, this would filter data based on the selected department
  };

  // Handle time period change
  const handleTimePeriodChange = (value: string) => {
    setSelectedTimePeriod(value);
    
    // Update chart data based on selected time period
    if (value === '2y') {
      setChartData(extendedTrendData);
      setShowBrush(true);
    } else {
      setChartData(trendData);
      setShowBrush(false);
    }
  };

  // Handle data export
  const handleExportData = (format: 'csv' | 'pdf' | 'excel') => {
    console.log(`Exporting data in ${format} format`);
    // In a real implementation, this would generate and download the appropriate file
  };
  
  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl flex items-center">
              Advanced Analytics
            </CardTitle>
            <CardDescription>
              AI-powered insights, trends, and predictive indicators
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileDown size={16} />
                  Export
                  <ChevronDown size={14} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2">
                <div className="grid gap-1">
                  <Button 
                    variant="ghost" 
                    className="justify-start text-sm" 
                    onClick={() => handleExportData('csv')}
                  >
                    CSV
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-sm" 
                    onClick={() => handleExportData('excel')}
                  >
                    Excel
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-sm" 
                    onClick={() => handleExportData('pdf')}
                  >
                    PDF Report
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
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
            <div className="flex flex-col md:flex-row gap-3 justify-between mb-4">
              <div className="flex items-center gap-3">
                <Select value={selectedTimePeriod} onValueChange={handleTimePeriodChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    {timePeriods.map((period) => (
                      <SelectItem key={period.value} value={period.value}>{period.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant={showPredictions ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setShowPredictions(true)}
                    className="h-8"
                  >
                    Show Predictions
                  </Button>
                  <Button 
                    variant={!showPredictions ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setShowPredictions(false)}
                    className="h-8"
                  >
                    Hide Predictions
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="h-80">
              <ChartContainer config={{
                pulseScore: { theme: { light: '#8b5cf6', dark: '#a78bfa' } },
                sentimentScore: { theme: { light: '#10b981', dark: '#34d399' } },
                responseRate: { theme: { light: '#3b82f6', dark: '#60a5fa' } },
                predicted: { theme: { light: '#f59e0b', dark: '#fbbf24' }, dashArray: '3 3' }
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey={selectedTimePeriod === '2y' ? 'date' : 'month'} 
                      interval={selectedTimePeriod === '2y' ? 2 : 0}
                      angle={-45} 
                      textAnchor="end" 
                      height={60}
                    />
                    <YAxis domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="pulseScore" name="PulseScore" stroke="var(--color-pulseScore)" strokeWidth={2} />
                    <Line type="monotone" dataKey="sentimentScore" name="Sentiment" stroke="var(--color-sentimentScore)" strokeWidth={2} />
                    <Line type="monotone" dataKey="responseRate" name="Response Rate %" stroke="var(--color-responseRate)" strokeWidth={2} />
                    {showPredictions && selectedTimePeriod !== '2y' && (
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        name="Predicted Score" 
                        stroke="var(--color-predicted)" 
                        strokeDasharray="5 5"
                        strokeWidth={2} 
                      />
                    )}
                    {showBrush && (
                      <Brush 
                        dataKey={selectedTimePeriod === '2y' ? 'date' : 'month'} 
                        height={30} 
                        stroke="#8884d8"
                        startIndex={12}
                        endIndex={23}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold">Growth Trends</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Your organization has shown a consistent upward trend in PulseScore, 
                  improving by 19% over the past {selectedTimePeriod === '2y' ? '24' : '8'} months. 
                </p>
                <div className="mt-2 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <span className="text-green-600 font-medium">+19%</span> 
                  <span>since {selectedTimePeriod === '2y' ? 'Jan 2023' : 'Jan 2024'}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold">Engagement Indicators</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  August shows your highest response rate (90%) and PulseScore (86), 
                  suggesting increased employee engagement and satisfaction.
                </p>
                <div className="mt-2 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <span className="text-blue-600 font-medium">90%</span> 
                  <span>participation rate</span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold">Forecast</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  AI-powered predictions suggest your PulseScore will {showPredictions ? 'increase by ~3%' : 'remain stable'} in the coming quarter
                  based on current growth patterns and seasonal factors.
                </p>
                <div className="mt-2 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <span className="text-purple-600 font-medium">89</span> 
                  <span>projected score by Q4</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Theme Analysis Tab */}
          <TabsContent value="themes" className="space-y-4">
            <div className="flex justify-between mb-4">
              <Select defaultValue="frequency" className="w-[180px]">
                <SelectTrigger>
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frequency">Frequency Analysis</SelectItem>
                  <SelectItem value="sentiment">Sentiment Analysis</SelectItem>
                  <SelectItem value="trends">Theme Trends</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
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
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-2">Theme Frequency Analysis</h3>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Work-Life Balance</strong> is the most frequently mentioned theme (85% of responses), followed by 
                <strong> Trust in Leadership</strong> (78%). Areas receiving less attention include <strong>Compensation</strong> (45%) 
                and <strong>Career Growth</strong> (57%), suggesting potential areas for focused improvement.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                {themeFrequencyData.slice(0, 3).map((theme, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
                    <div className="text-sm font-medium">{theme.theme}</div>
                    <div className="text-2xl font-bold" style={{ color: COLORS[index % COLORS.length] }}>{theme.frequency}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{theme.mentions} mentions</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mt-4">
              <h3 className="font-semibold mb-3">AI-Generated Theme Insights</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-purple-700">1</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Work-Life Balance is mentioned 35% more frequently this quarter compared to last, indicating it's becoming a more significant concern.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-purple-700">2</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Trust in Leadership shows the strongest positive sentiment (78%), suggesting recent leadership initiatives are resonating well.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-purple-700">3</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Compensation and Career Growth consistently appear together in responses, indicating they may be interconnected concerns.
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="text-xs h-7">
                  View Full Insight Report
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Industry Benchmarks Tab */}
          <TabsContent value="benchmarks" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <Select defaultValue="industry" className="w-[180px]">
                <SelectTrigger>
                  <SelectValue placeholder="Select comparison" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="industry">Industry Average</SelectItem>
                  <SelectItem value="size">By Company Size</SelectItem>
                  <SelectItem value="region">By Region</SelectItem>
                  <SelectItem value="custom">Custom Group</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  {getTierDisplay('pulse_certified').label}
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-100 dark:border-purple-800">
                  Top 15% in Industry
                </Badge>
              </div>
            </div>
            
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
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-2">Industry Benchmark Analysis</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Your organization's PulseScore (86) is 16% above the industry average (74) and just 4% below top performers (90). 
                Your strongest differentiator is Engagement Stability at 22% above industry average. 
                All categories exceed the industry average, qualifying your organization for Pulse Certification.
              </p>
              
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Percentile Ranking</div>
                  <div className="text-3xl font-bold text-purple-600">85th</div>
                  <div className="mt-1 text-xs">
                    <span className="text-green-600">▲ 5 points</span> from last quarter
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Growth Rate vs Industry</div>
                  <div className="text-3xl font-bold text-purple-600">2.3x</div>
                  <div className="mt-1 text-xs">
                    <span className="text-green-600">▲ 0.5x</span> from last quarter
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-dashed border-purple-300 dark:border-purple-700 rounded-lg bg-purple-50 dark:bg-purple-900/20 mt-4">
              <h3 className="font-semibold mb-2 text-sm text-purple-800 dark:text-purple-300">Certification Insights</h3>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                Your organization maintains Pulse Certified™ status for the 3rd consecutive quarter. 
                Only 12% of organizations in your industry maintain this certification for 3+ quarters.
                This qualifies you for enhanced brand recognition and marketing opportunities.
              </p>
              <Button className="mt-3 bg-purple-600 hover:bg-purple-700" size="sm">
                Explore Certification Benefits
              </Button>
            </div>
          </TabsContent>
          
          {/* Attrition Risk Tab */}
          <TabsContent value="attrition" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Select defaultValue="department" className="w-[180px]">
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="department">By Department</SelectItem>
                    <SelectItem value="tenure">By Tenure</SelectItem>
                    <SelectItem value="role">By Role Level</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="risk" className="w-[180px]">
                  <SelectTrigger>
                    <SelectValue placeholder="Risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="high">High Risk Only</SelectItem>
                    <SelectItem value="medium">Medium Risk Only</SelectItem>
                    <SelectItem value="low">Low Risk Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter size={14} />
                  Advanced Filters
                </Button>
              </div>
            </div>
            
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
                  <LineChart data={predictiveData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 30]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      name="Actual Turnover %" 
                      stroke="#8b5cf6" 
                      strokeWidth={2} 
                      dot={{ r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      name="Predicted Turnover %" 
                      stroke="#f59e0b" 
                      strokeWidth={2} 
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-red-100 text-red-600 rounded-full mt-0.5 dark:bg-red-900 dark:text-red-300">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Attrition Risk Alert</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Customer Support shows a high attrition risk (32%, up 12% from last quarter). 
                    Key contributors include lower psychological safety scores and concerns about work-life balance.
                  </p>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              <div>
                <h4 className="font-medium mb-2">Contributing Factors</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {engagementFactors.map((factor) => (
                    <div key={factor.factor} className="flex items-center justify-between bg-white dark:bg-gray-700 p-2 rounded border border-gray-200 dark:border-gray-600">
                      <span className="text-sm">{factor.factor}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{factor.impact}%</span>
                        <span className={`text-xs ${factor.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {factor.change > 0 ? '▲' : '▼'} {Math.abs(factor.change)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-3" />
              
              <div>
                <h4 className="font-medium mb-2">Recommended Actions</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-300 flex-shrink-0">1</span>
                    <span className="text-gray-700 dark:text-gray-300">Conduct focused listening sessions with Customer Support team members to identify specific concerns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-300 flex-shrink-0">2</span>
                    <span className="text-gray-700 dark:text-gray-300">Review workload distribution and establish clearer boundaries for after-hours support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-300 flex-shrink-0">3</span>
                    <span className="text-gray-700 dark:text-gray-300">Implement a targeted recognition program specifically for support team members</span>
                  </li>
                </ul>
                <div className="mt-3">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Generate Detailed Action Plan
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedAnalytics;
