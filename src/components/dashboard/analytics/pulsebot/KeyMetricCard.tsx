
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface KeyMetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  suffix?: string;
  trend?: {
    value: number;
    label: string;
  };
  color?: 'blue' | 'green' | 'purple' | 'amber' | 'teal';
}

const KeyMetricCard: React.FC<KeyMetricCardProps> = ({
  title,
  value,
  icon,
  suffix = '',
  trend,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: {
      text: 'text-blue-600',
      bg: 'bg-blue-100',
      trend: 'text-blue-600'
    },
    green: {
      text: 'text-green-600',
      bg: 'bg-green-100',
      trend: 'text-green-600'
    },
    purple: {
      text: 'text-purple-600',
      bg: 'bg-purple-100',
      trend: 'text-purple-600'
    },
    amber: {
      text: 'text-amber-600',
      bg: 'bg-amber-100',
      trend: 'text-amber-600'
    },
    teal: {
      text: 'text-teal-600',
      bg: 'bg-teal-100',
      trend: 'text-teal-600'
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <div className={`text-2xl font-bold ${colorClasses[color].text}`}>
              {value}{suffix}
            </div>
          </div>
          <div className={`h-12 w-12 ${colorClasses[color].bg} rounded-full flex items-center justify-center`}>
            {React.cloneElement(icon as React.ReactElement, { 
              className: `h-6 w-6 ${colorClasses[color].text}` 
            })}
          </div>
        </div>
        {trend && (
          <div className="mt-2 text-xs text-gray-500">
            <span className={colorClasses[color].trend}>
              {trend.value > 0 ? '▲' : '▼'} {Math.abs(trend.value)}%
            </span> {trend.label}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeyMetricCard;
