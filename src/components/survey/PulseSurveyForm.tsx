
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { SurveyResponse } from '@/types/scoring.types';

// Survey questions focused on trust, engagement, and wellbeing
const questions = [
  {
    id: 'trust_leadership',
    text: 'I trust the leadership team at my organization.',
    theme: 'trust_in_leadership',
    weight: 1.2
  },
  {
    id: 'psych_safety',
    text: 'I feel safe sharing my opinions without fear of negative consequences.',
    theme: 'psychological_safety',
    weight: 1.0
  },
  {
    id: 'inclusion',
    text: 'I feel a sense of belonging at my workplace.',
    theme: 'inclusion_belonging',
    weight: 1.0
  },
  {
    id: 'engagement',
    text: 'I find my work meaningful and engaging.',
    theme: 'motivation_fulfillment',
    weight: 1.1
  },
  {
    id: 'mission',
    text: 'I understand and believe in our company\'s mission.',
    theme: 'mission_alignment',
    weight: 0.9
  },
  {
    id: 'retention',
    text: 'I see myself working here a year from now.',
    theme: 'engagement_continuity',
    weight: 1.3
  },
];

const options = [
  { value: '1', label: 'Strongly Disagree' },
  { value: '2', label: 'Disagree' },
  { value: '3', label: 'Neutral' },
  { value: '4', label: 'Agree' },
  { value: '5', label: 'Strongly Agree' }
];

interface PulseSurveyFormProps {
  onSubmit: (response: SurveyResponse) => void;
}

const PulseSurveyForm: React.FC<PulseSurveyFormProps> = ({ onSubmit }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [marketingOptIn, setMarketingOptIn] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.keys(answers).length < questions.length) {
      toast({
        title: "Please complete all questions",
        description: "All questions require a response to generate your PulseScore.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Format responses for database
      const formattedResponses: Record<string, number> = {};
      Object.entries(answers).forEach(([questionId, value]) => {
        formattedResponses[questionId] = parseInt(value, 10);
      });
      
      // Save response to Supabase
      const { data, error } = await supabase
        .from('pulse_survey_responses')
        .insert({
          responses: formattedResponses,
          email: email || null,
          marketing_opt_in: marketingOptIn,
          score: 0 // Will be calculated and updated
        })
        .select();
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Prepare the response for scoring calculation
      const surveyResponse: SurveyResponse = {
        responses: formattedResponses,
        questionMapping: questions.reduce((map, q) => {
          map[q.id] = {
            theme: q.theme,
            weight: q.weight
          };
          return map;
        }, {} as Record<string, { theme: string; weight: number }>)
      };
      
      // Call the onSubmit handler with the response
      onSubmit(surveyResponse);
      
    } catch (error) {
      console.error('Error submitting survey:', error);
      toast({
        title: "Submission error",
        description: "There was a problem submitting your survey. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">About You (Optional)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              placeholder="Your organization"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-lg font-medium mb-6">Rate your agreement with each statement</h2>
        
        {questions.map((question) => (
          <div key={question.id} className="space-y-4 mb-8">
            <Label className="text-base">{question.text}</Label>
            <RadioGroup
              onValueChange={(value) => {
                setAnswers(prev => ({ ...prev, [question.id]: value }));
              }}
              value={answers[question.id]}
              className="flex justify-between"
            >
              {options.map((option) => (
                <div key={option.value} className="flex flex-col items-center space-y-1">
                  <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                  <Label 
                    htmlFor={`${question.id}-${option.value}`}
                    className="text-xs text-gray-500"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="marketing-optin" 
          checked={marketingOptIn}
          onCheckedChange={(checked) => setMarketingOptIn(!!checked)} 
        />
        <Label htmlFor="marketing-optin" className="text-sm text-gray-600">
          I'd like to receive insights about workplace culture and certification.
        </Label>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-pulse-gradient"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Calculating Your PulseScore...' : 'Submit Survey'}
      </Button>
    </form>
  );
};

export default PulseSurveyForm;
