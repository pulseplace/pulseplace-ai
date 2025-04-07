
import React from 'react';
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Settings } from 'lucide-react';
import { DateRangeFilter } from "@/types/scoring.types";

interface DashboardControlsProps {
  dateRange: DateRangeFilter;
  setDateRange: React.Dispatch<React.SetStateAction<DateRangeFilter>>;
  department: string;
  setDepartment: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  chartType: string;
  setChartType: React.Dispatch<React.SetStateAction<string>>;
  visibleMetrics: {
    pulseScore: boolean;
    categoryBreakdown: boolean;
    aiInsights: boolean;
    participationRate: boolean;
    engagementRetention: boolean;
    benchmarks: boolean;
    [key: string]: boolean;
  };
  toggleMetric: (metric: string) => void;
}

const DashboardControls: React.FC<DashboardControlsProps> = ({
  dateRange,
  setDateRange,
  department,
  setDepartment,
  location,
  setLocation,
  chartType,
  setChartType,
  visibleMetrics,
  toggleMetric
}) => {
  return (
    <>
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
    </>
  );
};

export default DashboardControls;
