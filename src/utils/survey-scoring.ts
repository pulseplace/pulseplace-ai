
/**
 * Calculate a PulseScore from survey responses
 * This is a simplified mock implementation
 */
export const calculatePulseScore = (
  surveyId: string,
  responses: any[] = []
): number => {
  // This is a mock implementation for now
  // In a real system, this would calculate based on actual responses
  
  const baseScore = 75;
  
  // Add some randomness for demo purposes
  const randomVariance = Math.floor(Math.random() * 20) - 10;
  
  // Add a slight boost based on number of responses
  const responseBonus = Math.min(5, responses.length / 2);
  
  // Calculate final score
  const finalScore = Math.round(baseScore + randomVariance + responseBonus);
  
  // Ensure score is within bounds
  return Math.min(100, Math.max(0, finalScore));
};

/**
 * Maps question types to numerical weights
 */
export const getQuestionTypeWeight = (type: string): number => {
  switch (type) {
    case 'likert':
      return 1.0;
    case 'emoji':
      return 0.8;
    case 'text':
      return 1.2;
    case 'binary':
      return 0.7;
    case 'scale':
      return 1.0;
    default:
      return 1.0;
  }
};

/**
 * Normalize a response value to a 0-100 scale
 */
export const normalizeResponseValue = (value: any, type: string): number => {
  if (typeof value === 'number') {
    // For numerical values, scale to 0-100
    return (value / 5) * 100;
  }
  
  if (type === 'binary') {
    // For binary values (yes/no, true/false)
    return value === true || value === 'yes' || value === 'true' ? 100 : 0;
  }
  
  if (type === 'emoji') {
    // For emoji ratings, convert to numerical
    const emojiMap: Record<string, number> = {
      '😡': 0,
      '🙁': 25,
      '😐': 50,
      '🙂': 75,
      '😀': 100
    };
    return emojiMap[value] || 50;
  }
  
  // Default for text or unknown types
  return 50;
};
