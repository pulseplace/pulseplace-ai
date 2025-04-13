
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Check, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { formatTimestamp, renderInsightContent, renderTrendVisualization, getSentimentIndicator, getCardBorderColor, getInsightTypeIcon } from './insightUtils';
import { TeamInsight } from './types';

interface InsightCardProps {
  insight: TeamInsight;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  return (
    <Card className={`overflow-hidden border-l-4 ${getCardBorderColor(insight.insight_type)} hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{insight.team}</CardTitle>
          {getInsightTypeIcon(insight.insight_type)}
        </div>
        <p className="text-sm text-gray-500 mt-1">{insight.insight_type}</p>
      </CardHeader>
      <CardContent>
        {renderInsightContent(insight)}
        
        {/* Enhanced visualization for trends */}
        {renderTrendVisualization(insight)}
        
        {/* Last updated timestamp */}
        <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
          <span>Last updated: {formatTimestamp(insight.updated_at)}</span>
          {getSentimentIndicator(insight)}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
