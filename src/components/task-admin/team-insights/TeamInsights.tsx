
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';

import HeaderSection from './HeaderSection';
import CertificationAlert from './CertificationAlert';
import InsightGrid from './InsightGrid';
import FallbackMessage from './FallbackMessage';
import { TeamInsightsProps, TeamInsight } from './types';

const TeamInsights: React.FC<TeamInsightsProps> = ({ insights: initialInsights }) => {
  const [insights, setInsights] = useState<TeamInsight[]>(initialInsights);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [realTimeStatus, setRealTimeStatus] = useState<'connected' | 'disconnected' | 'failed'>('connected');

  // Simulate real-time updates
  useEffect(() => {
    const realTimeUpdateSimulation = setTimeout(() => {
      // This simulates receiving real-time updates
      if (Math.random() > 0.8) {
        setRealTimeStatus('failed');
        toast.error("Real-time connection lost. Using cached insights data.", {
          description: "The system will automatically attempt to reconnect.",
          duration: 5000,
        });
      }
    }, 5000);

    return () => clearTimeout(realTimeUpdateSimulation);
  }, []);

  const handleRefreshInsights = () => {
    setLoading(true);
    // Simulate fetching updated insights
    setTimeout(() => {
      // Update insights with slight modifications to demonstrate real-time changes
      const updatedInsights = insights.map(insight => {
        if (insight.insight_type === 'PulseScore Certification' && insight.pulse_score) {
          return {
            ...insight,
            pulse_score: Math.min(100, insight.pulse_score + Math.floor(Math.random() * 5)),
            updated_at: new Date()
          };
        }
        if (insight.insight_type === 'Risk Alert' && insight.engagement_drop_percent) {
          return {
            ...insight, 
            engagement_drop_percent: Math.max(5, insight.engagement_drop_percent - Math.floor(Math.random() * 8)),
            updated_at: new Date()
          };
        }
        return insight;
      });
      
      setInsights(updatedInsights);
      setLastRefreshed(new Date());
      setLoading(false);
      setRealTimeStatus('connected');
      
      toast.success("Insights refreshed successfully", {
        description: "Latest AI-generated insights are now displayed.",
      });
    }, 2000);
  };

  // Check for certification eligibility
  const certificationEligibleTeams = insights
    .filter(insight => 
      insight.insight_type === 'PulseScore Certification' && 
      insight.pulse_score && 
      insight.pulse_score >= 80
    )
    .map(insight => insight.team);

  return (
    <div className="space-y-6">
      <HeaderSection 
        realTimeStatus={realTimeStatus} 
        loading={loading}
        onRefreshInsights={handleRefreshInsights}
      />
      
      <CertificationAlert teams={certificationEligibleTeams} />
      
      {insights.length > 0 ? (
        <InsightGrid insights={insights} />
      ) : (
        <FallbackMessage 
          loading={loading} 
          onRefreshInsights={handleRefreshInsights} 
        />
      )}
      
      <div className="text-xs text-gray-500 text-right">
        Last data refresh: {format(lastRefreshed, 'MMM d, yyyy • h:mm:ss a')}
      </div>
    </div>
  );
};

export default TeamInsights;
