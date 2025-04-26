
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 'team-communication',
    text: 'How effectively does your team communicate?',
  },
  {
    id: 'work-life-balance',
    text: 'How satisfied are you with your work-life balance?',
  },
  {
    id: 'leadership-support',
    text: 'How well does leadership support your professional growth?',
  },
  {
    id: 'team-collaboration',
    text: 'How would you rate team collaboration?',
  },
  {
    id: 'workplace-culture',
    text: 'How would you rate your overall workplace culture?',
  }
];

const options = [
  { value: '1', label: 'Poor' },
  { value: '2', label: 'Fair' },
  { value: '3', label: 'Good' },
  { value: '4', label: 'Very Good' },
  { value: '5', label: 'Excellent' }
];

const PulseSurveyForm = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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

    setSubmitted(true);
    toast({
      title: "Survey Submitted!",
      description: "Thank you for completing the PulseScore certification survey.",
    });

    // Redirect to thank you page after a brief delay
    setTimeout(() => {
      navigate('/pulse-score-lite/thank-you');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-semibold mb-4">Thank you for your feedback!</h3>
        <p className="text-gray-600">
          Processing your responses...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {questions.map((question) => (
        <div key={question.id} className="space-y-4">
          <Label className="text-lg font-medium">{question.text}</Label>
          <RadioGroup
            onValueChange={(value) => {
              setAnswers(prev => ({ ...prev, [question.id]: value }));
            }}
            value={answers[question.id]}
            className="flex flex-col space-y-1"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
      
      <Button 
        type="submit" 
        className="w-full bg-pulse-gradient"
        size="lg"
      >
        Submit Survey
      </Button>
    </form>
  );
};

export default PulseSurveyForm;
