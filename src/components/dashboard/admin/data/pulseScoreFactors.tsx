
import { ThumbsUp, Shield, Users, BarChart, Lightbulb, Medal, Heart, Briefcase } from 'lucide-react';
import React from 'react';

export interface ScoringFactor {
  id: string;
  name: string;
  description: string;
  weight: number;
  icon: React.ReactNode;
}

export const defaultFactors: ScoringFactor[] = [
  {
    id: 'engagement',
    name: 'Engagement',
    description: 'Overall employee engagement and commitment',
    weight: 15,
    icon: <ThumbsUp className="h-4 w-4" />
  },
  {
    id: 'trust',
    name: 'Trust',
    description: 'Trust in leadership and organization',
    weight: 15,
    icon: <Shield className="h-4 w-4" />
  },
  {
    id: 'dei',
    name: 'Diversity & Inclusion',
    description: 'Diversity, equity and inclusion measures',
    weight: 15,
    icon: <Users className="h-4 w-4" />
  },
  {
    id: 'growth',
    name: 'Growth & Development',
    description: 'Career development opportunities',
    weight: 10,
    icon: <BarChart className="h-4 w-4" />
  },
  {
    id: 'innovation',
    name: 'Innovation',
    description: 'Fostering creativity and innovation',
    weight: 10,
    icon: <Lightbulb className="h-4 w-4" />
  },
  {
    id: 'recognition',
    name: 'Recognition',
    description: 'Recognizing employee contributions',
    weight: 10,
    icon: <Medal className="h-4 w-4" />
  },
  {
    id: 'worklife',
    name: 'Work-Life Balance',
    description: 'Healthy work-life integration',
    weight: 15,
    icon: <Heart className="h-4 w-4" />
  },
  {
    id: 'purpose',
    name: 'Purpose & Mission',
    description: 'Alignment with company mission',
    weight: 10,
    icon: <Briefcase className="h-4 w-4" />
  }
];
