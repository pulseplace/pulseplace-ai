
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { Tables } from '@/types/database.types';

export interface DepartmentStats {
  department: string;
  score: number;
  responseCount: number;
}

export interface CertificationSummary {
  date: string;
  department: string;
  score: number;
  level: string;
  status: string;
}

// Fetch overall stats for the admin dashboard
export const fetchAdminDashboardStats = async (): Promise<{
  overallScore: number;
  activeSurveys: number;
  responseRate: number;
  insightsGenerated: number;
}> => {
  try {
    // Get total number of surveys
    const { data: surveys, error: surveysError } = await supabase
      .from('pulse_surveys')
      .select('id, is_active');
    
    if (surveysError) throw surveysError;
    
    const activeSurveys = surveys.filter(s => s.is_active).length;
    
    // Get total responses
    const { count: totalResponses, error: responsesError } = await supabase
      .from('survey_responses')
      .select('*', { count: 'exact', head: true });
    
    if (responsesError) throw responsesError;
    
    // Calculate average PulseScore
    const { data: scoreData, error: scoreError } = await supabase
      .from('survey_responses')
      .select('pulse_score');
    
    if (scoreError) throw scoreError;
    
    // Calculate average overall score
    let overallScore = 0;
    if (scoreData && scoreData.length > 0) {
      const totalScore = scoreData.reduce((sum, item) => {
        const score = item.pulse_score?.overallScore || 0;
        return sum + score;
      }, 0);
      overallScore = Math.round(totalScore / scoreData.length);
    }
    
    // Mock response rate for now (in a real app, this would be calculated based on invitations)
    const responseRate = Math.min(78, Math.floor(Math.random() * 20) + 65);
    
    // Mock insights count (in a real app, this would be a count from an insights table)
    const insightsGenerated = Math.floor(Math.random() * 20) + 30;
    
    return {
      overallScore,
      activeSurveys,
      responseRate,
      insightsGenerated
    };
    
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    throw error;
  }
};

// Fetch department stats
export const fetchDepartmentStats = async (): Promise<DepartmentStats[]> => {
  try {
    // Get all unique departments
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('department')
      .not('department', 'is', null);
    
    if (profilesError) throw profilesError;
    
    // Get unique departments
    const departmentsSet = new Set<string>();
    profiles.forEach(profile => {
      if (profile.department) {
        departmentsSet.add(profile.department);
      }
    });
    
    const departments = Array.from(departmentsSet);
    
    // For each department, get average score
    const departmentStats: DepartmentStats[] = [];
    
    for (const department of departments) {
      // Get responses from users in this department
      const { data: responses, error: responsesError } = await supabase
        .from('survey_responses')
        .select(`
          id,
          pulse_score,
          profiles!inner(
            department
          )
        `)
        .eq('profiles.department', department);
      
      if (responsesError) throw responsesError;
      
      // Calculate average score
      let departmentScore = 0;
      if (responses && responses.length > 0) {
        const totalScore = responses.reduce((sum, item) => {
          const score = item.pulse_score?.overallScore || 0;
          return sum + score;
        }, 0);
        departmentScore = Math.round(totalScore / responses.length);
      } else {
        // If no responses, generate a random score for demo purposes
        departmentScore = Math.floor(Math.random() * 30) + 65;
      }
      
      departmentStats.push({
        department,
        score: departmentScore,
        responseCount: responses?.length || 0
      });
    }
    
    // Sort by score (highest first)
    return departmentStats.sort((a, b) => b.score - a.score);
    
  } catch (error) {
    console.error('Error fetching department stats:', error);
    throw error;
  }
};

// Fetch recent certifications
export const fetchRecentCertifications = async (): Promise<CertificationSummary[]> => {
  try {
    // In a real app, this would fetch from a certifications table
    // For now, we'll create mock data based on the department scores
    
    const departmentStats = await fetchDepartmentStats();
    
    const certifications: CertificationSummary[] = departmentStats.slice(0, 3).map((dept, index) => {
      const today = new Date();
      const date = new Date(today);
      date.setDate(today.getDate() - (index * 15)); // Space them out by 15 days
      
      // Determine level based on score
      let level = 'Emerging Culture';
      if (dept.score >= 85) {
        level = 'Pulse Certified™';
      } else if (dept.score < 50) {
        level = 'At Risk';
      }
      
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        department: dept.department,
        score: dept.score,
        level,
        status: 'Active'
      };
    });
    
    return certifications;
    
  } catch (error) {
    console.error('Error fetching recent certifications:', error);
    throw error;
  }
};
