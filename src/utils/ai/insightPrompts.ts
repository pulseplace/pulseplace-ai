
/**
 * This file contains system and user prompts for generating AI-powered culture insights
 * for use with LLM models via Supabase Edge Functions or similar integrations.
 */

export const insightPrompts = {
  /**
   * Culture Insight Summary (per team or org level)
   */
  cultureSummary: {
    systemPrompt: `You are an AI assistant that generates workplace culture summaries. Your role is to synthesize employee sentiment, feedback patterns, and participation data into a 3-paragraph summary. Use clear, human tone with managerial relevance. Focus on strengths, risks, and opportunities for improvement.`,
    
    userPromptTemplate: `Based on the last 30 days of survey data for {teamName}:
- Sentiment ratio: {positivePercent}% positive, {neutralPercent}% neutral, {negativePercent}% negative
- Common keywords: "{keyword1}", "{keyword2}", "{keyword3}"
- Participation: {participationRate}% of employees
- Notable quotes: "{quote1}", "{quote2}"

Generate a manager-ready summary with top themes, insights, and action cues.`
  },

  /**
   * PulseScore™ Rationale Generator
   */
  pulseScoreRationale: {
    systemPrompt: `You are an AI auditor for workplace culture. Based on a PulseScore™ (0–100) and sub-metrics, generate a rationale explaining why a company has achieved a particular score and whether it is eligible for Culture Certified™ status.`,
    
    userPromptTemplate: `PulseScore: {score}
Benchmarks exceeded: {exceededBenchmarks}
Benchmarks lagging: {laggingBenchmarks}
Survey participation: {participationRate}%
Flagged risks: {flaggedRisks}

Summarize this in a certification rationale paragraph.`
  },

  /**
   * Predictive Risk Summary Prompt
   */
  predictiveRisk: {
    systemPrompt: `You are a predictive AI agent that identifies workplace culture risks from participation, sentiment, and historic feedback. Generate a risk alert summary with team name, risk factor, and suggested follow-up.`,
    
    userPromptTemplate: `Team: {teamName}
Sentiment decline: {sentimentDecline}% over 14 days
Manager feedback score: {managerScore}/5
Notable feedback: "{notableFeedback}"
Engagement drop: {engagementDrop}% below last month

Flag 1–2 potential cultural risks and actions for leadership.`
  }
};

/**
 * Sample insight outputs for preloading demos
 */
export const sampleInsights = [
  {
    team: "Team Alpha",
    insight_type: "Culture Summary" as "Culture Summary",
    ai_generated: true,
    content: "Culture Insights – Team Alpha (April 2025)\nYour team continues to show high alignment and positive sentiment around leadership and collaboration. 74% of employees reported a greater sense of clarity in roles, and many referenced \"transparent decision-making\" in their responses.\n\nHowever, some concern persists around workload balance and recognition. Feedback like \"deadlines are always tight\" suggests a need for better pacing or clearer prioritization.\n\nWe recommend a short check-in session to revisit scope alignment. Overall, this team is well positioned to improve from a good to great culture baseline."
  },
  {
    team: "Team Beta",
    insight_type: "PulseScore Certification" as "PulseScore Certification",
    ai_generated: true,
    pulse_score: 82,
    certification_eligible: true,
    summary: "Strengths: Inclusion (88%), Peer Trust (91%), Feedback Culture (85%)\nImprovement Areas: Workload Balance, Career Clarity\nParticipation Rate: 93%\nCertify: YES\nAI Rationale: Your team exceeds 3 of 5 certification benchmarks and shows strong consistency in psychological safety and peer recognition. Certification is recommended."
  },
  {
    team: "Team Gamma",
    insight_type: "Risk Alert" as "Risk Alert",
    ai_generated: true,
    risk_type: "Burnout & Manager Disconnect",
    engagement_drop_percent: 28,
    sentiment_drop: "70% to 48%",
    recommendation: "Initiate a 1:1 check-in campaign, and review current sprint allocation. Consider leadership coaching for the team lead to rebuild trust."
  }
];

/**
 * Generate a culture summary prompt with actual data
 */
export const generateCultureSummaryPrompt = (data: {
  teamName: string;
  positivePercent: number;
  neutralPercent: number;
  negativePercent: number;
  keywords: string[];
  participationRate: number;
  quotes: string[];
}): string => {
  return insightPrompts.cultureSummary.userPromptTemplate
    .replace('{teamName}', data.teamName)
    .replace('{positivePercent}', data.positivePercent.toString())
    .replace('{neutralPercent}', data.neutralPercent.toString())
    .replace('{negativePercent}', data.negativePercent.toString())
    .replace('{keyword1}', data.keywords[0] || '')
    .replace('{keyword2}', data.keywords[1] || '')
    .replace('{keyword3}', data.keywords[2] || '')
    .replace('{participationRate}', data.participationRate.toString())
    .replace('{quote1}', data.quotes[0] || '')
    .replace('{quote2}', data.quotes[1] || '');
};

/**
 * Generate a PulseScore rationale prompt with actual data
 */
export const generatePulseScoreRationalePrompt = (data: {
  score: number;
  exceededBenchmarks: string;
  laggingBenchmarks: string;
  participationRate: number;
  flaggedRisks: string;
}): string => {
  return insightPrompts.pulseScoreRationale.userPromptTemplate
    .replace('{score}', data.score.toString())
    .replace('{exceededBenchmarks}', data.exceededBenchmarks)
    .replace('{laggingBenchmarks}', data.laggingBenchmarks)
    .replace('{participationRate}', data.participationRate.toString())
    .replace('{flaggedRisks}', data.flaggedRisks);
};

/**
 * Generate a predictive risk prompt with actual data
 */
export const generatePredictiveRiskPrompt = (data: {
  teamName: string;
  sentimentDecline: number;
  managerScore: number;
  notableFeedback: string;
  engagementDrop: number;
}): string => {
  return insightPrompts.predictiveRisk.userPromptTemplate
    .replace('{teamName}', data.teamName)
    .replace('{sentimentDecline}', data.sentimentDecline.toString())
    .replace('{managerScore}', data.managerScore.toString())
    .replace('{notableFeedback}', data.notableFeedback)
    .replace('{engagementDrop}', data.engagementDrop.toString());
};
