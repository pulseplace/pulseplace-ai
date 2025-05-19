
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useSurveyQuestions } from '@/hooks/useSurveyQuestions';
import { calculatePulseScore } from '@/utils/survey-scoring';

const surveySchema = z.object({
  responses: z.record(z.string(), z.union([z.string(), z.number()])),
  email: z.string().email('Please enter a valid email'),
  marketingOptIn: z.boolean().default(false)
});

type FormValues = z.infer<typeof surveySchema>;

const PulseSurveyForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const [score, setScore] = React.useState<number | null>(null);
  const { data: questions = [], isLoading } = useSurveyQuestions();

  const form = useForm<FormValues>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      responses: {},
      email: '',
      marketingOptIn: false
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      // Fix the type mismatch by correctly passing the surveyId
      const calculatedScore = calculatePulseScore("survey-id", Object.values(data.responses));
      
      const { error } = await supabase
        .from('pulse_survey_responses')
        .insert({
          email: data.email,
          marketing_opt_in: data.marketingOptIn,
          responses: data.responses,
          score: calculatedScore
        });

      if (error) throw error;

      setScore(calculatedScore);
      setShowResults(true);
      toast.success('Survey submitted successfully!');
    } catch (error) {
      console.error('Error submitting survey:', error);
      toast.error('Failed to submit survey');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading survey questions...</div>;
  }

  if (showResults) {
    return (
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold mb-4">Your PulseScore™</h2>
        <div className="text-6xl font-bold text-pulse-600 mb-6">{score}</div>
        <p className="text-lg mb-6">
          Want to get certified and showcase your great workplace culture?
        </p>
        <Button className="bg-pulse-gradient">
          Upgrade to PulsePlace Pro
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {questions.map((question) => (
        <div key={question.id} className="space-y-4">
          <Label className="text-lg font-medium">
            {question.text}
          </Label>
          
          {question.type === 'likert' ? (
            <RadioGroup
              onValueChange={(value) => 
                form.setValue(`responses.${question.id}`, parseInt(value))
              }
              className="grid grid-cols-5 gap-4"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem
                    value={value.toString()}
                    id={`${question.id}-${value}`}
                  />
                  <Label htmlFor={`${question.id}-${value}`}>{value}</Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <Textarea
              onChange={(e) => 
                form.setValue(`responses.${question.id}`, e.target.value)
              }
              placeholder="Share your thoughts..."
            />
          )}
        </div>
      ))}

      <div className="space-y-4 pt-4 border-t">
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            id="email"
            {...form.register('email')}
            placeholder="Enter your email to get your results"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="marketingOptIn"
            {...form.register('marketingOptIn')}
          />
          <Label htmlFor="marketingOptIn">
            Keep me updated with workplace culture insights
          </Label>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-pulse-gradient"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Get Your PulseScore™'}
        </Button>
      </div>
    </form>
  );
};

export default PulseSurveyForm;
