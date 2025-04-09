
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { AlertTriangle, RefreshCw } from 'lucide-react';
import ThemeSentimentTable, { ThemeSentimentData } from './ThemeSentimentTable';
import ThemeSentimentCharts from './ThemeSentimentCharts';
import { calculateThemeScores } from '@/utils/themeAnalysis';
import { DateRange } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";

// Sample data for theme sentiment (can be replaced with actual API call)
const SAMPLE_SENTIMENT_DATA: ThemeSentimentData[] = [
  {
    department: "Engineering",
    themes: {
      trust_in_leadership: 82,
      psychological_safety: 88,
      inclusion_belonging: 85,
      motivation_fulfillment: 79,
      mission_alignment: 84,
      engagement_continuity: 76
    }
  },
  {
    department: "Marketing",
    themes: {
      trust_in_leadership: 91,
      psychological_safety: 87,
      inclusion_belonging: 93,
      motivation_fulfillment: 89,
      mission_alignment: 92,
      engagement_continuity: 85
    }
  },
  {
    department: "Sales",
    themes: {
      trust_in_leadership: 75,
      psychological_safety: 72,
      inclusion_belonging: 79,
      motivation_fulfillment: 69,
      mission_alignment: 67,
      engagement_continuity: 68
    }
  },
  {
    department: "Customer Support",
    themes: {
      trust_in_leadership: 87,
      psychological_safety: 83,
      inclusion_belonging: 84,
      motivation_fulfillment: 88,
      mission_alignment: 79,
      engagement_continuity: 80
    }
  },
  {
    department: "Human Resources",
    themes: {
      trust_in_leadership: 94,
      psychological_safety: 93,
      inclusion_belonging: 95,
      motivation_fulfillment: 92,
      mission_alignment: 90,
      engagement_continuity: 91
    }
  },
  {
    department: "Product",
    themes: {
      trust_in_leadership: 77,
      psychological_safety: 75,
      inclusion_belonging: 78,
      motivation_fulfillment: 73,
      mission_alignment: 76,
      engagement_continuity: 69
    }
  }
];

// Theme names and descriptions for the dropdown
const THEMES = [
  { value: "all", label: "All Themes" },
  { value: "trust_in_leadership", label: "Trust in Leadership" },
  { value: "psychological_safety", label: "Psychological Safety" },
  { value: "inclusion_belonging", label: "Inclusion & Belonging" },
  { value: "motivation_fulfillment", label: "Motivation & Fulfillment" },
  { value: "mission_alignment", label: "Mission Alignment" },
  { value: "engagement_continuity", label: "Engagement Continuity" }
];

const ThemeSentimentAnalysis: React.FC = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<string>('table');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sentimentData, setSentimentData] = useState<ThemeSentimentData[]>(SAMPLE_SENTIMENT_DATA);
  
  // Filters
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  // List of available departments in the data
  const departments = [
    { value: "all", label: "All Departments" },
    ...sentimentData.map(item => ({ 
      value: item.department, 
      label: item.department 
    }))
  ];

  // Effect to load data with filters
  useEffect(() => {
    loadSentimentData();
  }, [selectedDepartment, selectedTheme, dateRange]);

  const loadSentimentData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would fetch from an API with filters
      // For now, we'll just filter the sample data
      
      let filteredData = [...SAMPLE_SENTIMENT_DATA];
      
      // Apply department filter
      if (selectedDepartment && selectedDepartment !== 'all') {
        filteredData = filteredData.filter(item => item.department === selectedDepartment);
      }
      
      // Note: Theme filtering is handled in the table component
      
      // Date range filtering would happen here in a real implementation
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSentimentData(filteredData);
    } catch (err: any) {
      console.error('Error loading sentiment data:', err);
      setError(err.message || 'Failed to load sentiment data');
      toast({
        title: "Error",
        description: "Failed to load sentiment data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadSentimentData();
    toast({
      title: "Data Refreshed",
      description: "Sentiment data has been updated."
    });
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value === 'all' ? null : value);
  };

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value === 'all' ? null : value);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Theme Sentiment Analysis</h2>
          <p className="text-gray-500">
            Analyze sentiment scores across themes and departments
          </p>
        </div>
        <Button 
          onClick={handleRefresh} 
          variant="outline" 
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <CardTitle>Sentiment Filters</CardTitle>
              <CardDescription>
                Filter sentiment data by department, theme, and time period
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                Table View
              </Button>
              <Button
                variant={viewMode === 'charts' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('charts')}
              >
                Chart View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <Select 
                value={selectedDepartment || 'all'} 
                onValueChange={handleDepartmentChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
              <Select 
                value={selectedTheme || 'all'} 
                onValueChange={handleThemeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Theme" />
                </SelectTrigger>
                <SelectContent>
                  {THEMES.map(theme => (
                    <SelectItem key={theme.value} value={theme.value}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
              <DateRangePicker
                value={dateRange}
                onChange={handleDateRangeChange}
              />
            </div>
          </div>
          
          {/* Display legend for sentiment score ranges */}
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Sentiment Score Legend:</div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                Strong (90-100)
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-lime-100 text-lime-800 border border-lime-200">
                Healthy (80-89)
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                Needs Focus (70-79)
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                Critical Attention (Below 70)
              </span>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              {viewMode === 'table' && (
                <ThemeSentimentTable 
                  data={sentimentData} 
                  selectedTheme={selectedTheme}
                />
              )}
              
              {viewMode === 'charts' && (
                <ThemeSentimentCharts 
                  data={sentimentData}
                  selectedDepartment={selectedDepartment}
                  selectedTheme={selectedTheme}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeSentimentAnalysis;
