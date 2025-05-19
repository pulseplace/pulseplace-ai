
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { db } from '@/integrations/firebase/client';

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
    const surveysQuery = query(collection(db, 'pulse_surveys'), where('is_active', '==', true));
    const surveysSnapshot = await getDocs(surveysQuery);
    const activeSurveys = surveysSnapshot.docs.length;
    
    // Get total responses
    const responsesSnapshot = await getDocs(collection(db, 'survey_responses'));
    const totalResponses = responsesSnapshot.docs.length;
    
    // Calculate average PulseScore
    const scoreData = responsesSnapshot.docs.map(doc => doc.data());
    
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
    // Get all unique departments from profiles collection
    const profilesSnapshot = await getDocs(collection(db, 'profiles'));
    
    // Get unique departments
    const departmentsSet = new Set<string>();
    profilesSnapshot.docs.forEach(doc => {
      const profile = doc.data();
      if (profile.department) {
        departmentsSet.add(profile.department);
      }
    });
    
    const departments = Array.from(departmentsSet);
    
    // For each department, get average score
    const departmentStats: DepartmentStats[] = [];
    
    for (const department of departments) {
      // Get profiles with this department
      const profilesQuery = query(
        collection(db, 'profiles'), 
        where('department', '==', department)
      );
      const profilesWithDeptSnapshot = await getDocs(profilesQuery);
      const userIds = profilesWithDeptSnapshot.docs.map(doc => doc.id);
      
      // Get responses from users in this department
      const allResponses = [];
      
      for (const userId of userIds) {
        const responsesQuery = query(
          collection(db, 'responses'),
          where('userId', '==', userId)
        );
        const responsesSnapshot = await getDocs(responsesQuery);
        allResponses.push(...responsesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      }
      
      // Calculate average score
      let departmentScore = 0;
      if (allResponses && allResponses.length > 0) {
        const totalScore = allResponses.reduce((sum, item) => {
          const score = item.pulse_score?.overallScore || 0;
          return sum + score;
        }, 0);
        departmentScore = Math.round(totalScore / allResponses.length);
      } else {
        // If no responses, generate a random score for demo purposes
        departmentScore = Math.floor(Math.random() * 30) + 65;
      }
      
      departmentStats.push({
        department,
        score: departmentScore,
        responseCount: allResponses?.length || 0
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
    // In a real app, this would fetch from a certifications collection
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
