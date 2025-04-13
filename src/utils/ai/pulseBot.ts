
/**
 * Process PulseBot queries using AI
 */
export const processPulseBotQuery = (query: string, contextData: any) => {
  // This is a simplified mock implementation
  // In a real production app, this would connect to an LLM API
  
  console.log('Processing PulseBot query:', query);
  console.log('With context data:', contextData);
  
  // Simple keyword matching for demo purposes
  let response = '';
  let suggestedFollowups: string[] = [];
  
  const lowerQuery = query.toLowerCase();
  
  // Quick prompt handlers for demo
  if (lowerQuery.includes('summarize team alpha') || lowerQuery.includes('team alpha summary')) {
    response = `Team Alpha Culture Summary (April 13, 2025):

Your team continues to show high alignment and positive sentiment around leadership and collaboration. 74% of employees reported greater clarity in roles, with many referencing "transparent decision-making" in their responses.

However, some concern persists around workload balance and recognition. Feedback like "deadlines are always tight" suggests a need for better pacing or clearer prioritization.

We recommend a short check-in session to revisit scope alignment. This team is well-positioned to improve from a good to great culture baseline.`;
    
    suggestedFollowups = [
      "Show risk for Team Gamma",
      "Why is Team Beta eligible for certification?",
      "What actions would improve Team Alpha's workload balance?"
    ];
  }
  else if (lowerQuery.includes('show risk for team gamma') || lowerQuery.includes('team gamma risk')) {
    response = `Team Gamma Risk Assessment (April 13, 2025):

Risk Type: Burnout & Manager Disconnect
Severity: High
Key Indicators:
- Engagement dropped 28% in the last 30 days
- Sentiment declined from 70% positive to 48%
- Manager feedback scores down 31%

Primary causes appear to be increased workload following the recent product launch and perceived lack of leadership support. Three team members specifically mentioned feeling "disconnected from leadership decisions."

Recommended Action: Schedule 1:1 check-ins with all team members within 72 hours and consider leadership coaching for the team manager.`;
    
    suggestedFollowups = [
      "Summarize Team Alpha",
      "Why is Team Beta eligible for certification?",
      "What leadership coaching would help Team Gamma?"
    ];
  }
  else if (lowerQuery.includes('why is team beta') || lowerQuery.includes('team beta certification')) {
    response = `Team Beta Certification Eligibility (April 13, 2025):

Team Beta has achieved a PulseScore of 82/100, qualifying for Culture Certified™ status.

Key qualifying factors:
- Exceeds benchmarks in 3 critical areas: Inclusion (88%), Peer Trust (91%), and Feedback Culture (85%)
- Maintains consistent high scores for 3 consecutive quarters
- 93% survey participation rate (exceeds 75% threshold)
- Strong leadership alignment scores (87%)

While there are improvement areas in Workload Balance and Career Clarity, these don't prevent certification as they remain above minimum thresholds.

This team demonstrates exceptional psychological safety and communication patterns that serve as internal best practices.`;
    
    suggestedFollowups = [
      "Summarize Team Alpha",
      "Show risk for Team Gamma",
      "What would improve Team Beta's career clarity scores?"
    ];
  }
  // NEW TEAM: SIGMA
  else if (lowerQuery.includes('team sigma') || lowerQuery.includes('summarize team sigma')) {
    response = `Team Sigma Culture Summary (April 13, 2025):

Team Sigma shows promising cultural indicators with a growing PulseScore of 78/100, approaching certification threshold.

Key strengths:
- Innovation & creativity (92% positive sentiment)
- Cross-functional collaboration (87% positive)
- Learning culture (84% positive)

Areas for development:
- Work-life balance (64% positive)
- Communication clarity (69% positive)
- Recognition practices (71% positive)

Team members report high energy and enthusiasm for their work, but signs of potential burnout are emerging. Implementing structured "innovation time" while addressing workload concerns could help this team reach certification level within the next quarter.`;
    
    suggestedFollowups = [
      "What's causing work-life balance issues in Team Sigma?",
      "How can Team Sigma improve their communication clarity?",
      "Compare Team Sigma to Team Beta",
      "What recognition practices work best for innovation teams?"
    ];
  }
  // NEW TEAM: ZETA
  else if (lowerQuery.includes('team zeta') || lowerQuery.includes('summarize team zeta')) {
    response = `Team Zeta Culture Summary (April 13, 2025):

Team Zeta is our highest performing team with an exceptional PulseScore of 94/100, earning Gold Certification status.

Key strengths:
- Psychological safety (96% positive)
- Leadership trust (95% positive)
- Team cohesion (93% positive)
- Career development (91% positive)
- Work-life balance (90% positive)

Success factors:
- Regular "no-meeting Wednesdays" policy
- Transparent decision-making processes
- Bi-weekly retrospectives with actionable outcomes
- Growth-focused 1:1 coaching sessions
- Clear role definitions with autonomy

Team Zeta serves as our internal benchmark for cultural excellence and demonstrates practices worth scaling across the organization.`;
    
    suggestedFollowups = [
      "What practices from Team Zeta should we implement company-wide?",
      "How does Team Zeta maintain work-life balance?",
      "What leadership style is used in Team Zeta?",
      "Can you analyze Team Zeta's retrospective format?"
    ];
  }
  else if (lowerQuery.includes('top') && lowerQuery.includes('department')) {
    response = `Based on recent survey data, your top performing departments are:
1. HR (85 points)
2. Engineering (82 points)
3. Marketing (78 points)

The HR department shows particularly strong scores in inclusion and psychological safety.`;
    
    suggestedFollowups = [
      "What's driving HR's high scores?",
      "Which department needs the most improvement?",
      "What themes are common across all departments?"
    ];
  } 
  else if (lowerQuery.includes('theme') || lowerQuery.includes('feedback')) {
    response = `The key themes emerging from recent feedback are:

1. Work-life balance (72% positive sentiment)
2. Communication from leadership (64% positive)
3. Career development opportunities (45% positive - area for improvement)

Would you like a deeper analysis on any of these themes?`;
    
    suggestedFollowups = [
      "Tell me more about career development concerns",
      "What specific feedback is there about leadership?",
      "How does our work-life balance compare to benchmarks?"
    ];
  }
  else if (lowerQuery.includes('focus') || lowerQuery.includes('improve')) {
    response = `Based on AI analysis of your culture data, I recommend focusing improvement efforts on:

1. Career Development: Create clearer growth paths, especially for technical roles
2. Cross-Team Communication: Implement structured knowledge sharing between departments
3. Recognition Programs: Your recognition scores are 15% below industry benchmarks

Would you like specific action items for any of these areas?`;
    
    suggestedFollowups = [
      "Generate action plan for career development",
      "How can we improve recognition programs?",
      "Which department has the biggest communication challenges?"
    ];
  }
  // NEW COMPARATIVE ANALYSIS
  else if (lowerQuery.includes('compare team')) {
    // Handle different team comparisons
    if (lowerQuery.includes('sigma') && lowerQuery.includes('beta')) {
      response = `Comparative Analysis: Team Sigma vs Team Beta (April 13, 2025)

PulseScore: Team Beta (82/100) vs Team Sigma (78/100)

Strengths comparison:
✓ Team Beta excels in: Inclusion, Peer Trust, Feedback Culture
✓ Team Sigma excels in: Innovation, Cross-functional collaboration, Learning culture

Opportunity areas:
! Team Beta: Work-life balance (70%), Career clarity (72%)
! Team Sigma: Work-life balance (64%), Communication clarity (69%)

Key insight: While Team Beta qualifies for certification with higher overall scores, Team Sigma shows exceptional strengths in innovation metrics that could be leveraged across the organization. Both teams would benefit from addressing work-life balance concerns.`;
      
      suggestedFollowups = [
        "What can Team Beta learn from Team Sigma?",
        "What can Team Sigma learn from Team Beta?",
        "Show risk areas for both teams",
        "Which team has better retention metrics?"
      ];
    }
    else if (lowerQuery.includes('zeta') && (lowerQuery.includes('sigma') || lowerQuery.includes('beta') || lowerQuery.includes('gamma') || lowerQuery.includes('alpha'))) {
      response = `Comparative Analysis with Team Zeta (Gold Standard)

Team Zeta (94/100) outperforms all other teams across key metrics:

Leadership Trust:
- Zeta: 95% positive
- Beta: 87% positive
- Sigma: 76% positive
- Alpha: 74% positive
- Gamma: 58% positive

Psychological Safety:
- Zeta: 96% positive
- Beta: 88% positive
- Alpha: 77% positive
- Sigma: 75% positive
- Gamma: 62% positive

Work-life Balance:
- Zeta: 90% positive
- Alpha: 72% positive
- Beta: 70% positive
- Sigma: 64% positive
- Gamma: 56% positive

Key differentiators for Team Zeta:
1. Structured communication protocols
2. Proactive conflict resolution
3. Feedback-rich environment
4. Clear role definitions with autonomy
5. Intentional celebration of wins`;
      
      suggestedFollowups = [
        "Why is Team Zeta's leadership trust so high?",
        "How did Team Zeta establish psychological safety?",
        "What specific communication protocols does Team Zeta use?",
        "Can these practices be implemented in Team Gamma?"
      ];
    }
    else {
      response = `I can provide comparative analyses between any teams in our organization.

Available teams for comparison:
- Team Alpha
- Team Beta (Certification Eligible)
- Team Gamma (Risk Alert)
- Team Sigma (Approaching Certification)
- Team Zeta (Gold Certification)

For example, try asking:
- "Compare Team Sigma and Team Beta"
- "Compare Team Zeta with other teams"
- "What's the difference between Team Alpha and Team Gamma?"`;
      
      suggestedFollowups = [
        "Compare Team Sigma and Team Beta",
        "Compare Team Zeta with other teams",
        "What's the difference between Team Alpha and Team Gamma?"
      ];
    }
  }
  else if (lowerQuery.includes('work-life') || lowerQuery.includes('balance')) {
    response = `Your work-life balance metrics compared to industry benchmarks:

Overall Score: 65/100 (Industry avg: 60/100)
Key Insights:
- Flexible work policies are appreciated (mentioned in 78% of positive comments)
- Meeting culture needs improvement (42% of employees report too many meetings)
- After-hours communication expectations vary by department

Engineering and Sales teams report the lowest work-life balance scores.`;
    
    suggestedFollowups = [
      "What's causing low work-life balance in Engineering?",
      "Show me best practices for improving meeting culture",
      "How does our flexible work policy compare to competitors?"
    ];
  }
  else if (lowerQuery.includes('turnover') || lowerQuery.includes('retention')) {
    response = `Analysis of turnover risk in Customer Support:

Current Attrition Risk: Medium-High (67/100)
Primary Factors:
1. Limited career advancement opportunities (mentioned by 72% of the team)
2. Workload concerns (average of 58 tickets per person daily vs. industry benchmark of 45)
3. Compensation satisfaction is 12% below company average

Recommended focus: create clear career paths within customer success.`;
    
    suggestedFollowups = [
      "Generate a retention plan for Customer Support",
      "Which other departments have high turnover risk?",
      "What's the benchmark for Customer Support compensation?"
    ];
  }
  else {
    response = `I'm here to help you understand your workplace culture data and provide actionable insights. 

I can help with:
- Analyzing department performance
- Identifying emerging themes from feedback
- Recommending focus areas for improvement
- Comparing metrics to industry benchmarks
- Assessing turnover risk factors

For this demo, try these quick prompts:
- "Summarize Team Alpha"
- "Show risk for Team Gamma" 
- "Why is Team Beta eligible for certification?"
- "Summarize Team Sigma" (new!)
- "Summarize Team Zeta" (new!)
- "Compare Team Sigma and Team Beta" (new!)`;
    
    suggestedFollowups = [
      "Summarize Team Alpha",
      "Show risk for Team Gamma",
      "Why is Team Beta eligible for certification?",
      "Summarize Team Sigma",
      "Summarize Team Zeta",
      "Compare Team Sigma and Team Beta"
    ];
  }
  
  return {
    response,
    suggestedFollowups
  };
};
