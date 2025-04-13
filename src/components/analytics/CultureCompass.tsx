
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Compass, Award, ArrowUp, ArrowDown } from 'lucide-react';

interface CultureDimension {
  name: string;
  score: number;
  benchmark: number;
  gap: number;
  status: 'strength' | 'neutral' | 'opportunity';
}

interface CultureCompassProps {
  dimensions: CultureDimension[];
  overallAlignment: number;
  primaryStrength: string;
  primaryGap: string;
}

const CultureCompass: React.FC<CultureCompassProps> = ({
  dimensions,
  overallAlignment,
  primaryStrength,
  primaryGap
}) => {
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
        <CardDescription>Measuring cultural alignment across key dimensions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Key dimensions */}
          <div className="space-y-4">
            {dimensions.map((dimension, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{dimension.name}</span>
                    {getStatusIcon(dimension.status)}
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
                
                <div className="flex justify-end">
                  <span className={`text-xs ${getStatusColor(dimension.status)}`}>
                    {dimension.gap > 0 ? '+' : ''}{dimension.gap} {dimension.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
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
        </div>
      </CardContent>
    </Card>
  );
};

export default CultureCompass;
