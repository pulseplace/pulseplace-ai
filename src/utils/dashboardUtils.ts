
/**
 * Calculate response rate based on survey and response data
 * @param surveys Survey data
 * @param responses Response data
 * @returns Calculated response rate percentage
 */
export const calculateResponseRate = (surveys: any[], responses: any[]): number => {
  if (!surveys || surveys.length === 0) return 0;
  
  // In a real app, you would count actual invitations sent
  const estimatedInvitations = surveys.length * 10; // Assume 10 invitations per survey
  const actualResponses = responses?.length || 0;
  
  return Math.min(Math.round((actualResponses / Math.max(estimatedInvitations, 1)) * 100), 100);
};

/**
 * Calculate dashboard statistics from survey and response data
 * @param surveys Survey data
 * @param responses Response data
 * @returns Dashboard statistics
 */
export const calculateDashboardStats = (surveys: any[], responses: any[]): {
  pulseScore: number;
  responseRate: number;
  employeesEngaged: number;
  insightsGenerated: number;
} => {
  let totalPulseScore = 0;
  let scoreCount = 0;

  responses?.forEach(response => {
    if (response.pulse_score && response.pulse_score.overallScore) {
      totalPulseScore += response.pulse_score.overallScore;
      scoreCount++;
    }
  });

  return {
    pulseScore: scoreCount > 0 ? Math.round(totalPulseScore / scoreCount) : 0,
    responseRate: calculateResponseRate(surveys, responses),
    employeesEngaged: new Set(responses?.map(r => r.user_id) || []).size,
    insightsGenerated: Math.min(responses?.length * 2 || 0, 30) // Mock value for insights
  };
};

/**
 * Generate demo data for fallback purposes
 * @param userId User ID for the demo data
 * @returns Demo survey and stats
 */
export const generateDemoData = (userId: string | undefined) => {
  const surveyData = [{
    id: '1',
    title: 'Demo Survey',
    description: 'This is a demo survey loaded after timeout',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: userId || 'demo-user',
    company: 'Demo Company',
    department: 'All Departments',
    is_active: true
  }];
  
  const statsData = {
    pulseScore: 75,
    responseRate: 60,
    employeesEngaged: 12,
    insightsGenerated: 8
  };
  
  return { surveys: surveyData, stats: statsData };
};
