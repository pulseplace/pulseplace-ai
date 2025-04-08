
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle, 
  ClipboardList, 
  Share2, 
  Award
} from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

interface CertificationJourneyProps {
  className?: string;
}

const CertificationJourney: React.FC<CertificationJourneyProps> = ({ className }) => {
  const { 
    currentStep, 
    progressPercentage, 
    isStepCompleted 
  } = useOnboarding();

  // Customize the journey based on the current step
  const getJourneyContent = () => {
    if (isStepCompleted('certification')) {
      return {
        title: "Certification Complete!",
        description: "Your organization is now Pulse Certified™",
        cta: {
          text: "View & Share Certification",
          link: "/dashboard/share-certification"
        },
        icon: <Award className="h-6 w-6 text-green-600" />
      };
    }
    
    if (currentStep === 'results-calculation') {
      return {
        title: "Results Processing",
        description: "We're analyzing your survey data and preparing your certification",
        cta: {
          text: "View Progress",
          link: "/dashboard/certification-engine"
        },
        icon: <ClipboardList className="h-6 w-6 text-pulse-600" />
      };
    }
    
    if (isStepCompleted('first-survey')) {
      return {
        title: "Survey Complete",
        description: "Continue to generate your certification",
        cta: {
          text: "Continue to Results",
          link: "/dashboard/certification-engine"
        },
        icon: <CheckCircle className="h-6 w-6 text-blue-600" />
      };
    }
    
    return {
      title: "Create Your First Survey",
      description: "Start your certification journey",
      cta: {
        text: "Create Survey",
        link: "/dashboard/surveys/new"
      },
      icon: <ClipboardList className="h-6 w-6 text-pulse-600" />
    };
  };
  
  const content = getJourneyContent();
  
  return (
    <Card className={`bg-gradient-to-r from-pulse-50 to-white border border-pulse-100 ${className}`}>
      <CardContent className="pt-6">
        <div className="flex items-start md:items-center gap-4">
          <div className="p-3 bg-white rounded-full shadow-sm flex-shrink-0">
            {content.icon}
          </div>
          
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg font-medium flex items-center gap-2">
                  {content.title}
                  {isStepCompleted('certification') && (
                    <Badge className="bg-green-100 text-green-800">Complete</Badge>
                  )}
                </h3>
                <p className="text-sm text-gray-500">{content.description}</p>
              </div>
              
              <Link to={content.cta.link}>
                <Button size="sm" className="bg-pulse-gradient">
                  {content.cta.text} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <Progress value={progressPercentage()} className="h-2" />
            
            {!isStepCompleted('certification') && (
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span className={isStepCompleted('first-survey') ? "text-green-600 font-medium" : ""}>
                  Survey
                </span>
                <span className={isStepCompleted('results-calculation') ? "text-green-600 font-medium" : ""}>
                  Analysis
                </span>
                <span className={isStepCompleted('certification') ? "text-green-600 font-medium" : ""}>
                  Certification
                </span>
              </div>
            )}
            
            {isStepCompleted('certification') && (
              <div className="flex mt-4">
                <Link to="/dashboard/share-certification" className="text-sm text-pulse-600 flex items-center">
                  <Share2 className="h-4 w-4 mr-1" /> Share your certification
                </Link>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificationJourney;
