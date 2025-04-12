
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Helper function to get feature points based on feature type
export const getRandomFeaturePoint = (featureType: string, index: number) => {
  const points: Record<string, string[]> = {
    'AI Analytics': [
      'Advanced sentiment analysis of employee feedback',
      'Trend detection across historical data',
      'Predictive insights for future workplace dynamics'
    ],
    'PulseBot AI': [
      'Natural language processing for conversational feedback',
      'Personalized responses based on employee history',
      'Continuous learning from organization-specific data'
    ],
    'Real-Time Dashboard': [
      'Live metrics updated as feedback is collected',
      'Interactive visualizations for deeper analysis',
      'Customizable views for different stakeholders'
    ],
    'Pulse Surveys': [
      'Smart question sequencing based on previous answers',
      'Adaptive survey length to maximize completion',
      'Multi-format response options for rich data collection'
    ],
    'Certification Engine': [
      'Data-driven certification based on verified metrics',
      'Transparent validation process with third-party oversight',
      'Customizable badge generation for marketing materials'
    ],
    'Custom Reports': [
      'AI-generated executive summaries of key findings',
      'Department-specific insights and recommendations',
      'Exportable visualizations for presentations'
    ],
    'LLM Powered Insights': [
      'Deep learning models trained on workplace culture data',
      'Cross-industry benchmarking with contextual analysis',
      'Actionable recommendations with implementation guidance'
    ],
    'Trust Scoring': [
      'Proprietary algorithm measuring multiple trust dimensions',
      'Transparent calculation methodology backed by research',
      'Comparative analysis against industry standards'
    ]
  };
  
  // Default points if the feature type isn't found
  const defaultPoints = [
    'Advanced AI-powered analytics and insights',
    'Seamless integration with existing systems',
    'Data-driven recommendations for improvement'
  ];
  
  return (points[featureType] || defaultPoints)[index] || defaultPoints[index];
};

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  isNew?: boolean;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  isNew = false 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
        {isNew && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-pulse-500 to-teal-500 text-white text-xs px-3 py-1 rounded-bl-lg">
            NEW
          </div>
        )}
        <CardHeader>
          <div className="mb-2 text-pulse-600">
            {icon}
          </div>
          <CardTitle className="flex items-center">
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i} className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-pulse-600 mr-2"></span>
                <span className="text-gray-600">{getRandomFeaturePoint(title, i)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
