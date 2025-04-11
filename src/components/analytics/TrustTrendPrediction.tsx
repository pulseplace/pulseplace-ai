
import React from 'react';
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
          {trends.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No trend data available yet. Complete at least two survey cycles to see predictions.
            </div>
          ) : (
            <ul className="space-y-4">
              {trends.map((trend, index) => {
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
                        <div className="mt-1 text-sm text-gray-500">
                          Trust Score: {trend.currentScore}% 
                          <span className={`inline-flex items-center ml-2 ${isNegativeTrend ? 'text-red-600' : 'text-green-600'}`}>
                            {isNegativeTrend ? (
                              <>
                                <ArrowDownIcon className="h-3 w-3 mr-1" />
                                {Math.abs(trend.changePercentage).toFixed(1)}%
                              </>
                            ) : (
                              <>
                                <ArrowUpIcon className="h-3 w-3 mr-1" />
                                {trend.changePercentage.toFixed(1)}%
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                      
                      <Badge 
                        variant={
                          trend.predictedRisk === 'high' ? 'destructive' : 
                          trend.predictedRisk === 'medium' ? 'warning' : 
                          trend.predictedRisk === 'low' ? 'secondary' : 
                          'outline'
                        }
                      >
                        {trend.predictedRisk === 'high' ? 'High Risk' : 
                         trend.predictedRisk === 'medium' ? 'Medium Risk' : 
                         trend.predictedRisk === 'low' ? 'Low Risk' : 
                         'No Risk'}
                      </Badge>
                    </div>
                    
                    {trend.predictedRisk !== 'none' && trend.riskAreas && (
                      <div className="mt-3 text-sm">
                        <p className="font-medium text-gray-700">Potential impact areas:</p>
                        <ul className="mt-1 list-disc list-inside text-gray-600 pl-2">
                          {trend.riskAreas.map((area, idx) => (
                            <li key={idx}>{area}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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
