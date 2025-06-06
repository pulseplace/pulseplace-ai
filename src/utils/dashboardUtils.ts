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
export const generateDemoData = (userId?: string) => {
  // Create some demo surveys
  const demoSurveys = [
    {
      id: 'demo-survey-1',
      title: 'Q1 Employee Pulse Check',
      description: 'Quarterly pulse check for employee well-being and satisfaction',
      created_by: userId || 'demo-user',
      company: 'Demo Company',
      department: 'All Departments',
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      is_active: true,
      is_anonymous: true
    },
    {
      id: 'demo-survey-2',
      title: 'Engineering Team Check-in',
      description: 'Monthly check-in on team collaboration and project status',
      created_by: userId || 'demo-user',
      company: 'Demo Company',
      department: 'Engineering',
      created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
      updated_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      is_active: false,
      is_anonymous: false
    },
    {
      id: 'demo-survey-3',
      title: 'Onboarding Experience Survey',
      description: 'Feedback on new hire onboarding process',
      created_by: userId || 'demo-user',
      company: 'Demo Company',
      department: 'HR',
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      updated_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      is_active: true,
      is_anonymous: true
    }
  ];

  // Generate demo stats
  const demoStats = {
    pulseScore: 72,
    responseRate: 68,
    employeesEngaged: 152,
    insightsGenerated: 24
  };

  return { surveys: demoSurveys, stats: demoStats };
};
