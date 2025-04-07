
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { DateRangeFilter } from "@/types/scoring.types";
import { useToast } from "@/hooks/use-toast";
import { CustomTooltip, COLORS } from './utils/chartConfig';

interface PredictionsTabContentProps {
  department: string;
  dateRange: DateRangeFilter;
}

// Sample data for the predictions
const pulseScoreData = [
  { month: 'Feb', score: 75 },
  { month: 'March', score: 80 },
  { month: 'April', score: 86 },
];

const futureProjectionData = [
  { month: 'Feb', score: 75, benchmark: 70 },
  { month: 'March', score: 80, benchmark: 70 },
  { month: 'April', score: 86, benchmark: 70 },
  { month: 'May', score: 89, benchmark: 70 },
];

const departmentTrendsData = [
  { name: 'Sales', score: 88 },
  { name: 'Engineering', score: 83 },
  { name: 'Marketing', score: 81 },
  { name: 'Support', score: 76 },
  { name: 'HR', score: 70 },
];

const PredictionsTabContent: React.FC<PredictionsTabContentProps> = ({ department, dateRange }) => {
  const { toast } = useToast();
  
  const handleExportData = () => {
    toast({
      title: "Data Exported",
      description: "Prediction data has been exported successfully"
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Real-Time Predictions</h2>
          <p className="text-gray-600 text-sm mb-4">
            AI-driven insights forecasting key metrics over the next 6 months
          </p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleExportData}
        >
          <FileDown className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-4 lg:p-6">
            <h3 className="font-medium mb-4">Filtering Options</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-md">
                <span>Department</span>
                <span className="text-blue-600 flex items-center">
                  {department === 'all' ? 'All' : department}
                  <svg 
                    className="h-4 w-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-md">
                <span>Date Range</span>
                <span className="text-blue-600 flex items-center">
                  Last 90 Days
                  <svg 
                    className="h-4 w-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <h3 className="font-medium mb-3">PulseScore™</h3>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pulseScoreData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[70, 90]} 
                    axisLine={false}
                    tickLine={false}
                    tickCount={5}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke={COLORS.pulseScore} 
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-4 lg:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Metrics Dashboard</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border rounded-md p-4">
              <div className="text-sm text-gray-500 mb-2">PulseScore™</div>
              <div className="text-4xl font-bold">86</div>
            </div>
            <div className="border rounded-md p-4">
              <div className="text-sm text-gray-500 mb-2">Emotion Index</div>
              <div className="text-4xl font-bold">84</div>
            </div>
            <div className="border rounded-md p-4">
              <div className="text-sm text-gray-500 mb-2">Engagement Stability</div>
              <div className="text-4xl font-bold">87</div>
            </div>
            <div className="border rounded-md p-4">
              <div className="text-sm text-gray-500 mb-2">Culture Trust</div>
              <div className="text-4xl font-bold">79</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4 lg:p-6">
            <h3 className="font-medium mb-4">Trends by Department</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={departmentTrendsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar 
                    dataKey="score" 
                    fill={COLORS.secondary} 
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex mt-2 justify-center">
              <div className="flex items-center gap-2 text-xs text-blue-600">
                <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                <span>Statistically Significant</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <h3 className="font-medium mb-4">PulseScore™ Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={futureProjectionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[60, 100]} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip />
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.pulseScore} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.pulseScore} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke={COLORS.pulseScore} 
                    fillOpacity={1} 
                    fill="url(#colorScore)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="benchmark" 
                    stroke="#94A3B8" 
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex mt-2 justify-center">
              <div className="flex items-center gap-2 text-xs">
                <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                <span>PulseScore™ Over Time</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictionsTabContent;
