
import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, BarChart as BarChartIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Sample data for charts
const generatePulseScoreData = (timeRange: string) => {
  switch(timeRange) {
    case '7days':
      return [
        { day: 'Mon', score: 82 },
        { day: 'Tue', score: 83 },
        { day: 'Wed', score: 85 },
        { day: 'Thu', score: 83 },
        { day: 'Fri', score: 86 },
        { day: 'Sat', score: 84 },
        { day: 'Sun', score: 85 },
      ];
    case '90days':
      return [
        { month: 'Jan', score: 72 },
        { month: 'Feb', score: 70 },
        { month: 'Mar', score: 75 },
        { month: 'Apr', score: 78 },
        { month: 'May', score: 82 },
        { month: 'Jun', score: 85 },
        { month: 'Jul', score: 83 },
        { month: 'Aug', score: 86 },
        { month: 'Sep', score: 87 },
      ];
    case 'year':
      return [
        { month: 'Jan', score: 68 },
        { month: 'Feb', score: 70 },
        { month: 'Mar', score: 72 },
        { month: 'Apr', score: 74 },
        { month: 'May', score: 76 },
        { month: 'Jun', score: 78 },
        { month: 'Jul', score: 80 },
        { month: 'Aug', score: 82 },
        { month: 'Sep', score: 84 },
        { month: 'Oct', score: 86 },
        { month: 'Nov', score: 85 },
        { month: 'Dec', score: 87 },
      ];
    case '30days':
    default:
      return [
        { week: 'Week 1', score: 81 },
        { week: 'Week 2', score: 83 },
        { week: 'Week 3', score: 85 },
        { week: 'Week 4', score: 86 },
      ];
  }
};

const departmentData = [
  { department: 'Engineering', score: 84 },
  { department: 'Marketing', score: 79 },
  { department: 'Sales', score: 75 },
  { department: 'Support', score: 81 },
  { department: 'Operations', score: 77 },
];

interface ChartsRowProps {
  timeRange?: string;
}

const ChartsRow: React.FC<ChartsRowProps> = ({ timeRange = '30days' }) => {
  const { toast } = useToast();
  const [pulseChartType, setPulseChartType] = useState('area');
  const pulseScoreData = generatePulseScoreData(timeRange);
  
  const getXAxisKey = () => {
    switch(timeRange) {
      case '7days': return 'day';
      case '30days': return 'week';
      default: return 'month';
    }
  };
  
  const handleExportChart = (chartName: string) => {
    toast({
      title: "Chart Exported",
      description: `${chartName} has been exported as an image`
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">PulseScore™ Trend</CardTitle>
            <CardDescription>
              {timeRange === '7days' ? '7-day' : 
               timeRange === '30days' ? '30-day' : 
               timeRange === '90days' ? '90-day' : '12-month'} score evolution
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={pulseChartType} onValueChange={setPulseChartType} className="w-[160px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="area">Area</TabsTrigger>
                <TabsTrigger value="bar">Bar</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleExportChart('PulseScore Trend')}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              {pulseChartType === 'area' ? (
                <AreaChart data={pulseScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={getXAxisKey()} />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    name="PulseScore™" 
                    stroke="#9333ea" 
                    fill="#e9d5ff" 
                  />
                </AreaChart>
              ) : (
                <BarChart data={pulseScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={getXAxisKey()} />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="score" 
                    name="PulseScore™" 
                    fill="#9333ea" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Department Comparison</CardTitle>
            <CardDescription>PulseScore™ by department</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handleExportChart('Department Comparison')}
          >
            <Download className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[60, 100]} />
                <YAxis dataKey="department" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="score" 
                  name="PulseScore™" 
                  fill="#3b82f6" 
                  radius={[0, 4, 4, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsRow;
