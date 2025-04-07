
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, CheckCircle, Clock } from 'lucide-react';

type OnboardingStateType = 'welcome' | 'emptyDashboard' | 'surveyThanks' | 'scoreLive';

interface OnboardingStateProps {
  stateType: OnboardingStateType;
  onButtonClick?: () => void;
}

const OnboardingState = ({ stateType, onButtonClick }: OnboardingStateProps) => {
  // Content mapping based on onboarding state
  const content = {
    welcome: {
      title: "Welcome to PulsePlace.ai",
      description: "You're now inside the world's first AI-powered workplace certification platform. Your journey to becoming a Pulse Certified™ organization starts here. Let's get your first PulseScore. It takes 90 seconds or less.",
      buttonText: "Get Your PulseScore",
      icon: <BarChart className="h-12 w-12 text-pulse-600" />
    },
    emptyDashboard: {
      title: "Your PulseScore dashboard is waiting.",
      description: "Complete a short survey to unlock your trust signal, cultural health insights, and your first step toward certification.",
      buttonText: "Take the Pulse Survey",
      icon: <BarChart className="h-12 w-12 text-pulse-600" />
    },
    surveyThanks: {
      title: "Thanks for sharing your perspective.",
      description: "We're calibrating your organization's PulseScore using sentiment signals and our AI engine. Your score will appear shortly — and with it, a powerful new lens on workplace trust.",
      buttonText: null,
      icon: <Clock className="h-12 w-12 text-pulse-600" />
    },
    scoreLive: {
      title: "Your PulseScore is live.",
      description: "See how your workplace stacks up in culture trust, engagement stability, and emotional sentiment. Want to benchmark against others? Join the beta leaderboard.",
      buttonText: "View Benchmarks",
      icon: <CheckCircle className="h-12 w-12 text-pulse-600" />
    }
  };

  const currentContent = content[stateType];

  return (
    <Card className="shadow-md border-2 border-gray-100">
      <CardContent className="p-8 text-center">
        <div className="flex flex-col items-center">
          <div className="bg-pulse-100 p-4 rounded-full mb-6">
            {currentContent.icon}
          </div>
          
          <h2 className="text-2xl font-bold mb-4">{currentContent.title}</h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            {currentContent.description}
          </p>
          
          {currentContent.buttonText && (
            <Button 
              className="bg-pulse-gradient"
              size="lg"
              onClick={onButtonClick}
            >
              {currentContent.buttonText} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingState;
