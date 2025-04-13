
import React from 'react';
import TrustTrendPrediction from '@/components/analytics/TrustTrendPrediction';
import AIIntegrationStatus from '@/components/task-admin/AIIntegrationStatus';

interface AnalyticsSectionProps {
  trustTrends: Array<{
    departmentName: string;
    currentScore: number;
    previousScore: number;
    changePercentage: number;
    predictedRisk: "high" | "medium" | "low";
    riskAreas: string[];
  }>;
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ trustTrends }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TrustTrendPrediction trends={trustTrends} />
      <AIIntegrationStatus />
    </div>
  );
};

export default AnalyticsSection;
