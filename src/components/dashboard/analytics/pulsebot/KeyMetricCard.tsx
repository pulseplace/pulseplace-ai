
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';

interface KeyMetricCardProps {
  title: string;
  value: string | number;
  isLoading: boolean;
}

const KeyMetricCard: React.FC<KeyMetricCardProps> = ({ title, value, isLoading }) => {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {isLoading ? (
          <Skeleton className="h-8 w-1/2" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeyMetricCard;
