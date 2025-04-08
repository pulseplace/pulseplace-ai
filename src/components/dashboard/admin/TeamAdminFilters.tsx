
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, RefreshCw } from 'lucide-react';
import { addDays, format, subDays } from 'date-fns';

interface TeamAdminFiltersProps {
  department: string;
  setDepartment: (value: string) => void;
  pulseCategoryFilter: string;
  setPulseCategoryFilter: (value: string) => void;
  dateRange: { from?: Date; to?: Date };
  setDateRange: (range: { from?: Date; to?: Date }) => void;
  onRefresh: () => void;
  departments: string[];
  isRefreshing: boolean;
}

// Available Pulse categories for filtering
const PULSE_CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "trust", label: "Trust & Safety" },
  { value: "engagement", label: "Engagement" },
  { value: "culture", label: "Culture" },
  { value: "growth", label: "Growth & Development" },
  { value: "wellbeing", label: "Wellbeing" }
];

// Preset date ranges
const DATE_RANGES = [
  { value: "7d", label: "Last 7 days", range: { from: subDays(new Date(), 7), to: new Date() } },
  { value: "30d", label: "Last 30 days", range: { from: subDays(new Date(), 30), to: new Date() } },
  { value: "90d", label: "Last 90 days", range: { from: subDays(new Date(), 90), to: new Date() } },
  { value: "6m", label: "Last 6 months", range: { from: subDays(new Date(), 180), to: new Date() } },
  { value: "custom", label: "Custom Range", range: { from: undefined, to: undefined } }
];

const TeamAdminFilters: React.FC<TeamAdminFiltersProps> = ({
  department,
  setDepartment,
  pulseCategoryFilter,
  setPulseCategoryFilter,
  dateRange,
  setDateRange,
  onRefresh,
  departments,
  isRefreshing
}) => {
  // Handle date range preset selection
  const handlePresetDateRange = (preset: string) => {
    const selectedPreset = DATE_RANGES.find(range => range.value === preset);
    if (selectedPreset) {
      setDateRange(selectedPreset.range);
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h3 className="text-sm font-medium text-gray-700">Dashboard Filters</h3>
        <div className="flex gap-2">
          <Select value="30d" onValueChange={handlePresetDateRange}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              {DATE_RANGES.map(period => (
                <SelectItem key={period.value} value={period.value}>{period.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh} 
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Apply Filters'}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Department</label>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Pulse Category</label>
          <Select value={pulseCategoryFilter} onValueChange={setPulseCategoryFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {PULSE_CATEGORIES.map(category => (
                <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Custom Date Range</label>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamAdminFilters;
