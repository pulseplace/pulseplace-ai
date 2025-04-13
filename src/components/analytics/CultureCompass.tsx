
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Compass, Award, ArrowUp, ArrowDown, TrendingUp, TrendingDown, AlertCircle, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CultureDimension {
  name: string;
  score: number;
  benchmark: number;
  gap: number;
  status: 'strength' | 'neutral' | 'opportunity';
  trend?: 'up' | 'down' | 'stable';
  keyInsight?: string;
}

interface CultureCompassProps {
  dimensions: CultureDimension[];
  overallAlignment: number;
  primaryStrength: string;
  primaryGap: string;
  lastUpdated?: string;
  predictedRisks?: Array<{
    type: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
  }>;
}

const CultureCompass: React.FC<CultureCompassProps> = ({
  dimensions,
  overallAlignment,
  primaryStrength,
  primaryGap,
  lastUpdated,
  predictedRisks = []
}) => {
  const [showInsights, setShowInsights] = useState(false);
  
  // Helper function to determine status color
  const getStatusColor = (status: 'strength' | 'neutral' | 'opportunity') => {
    switch (status) {
      case 'strength':
        return 'text-green-600';
      case 'opportunity':
        return 'text-amber-600';
      default:
        return 'text-blue-600';
    }
  };
  
  // Helper function to determine status icon
  const getStatusIcon = (status: 'strength' | 'neutral' | 'opportunity') => {
    switch (status) {
      case 'strength':
        return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'opportunity':
        return <ArrowDown className="h-4 w-4 text-amber-600" />;
      default:
        return null;
    }
  };

  // Helper function to determine trend icon
  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  // Helper function to determine risk severity styles
  const getRiskSeverityStyles = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'medium':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-pulse-600" />
            <CardTitle className="text-lg">Culture Compass™</CardTitle>
          </div>
          <div className="bg-pulse-50 text-pulse-700 py-1 px-3 rounded-full text-sm font-medium">
            {Math.round(overallAlignment)}% Aligned
          </div>
        </div>
        <CardDescription className="flex items-center justify-between">
          <span>Measuring cultural alignment across key dimensions</span>
          {lastUpdated && (
            <span className="text-xs text-gray-500">Updated: {lastUpdated}</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* AI insight toggle */}
          <div className="flex justify-end mb-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs flex items-center gap-1"
              onClick={() => setShowInsights(!showInsights)}
            >
              <Info className="h-3.5 w-3.5" />
              {showInsights ? 'Hide AI Insights' : 'Show AI Insights'}
            </Button>
          </div>

          {/* Key dimensions */}
          <div className="space-y-4">
            {dimensions.map((dimension, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{dimension.name}</span>
                    {getStatusIcon(dimension.status)}
                    {getTrendIcon(dimension.trend)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{dimension.score}</span>
                    <span className="text-xs text-gray-500">vs {dimension.benchmark}</span>
                  </div>
                </div>
                
                <div className="relative pt-1">
                  <Progress value={dimension.score} className="h-2" />
                  <div 
                    className="absolute top-1 w-1 h-4 bg-gray-600 rounded-full"
                    style={{ left: `${dimension.benchmark}%` }}
                  />
                </div>
                
                <div className="flex justify-between">
                  <div>
                    {showInsights && dimension.keyInsight && (
                      <div className="text-xs text-gray-600 mt-1 flex items-start gap-1">
                        <Info className="h-3 w-3 mt-0.5 text-pulse-600 shrink-0" />
                        <span>{dimension.keyInsight}</span>
                      </div>
                    )}
                  </div>
                  <span className={`text-xs ${getStatusColor(dimension.status)}`}>
                    {dimension.gap > 0 ? '+' : ''}{dimension.gap} {dimension.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Predicted risks section */}
          {predictedRisks.length > 0 && (
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <span>Predicted Culture Risks</span>
              </h4>
              <div className="space-y-2">
                {predictedRisks.map((risk, index) => (
                  <div 
                    key={index} 
                    className={`p-2 border rounded-md text-sm ${getRiskSeverityStyles(risk.severity)}`}
                  >
                    <div className="font-medium">{risk.type}</div>
                    <div className="text-xs">{risk.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Summary insights */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div className="bg-green-50 p-3 rounded-md">
              <div className="flex items-center gap-2 mb-1">
                <Award className="h-4 w-4 text-green-600" />
                <h4 className="font-medium text-sm">Primary Strength</h4>
              </div>
              <p className="text-sm text-gray-700">{primaryStrength}</p>
            </div>
            
            <div className="bg-amber-50 p-3 rounded-md">
              <div className="flex items-center gap-2 mb-1">
                <ArrowUp className="h-4 w-4 text-amber-600" />
                <h4 className="font-medium text-sm">Growth Opportunity</h4>
              </div>
              <p className="text-sm text-gray-700">{primaryGap}</p>
            </div>
          </div>

          {/* Export options */}
          <div className="mt-4 flex justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs">
                    Export Insights
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download Culture Compass™ report</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CultureCompass;
