
// Sample data for analytics dashboard
// In a real app this would be fetched from an API

export const trendData = [
  { month: 'Jan', pulseScore: 81, sentiment: 77, responseRate: 85, benchmark: 76 },
  { month: 'Feb', pulseScore: 82, sentiment: 78, responseRate: 82, benchmark: 76 },
  { month: 'Mar', pulseScore: 80, sentiment: 76, responseRate: 80, benchmark: 77 },
  { month: 'Apr', pulseScore: 79, sentiment: 74, responseRate: 83, benchmark: 77 },
  { month: 'May', pulseScore: 81, sentiment: 77, responseRate: 86, benchmark: 78 },
  { month: 'Jun', pulseScore: 83, sentiment: 79, responseRate: 84, benchmark: 78 },
  { month: 'Jul', pulseScore: 84, sentiment: 81, responseRate: 85, benchmark: 79 },
  { month: 'Aug', pulseScore: 85, sentiment: 82, responseRate: 87, benchmark: 79 },
  { month: 'Sep', pulseScore: 87, sentiment: 83, responseRate: 88, benchmark: 80 },
  { month: 'Oct', pulseScore: 86, sentiment: 82, responseRate: 86, benchmark: 80 },
  { month: 'Nov', pulseScore: 85, sentiment: 81, responseRate: 85, benchmark: 81 },
  { month: 'Dec', pulseScore: 86, sentiment: 82, responseRate: 87, benchmark: 81 }
];

export const themeData = [
  { name: 'Work-Life Balance', frequency: 245, sentiment: 78 },
  { name: 'Career Growth', frequency: 190, sentiment: 65 },
  { name: 'Team Dynamics', frequency: 210, sentiment: 82 },
  { name: 'Management', frequency: 180, sentiment: 77 },
  { name: 'Compensation', frequency: 150, sentiment: 60 },
  { name: 'Culture', frequency: 220, sentiment: 86 },
  { name: 'Tools & Resources', frequency: 160, sentiment: 73 },
];

export const benchmarkData = [
  { name: 'Overall Score', value: 86, benchmark: 78 },
  { name: 'Emotion Index', value: 82, benchmark: 74 },
  { name: 'Engagement', value: 88, benchmark: 77 },
  { name: 'Trust', value: 85, benchmark: 76 },
  { name: 'Alignment', value: 81, benchmark: 73 },
  { name: 'Recognition', value: 83, benchmark: 75 },
];

export const attritionData = [
  { id: 1, department: 'Engineering', risk: 'low', score: 15, employees: 42 },
  { id: 2, department: 'Sales', risk: 'medium', score: 35, employees: 24 },
  { id: 3, department: 'Customer Support', risk: 'high', score: 72, employees: 18 },
  { id: 4, department: 'Marketing', risk: 'medium', score: 45, employees: 12 },
  { id: 5, department: 'HR', risk: 'low', score: 20, employees: 8 },
  { id: 6, department: 'Product', risk: 'low', score: 18, employees: 15 },
];

// AI-driven insights
export const aiInsights = {
  topConcerns: [
    "Work-life balance continues to be the most mentioned concern",
    "Career advancement opportunities seen as limited",
    "Compensation packages viewed as below market value"
  ],
  predictiveFlags: [
    { department: "Customer Support", issue: "Trust Score trending down", severity: "high" },
    { department: "Sales", issue: "Engagement dropped 8% this month", severity: "medium" },
    { department: "Marketing", issue: "Response rate falling", severity: "low" }
  ],
  recommendedActions: [
    "Schedule listening sessions with Customer Support team",
    "Review Sales team quarterly objectives and recognition program",
    "Implement flexible working arrangements to improve work-life balance"
  ]
};
