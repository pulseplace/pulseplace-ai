
import { supabase } from '@/integrations/supabase/client';
import { InsightResponse } from '@/services/insightsService';
import { toast } from 'sonner';

/**
 * Generate insights using the Supabase Edge Function
 * 
 * This function calls the Supabase Edge Function to generate insights
 * using the OpenAI API integration
 */
export const generateInsightWithLLM = async (
  prompt: string,
  systemPrompt: string,
  teamName: string
): Promise<InsightResponse | null> => {
  try {
    console.log(`Generating AI insight for ${teamName}`);
    
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('generate-insights', {
      body: {
        prompt,
        systemPrompt,
        teamName
      }
    });
    
    if (error) {
      console.error('Error generating insight:', error);
      toast.error('Failed to generate AI insight. Please try again later.');
      return null;
    }
    
    console.log('Generated insight:', data);
    return data as InsightResponse;
  } catch (error) {
    console.error('Unexpected error in insight generator:', error);
    toast.error('An unexpected error occurred while generating insights.');
    return null;
  }
};

/**
 * Generate a sample insight for demo purposes
 * 
 * This function returns sample insights without calling the API
 */
export const generateSampleInsight = (teamName: string, insightType: 'culture' | 'certification' | 'risk'): InsightResponse => {
  // Return different sample insights based on type
  if (insightType === 'culture') {
    return {
      summary: `Culture Insights for ${teamName} (April 2025)\nYour team shows high alignment and positive sentiment around leadership. 78% of employees reported clarity in roles, and many referenced transparent communication.\n\nSome concerns about workload balance remain. Feedback suggests a need for better pacing and priority management.\n\nOverall, the team has a strong foundation and is positioned well for growth.`,
      strengths: [
        "Strong leadership trust (84% positive)",
        "Clear communication channels",
        "Team collaboration"
      ],
      opportunities: [
        "Workload management",
        "Career development clarity",
        "Cross-team coordination"
      ],
      actionItems: [
        "Schedule weekly workload check-ins",
        "Develop clearer career paths",
        "Implement cross-team project sharing"
      ],
      certificateText: `${teamName} demonstrates a positive culture foundation with particularly strong leadership trust and team alignment. With continued focus on work-life balance, the team is on track for certification.`
    };
  } else if (insightType === 'certification') {
    return {
      summary: `${teamName} has achieved a PulseScore of 82/100, placing it in the top tier of organizational culture metrics. The team demonstrates exceptional psychological safety, transparent feedback mechanisms, and strong alignment with company values.`,
      strengths: [
        "Psychological safety (91%)",
        "Transparent feedback culture (88%)",
        "Value alignment (85%)"
      ],
      opportunities: [
        "Work-life balance (72%)",
        "Career path clarity (68%)",
        "Recognition systems (74%)"
      ],
      actionItems: [
        "Review meeting schedules to improve work-life balance",
        "Develop career progression frameworks",
        "Implement peer recognition program"
      ],
      certificateText: `${teamName} is certified at Pulse Certified™ status for demonstrating excellence in psychological safety and feedback culture, with strong team cohesion and value alignment.`
    };
  } else {
    return {
      summary: `Risk Alert for ${teamName}: Our AI has detected a 28% drop in engagement over the past month, with sentiment scores declining from 70% to 48% positive. Manager feedback has also decreased significantly.`,
      strengths: [
        "Team still maintains strong peer relationships",
        "Technical excellence remains high",
        "No impact on customer satisfaction metrics yet"
      ],
      opportunities: [
        "Manager-team relationship (critical)",
        "Workload distribution",
        "Recognition and feedback"
      ],
      actionItems: [
        "Conduct 1:1 check-ins with all team members",
        "Review sprint allocation and resource distribution",
        "Consider leadership coaching for the team manager"
      ],
      certificateText: `${teamName} requires immediate attention to address rising burnout risk and manager disconnection. Intervention is recommended to restore engagement levels.`
    };
  }
};
