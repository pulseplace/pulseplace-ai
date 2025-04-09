
import { supabase } from '@/integrations/supabase/client';
import { SummaryStats } from './types';
import { DateRangeFilter } from '@/components/ui/date-range-picker';

export const statsService = {
  async getSummaryStats(
    departmentFilter?: string, 
    pulseThemeFilter?: string,
    dateRange?: DateRangeFilter
  ): Promise<SummaryStats> {
    try {
      // First get team members to calculate participation
      let membersQuery = supabase
        .from('team_members')
        .select('id, surveyStatus');
      
      if (departmentFilter && departmentFilter !== 'All Departments') {
        membersQuery = membersQuery.eq('department', departmentFilter);
      }
      
      const { data: membersData, error: membersError } = await membersQuery;
      
      if (membersError) throw membersError;
      
      const totalMembers = membersData?.length || 0;
      const completedSurveys = membersData?.filter(m => m.surveyStatus === 'completed').length || 0;
      const pendingSurveys = membersData?.filter(m => m.surveyStatus === 'pending').length || 0;
      
      const participationRate = totalMembers > 0 
        ? Math.round((completedSurveys / totalMembers) * 100)
        : 0;
      
      // Now fetch survey responses to calculate scores
      let responsesQuery = supabase
        .from('survey_responses')
        .select(`
          id, 
          pulse_score,
          team_members(department)
        `);
      
      if (departmentFilter && departmentFilter !== 'All Departments') {
        responsesQuery = responsesQuery.eq('team_members.department', departmentFilter);
      }
      
      if (dateRange?.from) {
        responsesQuery = responsesQuery.gte('created_at', dateRange.from.toISOString());
      }
      
      if (dateRange?.to) {
        responsesQuery = responsesQuery.lte('created_at', dateRange.to.toISOString());
      }
      
      const { data: responsesData, error: responsesError } = await responsesQuery;
      
      if (responsesError) throw responsesError;
      
      // Calculate average score from pulse_score data
      let averageScore = 0;
      let themeScores: { theme: string; score: number }[] = [
        { theme: "Trust & Safety", score: 0 },
        { theme: "Engagement", score: 0 },
        { theme: "Culture", score: 0 },
        { theme: "Growth & Development", score: 0 },
        { theme: "Wellbeing", score: 0 },
      ];
      
      // Track counts separately
      let themeCounts = {
        "Trust & Safety": 0,
        "Engagement": 0,
        "Culture": 0,
        "Growth & Development": 0,
        "Wellbeing": 0
      };
      
      responsesData?.forEach(response => {
        if (response.pulse_score && response.pulse_score.overallScore) {
          averageScore += response.pulse_score.overallScore;
          
          // If pulse_score has themeScores, aggregate them
          if (response.pulse_score.themeScores) {
            response.pulse_score.themeScores.forEach((themeScore: any) => {
              const themeIndex = themeScores.findIndex(t => t.theme === themeScore.theme);
              if (themeIndex !== -1) {
                themeScores[themeIndex].score += themeScore.score;
                themeCounts[themeScore.theme as keyof typeof themeCounts] += 1;
              }
            });
          }
        }
      });
      
      // Calculate final average scores
      if (responsesData && responsesData.length > 0) {
        averageScore = Math.round(averageScore / responsesData.length);
        
        // Calculate average for each theme
        themeScores = themeScores.map(theme => ({
          theme: theme.theme,
          score: themeCounts[theme.theme as keyof typeof themeCounts] > 0 
            ? Math.round(theme.score / themeCounts[theme.theme as keyof typeof themeCounts]) 
            : 0
        }));
      }
      
      // If we're filtering by a specific theme, adjust the overall average
      if (pulseThemeFilter && pulseThemeFilter !== 'All Themes') {
        const filteredTheme = themeScores.find(t => t.theme === pulseThemeFilter);
        if (filteredTheme) {
          averageScore = filteredTheme.score;
        }
      }
      
      return {
        participationRate,
        averageScore,
        completedSurveys,
        pendingSurveys,
        themeScores
      };
    } catch (error) {
      console.error('Error fetching summary stats:', error);
      return {
        participationRate: 0,
        averageScore: 0,
        completedSurveys: 0,
        pendingSurveys: 0,
        themeScores: [
          { theme: "Trust & Safety", score: 0 },
          { theme: "Engagement", score: 0 },
          { theme: "Culture", score: 0 },
          { theme: "Growth & Development", score: 0 },
          { theme: "Wellbeing", score: 0 },
        ]
      };
    }
  }
};
