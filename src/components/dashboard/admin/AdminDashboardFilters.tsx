
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CalendarIcon,
  Check,
  ChevronDown,
  Filter,
  RotateCcw,
  X
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

interface FilterProps {
  onApply: (filters: AdminDashboardFilters) => void;
  departments?: string[];
  themes?: string[];
  employeeCounts?: number[];
  initialFilters?: AdminDashboardFilters;
}

export interface AdminDashboardFilters {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  departments: string[];
  themes: string[];
  sentimentRange: [number, number];
  employeeCountRange: [number, number];
  searchTerm: string;
}

const AdminDashboardFilters: React.FC<FilterProps> = ({ 
  onApply, 
  departments = ["Engineering", "Marketing", "Sales", "Customer Support", "HR", "Finance", "Executive"], 
  themes = ["Leadership", "Communication", "Work Environment", "Collaboration", "Recognition", "Growth"],
  employeeCounts = [10, 500],
  initialFilters
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>(
    initialFilters?.dateRange || { from: undefined, to: undefined }
  );
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(
    initialFilters?.departments || []
  );
  const [selectedThemes, setSelectedThemes] = useState<string[]>(
    initialFilters?.themes || []
  );
  const [sentimentRange, setSentimentRange] = useState<[number, number]>(
    initialFilters?.sentimentRange || [50, 100]
  );
  const [employeeCountRange, setEmployeeCountRange] = useState<[number, number]>(
    initialFilters?.employeeCountRange || [employeeCounts[0], employeeCounts[1]]
  );
  const [searchTerm, setSearchTerm] = useState<string>(
    initialFilters?.searchTerm || ""
  );
  
  const [activeFilterCount, setActiveFilterCount] = useState<number>(
    countActiveFilters(initialFilters)
  );
  
  function countActiveFilters(filters?: AdminDashboardFilters): number {
    if (!filters) return 0;
    
    let count = 0;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    if (filters.departments.length > 0) count++;
    if (filters.themes.length > 0) count++;
    if (filters.sentimentRange[0] !== 50 || filters.sentimentRange[1] !== 100) count++;
    if (filters.searchTerm) count++;
    return count;
  }
  
  const toggleDepartment = (department: string) => {
    setSelectedDepartments(prev => 
      prev.includes(department) 
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };
  
  const toggleTheme = (theme: string) => {
    setSelectedThemes(prev => 
      prev.includes(theme) 
        ? prev.filter(t => t !== theme)
        : [...prev, theme]
    );
  };
  
  const handleResetFilters = () => {
    setDateRange({ from: undefined, to: undefined });
    setSelectedDepartments([]);
    setSelectedThemes([]);
    setSentimentRange([50, 100]);
    setEmployeeCountRange([employeeCounts[0], employeeCounts[1]]);
    setSearchTerm("");
  };
  
  const handleApplyFilters = () => {
    const filters: AdminDashboardFilters = {
      dateRange,
      departments: selectedDepartments,
      themes: selectedThemes,
      sentimentRange,
      employeeCountRange,
      searchTerm
    };
    
    setActiveFilterCount(countActiveFilters(filters));
    onApply(filters);
    setIsOpen(false);
  };
  
  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`;
    }
    if (dateRange.from) {
      return `From ${format(dateRange.from, 'MMM d, yyyy')}`;
    }
    if (dateRange.to) {
      return `Until ${format(dateRange.to, 'MMM d, yyyy')}`;
    }
    return "All time";
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[350px] md:w-[500px] p-0">
            <Card className="border-0 shadow-none">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleResetFilters}
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Reset
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleApplyFilters}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Apply
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Date Range */}
                  <div>
                    <Label className="text-sm font-medium mb-1 block">Date Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                              size="sm"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateRange.from ? format(dateRange.from, 'MMM d, yyyy') : 'Start date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={dateRange.from}
                              onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="relative">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                              size="sm"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateRange.to ? format(dateRange.to, 'MMM d, yyyy') : 'End date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={dateRange.to}
                              onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                  
                  {/* Departments */}
                  <div>
                    <Label className="text-sm font-medium mb-1 block">Departments</Label>
                    <div className="flex flex-wrap gap-2">
                      {departments.map(department => (
                        <Badge 
                          key={department}
                          variant={selectedDepartments.includes(department) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleDepartment(department)}
                        >
                          {department}
                          {selectedDepartments.includes(department) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* PulseThemes */}
                  <div>
                    <Label className="text-sm font-medium mb-1 block">Pulse Themes</Label>
                    <div className="flex flex-wrap gap-2">
                      {themes.map(theme => (
                        <Badge 
                          key={theme}
                          variant={selectedThemes.includes(theme) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleTheme(theme)}
                        >
                          {theme}
                          {selectedThemes.includes(theme) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sentiment Range Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <Label className="text-sm font-medium">Sentiment Score Range</Label>
                      <span className="text-xs text-gray-500">
                        {sentimentRange[0]} - {sentimentRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={sentimentRange}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setSentimentRange(value as [number, number])}
                      className="my-4"
                    />
                  </div>
                  
                  {/* Employee Count Range Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <Label className="text-sm font-medium">Employee Count</Label>
                      <span className="text-xs text-gray-500">
                        {employeeCountRange[0]} - {employeeCountRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={employeeCountRange}
                      min={employeeCounts[0]}
                      max={employeeCounts[1]}
                      step={5}
                      onValueChange={(value) => setEmployeeCountRange(value as [number, number])}
                      className="my-4"
                    />
                  </div>
                  
                  {/* Search Term */}
                  <div>
                    <Label htmlFor="searchTerm" className="text-sm font-medium mb-1 block">Search</Label>
                    <Input
                      id="searchTerm"
                      placeholder="Search by keyword..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
        
        {activeFilterCount > 0 && (
          <div className="text-sm text-gray-500">
            Showing filtered results • {formatDateRange()}
            {selectedDepartments.length > 0 && ` • ${selectedDepartments.length} department(s)`}
            {selectedThemes.length > 0 && ` • ${selectedThemes.length} theme(s)`}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardFilters;
