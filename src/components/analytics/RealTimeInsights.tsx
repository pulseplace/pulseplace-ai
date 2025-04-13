
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, TrendingUp, TrendingDown, AlertCircle, Download, ChevronRight, RefreshCw, BarChart2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-pulse-600" />
            <CardTitle className="text-lg">Real-Time AI Insights</CardTitle>
          </div>
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={onRefresh}
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
          </TabsList>

          <TabsContent value="sentiment">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>Positive Themes</span>
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
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  <span>Areas of Concern</span>
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
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <ChevronRight className="h-4 w-4 text-blue-600" />
                  <span>Neutral Observations</span>
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
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="font-medium text-sm">{trend.name}</h4>
                        <span className={`text-xs ${trend.direction === 'up' ? 'text-green-600' : trend.direction === 'down' ? 'text-red-600' : 'text-blue-600'}`}>
                          {trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : ''}
                          {trend.percentage}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{trend.description}</p>
                    </div>
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
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
          <Download className="h-3.5 w-3.5" />
          <span>Export Insights</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RealTimeInsights;
