
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Download, 
  ChevronRight, 
  RefreshCw, 
  BarChart2,
  Info,
  HelpCircle,
  Check
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from 'sonner';

interface SentimentTheme {
  theme: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  percentage: number;
  sampleQuote?: string;
}

interface TrendData {
  name: string;
  direction: 'up' | 'down' | 'stable';
  percentage: number;
  description: string;
}

interface RealTimeInsightsProps {
  lastUpdated?: string;
  positiveThemes: SentimentTheme[];
  negativeThemes: SentimentTheme[];
  neutralThemes: SentimentTheme[];
  trends: TrendData[];
  highlightQuotes: string[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

const RealTimeInsights: React.FC<RealTimeInsightsProps> = ({
  lastUpdated,
  positiveThemes,
  negativeThemes,
  neutralThemes,
  trends,
  highlightQuotes,
  isLoading = false,
  onRefresh
}) => {
  const [activeTab, setActiveTab] = useState('sentiment');
  const [isRealTime, setIsRealTime] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState<number | null>(null);
  const [timeRange, setTimeRange] = useState('30d');

  // Simulate real-time connection issues
  useEffect(() => {
    const connectionCheck = setTimeout(() => {
      if (Math.random() > 0.8) {
        setIsRealTime(false);
        toast.warning("Real-time connection temporarily interrupted", {
          description: "Data updates may be delayed. Switched to cached mode.",
          duration: 4000,
        });
      }
    }, 15000);

    return () => clearTimeout(connectionCheck);
  }, []);

  // Simulate automatic refreshes
  useEffect(() => {
    if (refreshInterval) {
      const timer = setInterval(() => {
        if (onRefresh && !isLoading) {
          onRefresh();
        }
      }, refreshInterval * 1000);
      
      return () => clearInterval(timer);
    }
  }, [refreshInterval, onRefresh, isLoading]);

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      // Demo refresh simulation
      toast.success("Refreshing insights data...");
      // Re-enable real-time if it was disabled
      setIsRealTime(true);
    }
  };

  const handleSetRefreshInterval = (seconds: number | null) => {
    setRefreshInterval(seconds);
    if (seconds) {
      toast.info(`Auto-refresh set to ${seconds} seconds`);
    } else {
      toast.info("Auto-refresh disabled");
    }
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    toast.info(`Time range changed to ${range}`);
  };

