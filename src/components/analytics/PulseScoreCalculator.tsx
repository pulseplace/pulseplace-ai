
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gauge, Award, BarChart, Download, Info, CheckCircle, AlertTriangle, Users } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CategoryScore {
  category: string;
  score: number;
  weight: number;
  trend?: 'up' | 'down' | 'stable';
  aiInsight?: string;
}

interface PulseScoreCalculatorProps {
  overallScore: number;
  categoryScores: CategoryScore[];
  benchmarkComparison?: number;
  participationRate?: number;
  certificationStatus: 'certified' | 'emerging' | 'at_risk' | 'needs_attention';
  certificationRationale?: string;
  lastCalculated?: string;
}

const PulseScoreCalculator: React.FC<PulseScoreCalculatorProps> = ({
  overallScore,
  categoryScores,
  benchmarkComparison = 0,
  participationRate = 0,
  certificationStatus,
  certificationRationale,
  lastCalculated
}) => {
  const [showAiInsights, setShowAiInsights] = useState(false);

  // Helper function to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  // Helper function to get progress color based on score
  const getProgressColor = (score: number) => {
    if (score >= 85) return 'bg-green-600';
    if (score >= 70) return 'bg-blue-600';
    if (score >= 50) return 'bg-amber-600';
    return 'bg-red-600';
  };

  // Helper function to get certification badge
  const getCertificationBadge = (status: string) => {
    switch (status) {
      case 'certified':
        return (
          <Badge className="bg-green-100 text-green-800 border border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Pulse Certified™
          </Badge>
        );
      case 'emerging':
        return (
          <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
            <Info className="h-3 w-3 mr-1" /> Emerging Culture
          </Badge>
        );
      case 'at_risk':
        return (
          <Badge className="bg-amber-100 text-amber-800 border border-amber-200">
            <AlertTriangle className="h-3 w-3 mr-1" /> At Risk
          </Badge>
        );
      default:
        return (
          <Badge className="bg-red-100 text-red-800 border border-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" /> Needs Attention
          </Badge>
        );
    }
  };

  // Helper function to get trend icon
  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <span className="text-green-600">↑</span>;
      case 'down':
        return <span className="text-red-600">↓</span>;
      default:
        return <span className="text-gray-600">→</span>;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-pulse-600" />
            <CardTitle className="text-lg">PulseScore™ Calculator</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {getCertificationBadge(certificationStatus)}
          </div>
        </div>
        <CardDescription className="flex items-center justify-between">
          <span>AI-powered workplace culture health score</span>
          {lastCalculated && (
            <span className="text-xs text-gray-500">Calculated: {lastCalculated}</span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overall score */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-br from-pulse-100 to-pulse-50 mb-2">
            <div className="bg-white dark:bg-gray-950 rounded-full p-3">
              <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}
              </div>
            </div>
          </div>
          
          <div className="mt-2">
            <div className="text-sm font-medium mb-1 flex items-center justify-center gap-1">
              <span>vs. Industry Benchmark</span>
              <span className="text-xs">
                {benchmarkComparison > 0 ? `+${benchmarkComparison}%` : `${benchmarkComparison}%`}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 justify-center mb-2">
              <Users className="h-3 w-3" />
              <span>{participationRate}% Participation Rate</span>
            </div>
          </div>
        </div>

        {/* AI insight toggle */}
        <div className="flex justify-end mb-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs flex items-center gap-1"
            onClick={() => setShowAiInsights(!showAiInsights)}
          >
            <Info className="h-3.5 w-3.5" />
            {showAiInsights ? 'Hide AI Insights' : 'Show AI Insights'}
          </Button>
        </div>

        {/* Category scores */}
        <div className="space-y-4">
          {categoryScores.map((category, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-sm">{category.category}</span>
                  {getTrendIcon(category.trend)}
                </div>
                <div className="text-sm font-medium">
                  {category.score}
                  <span className="text-xs text-gray-500 ml-1">({category.weight}x)</span>
                </div>
              </div>
              
              <Progress 
                value={category.score} 
                className="h-2"
                indicatorClassName={getProgressColor(category.score)}
              />
              
              {showAiInsights && category.aiInsight && (
                <div className="mt-1 text-xs text-gray-600 flex items-start gap-1">
                  <Info className="h-3 w-3 mt-0.5 text-pulse-600 shrink-0" />
                  <span>{category.aiInsight}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Certification rationale */}
        {certificationRationale && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <div className="flex items-center gap-2 mb-1">
              <Award className="h-4 w-4 text-pulse-600" />
              <h4 className="font-medium text-sm">
                AI Certification Analysis
              </h4>
            </div>
            <p className="text-sm text-gray-700">{certificationRationale}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                <BarChart className="h-3.5 w-3.5" />
                <span>View Details</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View detailed score breakdown</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                <Download className="h-3.5 w-3.5" />
                <span>Export Report</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download PulseScore™ certification report</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default PulseScoreCalculator;
