
import { supabase } from '@/integrations/supabase/client';
import { PulseBotAnalytics, AnalyticsFilters, PulseBotLog } from '../types';

export async function fetchAnalytics(filters: AnalyticsFilters): Promise<PulseBotAnalytics> {
  try {
    // Format date filters
    const dateFrom = filters.dateFrom ? filters.dateFrom.toISOString() : undefined;
    const dateTo = filters.dateTo ? filters.dateTo.toISOString() : undefined;
    
    const { data, error } = await supabase.functions.invoke('pulsebot-analytics', {
      body: { 
        dateFrom, 
        dateTo,
        language: filters.language,
        feedbackType: filters.feedbackType
      }
    });
    
    if (error) {
      console.error('Error fetching analytics:', error);
      throw new Error(error.message);
    }
    
    return data as PulseBotAnalytics;
  } catch (error) {
    console.error('Failed to fetch PulseBot analytics:', error);
    // Return fallback data structure in case of error
    return {
      totalInteractions: 0,
      uniqueUsers: 0,
      positiveRating: 0,
      topLanguages: [],
      feedbackDistribution: {
        positive: 0,
        negative: 0,
        neutral: 0
      },
      feedbackRatio: {
        positive: 0,
        negative: 0
      },
      topQueries: [],
      popularQueries: [],
      mostDownvotedResponses: [],
      topDownvotedResponses: [],
      avatarStateUsage: [],
      languageBreakdown: [],
      averageResponseTime: 0,
      logs: []
    };
  }
}

export async function fetchPulseBotLogs(limit = 100, offset = 0): Promise<PulseBotLog[]> {
  try {
    const { data, error } = await supabase
      .from('pulsebot_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    
    return data as PulseBotLog[];
  } catch (error) {
    console.error('Error fetching PulseBot logs:', error);
    return [];
  }
}