  // Helper functions for sentiment display
  const getSentimentColor = (sentiment: 'positive' | 'negative' | 'neutral') => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'neutral':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSentimentIcon = (sentiment: 'positive' | 'negative' | 'neutral') => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-3.5 w-3.5 text-green-600" />;
      case 'negative':
        return <TrendingDown className="h-3.5 w-3.5 text-red-600" />;
      case 'neutral':
        return <ChevronRight className="h-3.5 w-3.5 text-blue-600" />;
      default:
        return null;
    }
  };

  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <ChevronRight className="h-4 w-4 text-blue-600" />;
    }
  };

  // Adding mini sparkline for visualization
  const generateSparkline = (direction: 'up' | 'down' | 'stable', percentage: number) => {
    const values = [];
    if (direction === 'up') {
      for (let i = 0; i < 5; i++) {
        values.push(Math.floor(Math.random() * 20) + 10 + (i * 5));
      }
      values.push(values[values.length - 1] + percentage);
    } else if (direction === 'down') {
      for (let i = 0; i < 5; i++) {
        values.push(Math.floor(Math.random() * 20) + 60 - (i * 5));
      }
      values.push(values[values.length - 1] - percentage);
    } else {
      const baseValue = Math.floor(Math.random() * 20) + 40;
      for (let i = 0; i < 6; i++) {
        values.push(baseValue + Math.floor(Math.random() * 10) - 5);
      }
    }
    
    // Normalize values to fit in the display
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const normalizedValues = values.map(v => ((v - min) / range) * 20);
    
    return (
      <div className="flex items-end h-[20px] gap-[2px] ml-2">
        {normalizedValues.map((height, i) => (
          <div 
            key={i} 
            className={`w-[3px] ${
              direction === 'up' 
                ? (i === normalizedValues.length - 1 ? 'bg-green-500' : 'bg-green-200')
                : direction === 'down' 
                  ? (i === normalizedValues.length - 1 ? 'bg-red-500' : 'bg-red-200')
                  : 'bg-blue-200'
            }`} 
            style={{ height: `${Math.max(2, height)}px` }}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <TooltipProvider>
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-pulse-600" />
              <CardTitle className="text-lg">Real-Time AI Insights</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Info className="h-4 w-4 text-gray-400 cursor-help" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">
                      Our AI analyzes workplace feedback in real-time, identifying trends
                      and potential issues as they emerge. Insights are refreshed automatically
                      based on new survey responses and feedback data.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2">
              {isRealTime ? (
                <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  <span>Real-time</span>
                </Badge>
              ) : (
                <Badge className="bg-amber-100 text-amber-700 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>Cached data</span>
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="sr-only">Refresh</span>
              </Button>
            </div>
          </div>
          <CardDescription className="flex items-center justify-between">
            <span>AI-synthesized trends from survey and feedback data</span>
            {lastUpdated && (
              <span className="text-xs text-gray-500">Updated: {lastUpdated}</span>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="sentiment" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
              <TabsTrigger value="trends">Key Trends</TabsTrigger>
              <TabsTrigger value="quotes">Highlight Quotes</TabsTrigger>
              <TabsTrigger value="certifications">Certification Signals</TabsTrigger>
            </TabsList>

            <TabsContent value="sentiment">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span>Positive Themes</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <HelpCircle className="h-3.5 w-3.5 text-gray-400 cursor-help ml-1" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-xs">
                            Topics with 70%+ positive sentiment across survey responses and feedback channels.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </h3>
                  <div className="space-y-2">
                    {positiveThemes.map((theme, index) => (
                      <div key={index} className="p-2 border rounded-md bg-green-50">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{theme.theme}</span>
                          <Badge className={getSentimentColor(theme.sentiment)}>
                            {theme.percentage}%
                          </Badge>
                        </div>
                        {theme.sampleQuote && (
                          <div className="mt-1 text-xs text-gray-600 italic">
                            "{theme.sampleQuote}"
                          </div>
                        )}
                        <div className="mt-1 flex items-center">
                          <span className="text-xs text-gray-500">30-day trend:</span>
                          {generateSparkline('up', Math.floor(Math.random() * 10) + 5)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    <span>Areas of Concern</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <HelpCircle className="h-3.5 w-3.5 text-gray-400 cursor-help ml-1" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-xs">
                            Topics with less than 50% positive sentiment or showing significant negative trends.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </h3>
                  <div className="space-y-2">
                    {negativeThemes.map((theme, index) => (
                      <div key={index} className="p-2 border rounded-md bg-red-50">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{theme.theme}</span>
                          <Badge className={getSentimentColor(theme.sentiment)}>
                            {theme.percentage}%
                          </Badge>
                        </div>
                        {theme.sampleQuote && (
                          <div className="mt-1 text-xs text-gray-600 italic">
                            "{theme.sampleQuote}"
                          </div>
                        )}
                        <div className="mt-1 flex items-center">
                          <span className="text-xs text-gray-500">30-day trend:</span>
                          {generateSparkline('down', Math.floor(Math.random() * 15) + 10)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <ChevronRight className="h-4 w-4 text-blue-600" />
                    <span>Neutral Observations</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <HelpCircle className="h-3.5 w-3.5 text-gray-400 cursor-help ml-1" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-xs">
                            Topics with mixed sentiment or those trending neither clearly positive nor negative.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </h3>
                  <div className="space-y-2">
                    {neutralThemes.map((theme, index) => (
                      <div key={index} className="p-2 border rounded-md bg-blue-50">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{theme.theme}</span>
                          <Badge className={getSentimentColor(theme.sentiment)}>
                            {theme.percentage}%
                          </Badge>
                        </div>
                        {theme.sampleQuote && (
                          <div className="mt-1 text-xs text-gray-600 italic">
                            "{theme.sampleQuote}"
                          </div>
                        )}
                        <div className="mt-1 flex items-center">
                          <span className="text-xs text-gray-500">30-day trend:</span>
                          {generateSparkline('stable', 0)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trends">
              <div className="space-y-3">
                {trends.map((trend, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">{getTrendIcon(trend.direction)}</div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-1">
                          <h4 className="font-medium text-sm">{trend.name}</h4>
                          <span className={`text-xs ${trend.direction === 'up' ? 'text-green-600' : trend.direction === 'down' ? 'text-red-600' : 'text-blue-600'}`}>
                            {trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : ''}
                            {trend.percentage}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{trend.description}</p>
                      </div>
                      <div className="flex items-center h-[25px]">
                        {generateSparkline(trend.direction, trend.percentage)}
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                      <span className="font-medium">Impact prediction: </span>
                      {trend.direction === 'up' ? 'Positive reinforcement recommended' : 
                       trend.direction === 'down' ? 'Intervention may be needed' : 
                       'Continue monitoring'}
                    </div>
                  </div>
                ))}

                {trends.length === 0 && (
                  <div className="text-center py-6">
                    <AlertCircle className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Not enough data to analyze trends.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="quotes">
              <div className="space-y-3">
                {highlightQuotes.map((quote, index) => (
                  <div key={index} className="p-3 border rounded-md bg-gray-50">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 text-pulse-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-gray-700 italic">"{quote}"</p>
                        <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                          <span>AI confidence: {Math.floor(Math.random() * 15) + 85}%</span>
                          <span>Sentiment: {Math.random() > 0.6 ? 'Positive' : Math.random() > 0.3 ? 'Neutral' : 'Negative'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {highlightQuotes.length === 0 && (
                  <div className="text-center py-6">
                    <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      No highlight quotes available.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* New Certification Signals Tab */}
            <TabsContent value="certifications">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium text-green-800">Certification Eligibility Signals</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <HelpCircle className="h-3.5 w-3.5 text-green-600 cursor-help" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-xs">
                            Teams meeting key criteria are automatically flagged for certification eligibility.
                            Requirements include minimum PulseScore of 75 and 3+ qualifying dimension scores.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-md border border-green-200">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-sm">Team Beta</h4>
                        <Badge className="bg-green-100 text-green-800">82 PulseScore</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span>Trust & Safety:</span>
                          <span className="font-medium text-green-700">88%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Peer Relationships:</span>
                          <span className="font-medium text-green-700">91%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Feedback Culture:</span>
                          <span className="font-medium text-green-700">85%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Leadership:</span>
                          <span className="font-medium text-green-700">80%</span>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs font-medium text-green-700">Certification Status:</span>
                        <span className="text-xs bg-green-100 px-2 py-0.5 rounded-full text-green-800">Eligible</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white rounded-md border border-amber-200">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-sm">Team Alpha</h4>
                        <Badge className="bg-amber-100 text-amber-800">74 PulseScore</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span>Trust & Safety:</span>
                          <span className="font-medium text-green-700">79%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Peer Relationships:</span>
                          <span className="font-medium text-green-700">82%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Feedback Culture:</span>
                          <span className="font-medium text-amber-700">68%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Leadership:</span>
                          <span className="font-medium text-green-700">78%</span>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs font-medium text-amber-700">Certification Status:</span>
                        <span className="text-xs bg-amber-100 px-2 py-0.5 rounded-full text-amber-800">Near eligible</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-800 flex items-center gap-2 mb-3">
                    <Info className="h-5 w-5 text-blue-600" />
                    <span>Certification Criteria</span>
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <div className="mt-1">•</div>
                      <span>Overall PulseScore of 75 or higher</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1">•</div>
                      <span>At least 3 dimension scores above 80%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1">•</div>
                      <span>No dimension score below 65%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1">•</div>
                      <span>Minimum response rate of 75%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between items-center text-xs text-gray-500 pt-2">
          <div className="flex items-center gap-2">
            <span>Auto-refresh:</span>
            <div className="flex border rounded-md overflow-hidden">
              <button 
                className={`px-2 py-1 ${refreshInterval === null ? 'bg-gray-100' : ''}`}
                onClick={() => handleSetRefreshInterval(null)}
              >
                Off
              </button>
              <button 
                className={`px-2 py-1 border-l ${refreshInterval === 30 ? 'bg-gray-100' : ''}`}
                onClick={() => handleSetRefreshInterval(30)}
              >
                30s
              </button>
              <button 
                className={`px-2 py-1 border-l ${refreshInterval === 60 ? 'bg-gray-100' : ''}`}
                onClick={() => handleSetRefreshInterval(60)}
              >
                60s
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Time range:</span>
            <div className="flex border rounded-md overflow-hidden">
              <button 
                className={`px-2 py-1 ${timeRange === '7d' ? 'bg-gray-100' : ''}`}
                onClick={() => handleTimeRangeChange('7d')}
              >
                7d
              </button>
              <button 
                className={`px-2 py-1 border-l ${timeRange === '30d' ? 'bg-gray-100' : ''}`}
                onClick={() => handleTimeRangeChange('30d')}
              >
                30d
              </button>
              <button 
                className={`px-2 py-1 border-l ${timeRange === '90d' ? 'bg-gray-100' : ''}`}
                onClick={() => handleTimeRangeChange('90d')}
              >
                90d
              </button>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
            <Download className="h-3.5 w-3.5" />
            <span>Export Insights</span>
          </Button>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
};

export default RealTimeInsights;
