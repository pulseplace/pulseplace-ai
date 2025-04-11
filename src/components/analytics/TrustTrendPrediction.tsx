
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowDownIcon, ArrowUpIcon, TrendingDown, TrendingUp } from 'lucide-react';

interface TrustTrendItem {
  departmentName: string;
  currentScore: number;
  previousScore: number;
  changePercentage: number;
  predictedRisk: 'high' | 'medium' | 'low' | 'none';
  riskAreas?: string[];
}

interface TrustTrendPredictionProps {
  trends: TrustTrendItem[];
}

const TrustTrendPrediction: React.FC<TrustTrendPredictionProps> = ({ trends }) => {
  const [animatedTrends, setAnimatedTrends] = useState<TrustTrendItem[]>([]);
  
  // Simulate progressive loading of trend data
  useEffect(() => {
    setAnimatedTrends([]);
    
    trends.forEach((trend, index) => {
      setTimeout(() => {
        setAnimatedTrends(prev => [...prev, trend]);
      }, 400 * index);
    });
  }, [trends]);

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-gray-500" />
          Trust Trend Prediction
        </CardTitle>
        <CardDescription>
          Predictive insights on organizational trust changes and engagement risks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {animatedTrends.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No trend data available yet. Complete at least two survey cycles to see predictions.
            </div>
          ) : (
            <ul className="space-y-4">
              {animatedTrends.map((trend, index) => {
                const isNegativeTrend = trend.changePercentage < 0;
                const isSignificantDrop = trend.changePercentage <= -10;
                
                return (
                  <li key={index} className={`p-4 border rounded-md ${isSignificantDrop ? 'bg-red-50 border-red-200' : 'bg-white'}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          {trend.departmentName}
                          {isSignificantDrop && (
                            <Badge variant="destructive" className="ml-2">
                              <AlertCircle className="h-3 w-3 mr-1" /> Alert
                            </Badge>
                          )}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="text-lg font-semibold">{trend.currentScore}</div>
                          <div className={`flex items-center text-xs ${isNegativeTrend ? 'text-red-600' : 'text-green-600'}`}>
                            {isNegativeTrend ? (
                              <ArrowDownIcon className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowUpIcon className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(trend.changePercentage).toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-500">
                            from {trend.previousScore}
                          </div>
                        </div>
                      </div>
                      <div>
                        <Badge 
                          className={`
                            ${trend.predictedRisk === 'high' ? 'bg-red-100 text-red-800 hover:bg-red-100' : 
                              trend.predictedRisk === 'medium' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : 
                              'bg-green-100 text-green-800 hover:bg-green-100'}
                          `}
                        >
                          {trend.predictedRisk === 'high' ? 'High Risk' : 
                            trend.predictedRisk === 'medium' ? 'Medium Risk' : 'Low Risk'}
                        </Badge>
                      </div>
                    </div>
                    
                    {trend.riskAreas && trend.riskAreas.length > 0 && (
                      <div className="mt-3">
                        <div className="text-xs text-gray-600 mb-1">Risk Areas:</div>
                        <div className="flex flex-wrap gap-2">
                          {trend.riskAreas.map((area, i) => (
                            <Badge key={i} variant="outline" className="text-xs font-normal">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Visual progress bar */}
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            trend.currentScore >= 80 ? 'bg-green-500' :
                            trend.currentScore >= 65 ? 'bg-blue-500' :
                            'bg-red-500'
                          }`} 
                          style={{ width: `${trend.currentScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustTrendPrediction;
