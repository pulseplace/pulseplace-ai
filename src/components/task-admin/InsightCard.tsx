
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, AlertTriangle, BarChart2, Users, Shield } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import SparklineChart from './SparklineChart';

interface InsightCardProps {
  title: string;
  type: 'info' | 'warning' | 'success' | 'neutral';
  content: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  sparklineData?: { value: number; timestamp: string }[];
  badgeText?: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ 
  title, 
  type, 
  content, 
  footer, 
  icon, 
  sparklineData,
  badgeText
}) => {
  const getBorderColor = () => {
    switch (type) {
      case 'info': return 'border-blue-500';
      case 'warning': return 'border-amber-500';
      case 'success': return 'border-green-500';
      default: return 'border-gray-300';
    }
  };

  const getIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'success': return <Shield className="h-5 w-5 text-green-500" />;
      default: return <BarChart2 className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className={`overflow-hidden border-l-4 ${getBorderColor()} hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <span className="mr-2">{getIcon()}</span>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </div>
          {badgeText && (
            <Badge variant="outline" className="ml-2">{badgeText}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">{content}</div>
        
        {sparklineData && (
          <div className="mb-4">
            <SparklineChart 
              data={sparklineData} 
              color={type === 'info' ? '#3b82f6' : type === 'warning' ? '#f59e0b' : type === 'success' ? '#10b981' : '#6b7280'} 
              trend={sparklineData[0].value < sparklineData[sparklineData.length - 1].value ? 'up' : 'down'} 
            />
          </div>
        )}
        
        {footer && (
          <div className="pt-3 border-t border-gray-100 text-xs text-gray-500">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightCard;
