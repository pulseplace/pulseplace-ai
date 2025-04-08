import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange, DateRangeFilter } from "@/components/ui/date-range-picker";
import { X } from 'lucide-react';

interface TeamAdminFiltersProps {
  dateRange: DateRangeFilter;
  setDateRange: React.Dispatch<React.SetStateAction<DateRangeFilter>>;
  department: string;
  setDepartment: React.Dispatch<React.SetStateAction<string>>;
  pulseTheme: string;
  setPulseTheme: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}

const TeamAdminFilters: React.FC<TeamAdminFiltersProps> = ({
  dateRange,
  setDateRange,
  department,
  setDepartment,
  pulseTheme,
  setPulseTheme,
  onClose
}) => {
  const departments = [
    "All Departments", 
    "Engineering", 
    "Marketing", 
    "Sales", 
    "Customer Support", 
    "Human Resources", 
    "Finance"
  ];
  
  const pulseThemes = [
    "All Themes",
    "Work-Life Balance",
    "Manager Support",
    "Team Dynamics",
    "Growth Opportunities",
    "Company Culture",
    "Workplace Environment"
  ];
  
  const handleClearFilters = () => {
    setDateRange({ from: undefined, to: undefined });
    setDepartment("All Departments");
    setPulseTheme("All Themes");
  };
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Filter Results</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <Select 
            value={department} 
            onValueChange={setDepartment}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pulse Theme
          </label>
          <Select 
            value={pulseTheme} 
            onValueChange={setPulseTheme}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {pulseThemes.map((theme) => (
                <SelectItem key={theme} value={theme}>
                  {theme}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <Button 
          variant="outline" 
          onClick={handleClearFilters} 
          className="mr-2"
        >
          Clear Filters
        </Button>
        <Button onClick={onClose}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default TeamAdminFilters;
