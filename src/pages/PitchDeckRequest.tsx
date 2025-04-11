
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormFieldWithValidation from '@/components/ui/form-field-with-validation';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import MetaTags from '@/components/MetaTags';

// Schema for the pitch deck request form
const pitchDeckRequestSchema = z.object({
  company_name: z.string().min(2, 'Company name is required'),
  industry: z.string().min(1, 'Please select an industry'),
  role: z.string().min(1, 'Please select your role'),
  reason: z.string().min(10, 'Please provide a reason for your request (min 10 characters)').max(500, 'Reason should be less than 500 characters'),
});

type PitchDeckRequestFormValues = z.infer<typeof pitchDeckRequestSchema>;

const PitchDeckRequest: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<PitchDeckRequestFormValues>({
    resolver: zodResolver(pitchDeckRequestSchema),
    defaultValues: {
      company_name: profile?.company || '',
      industry: '',
      role: profile?.role || '',
      reason: '',
    },
  });

  React.useEffect(() => {
    // If user profile updates, update default values
    if (profile) {
      form.setValue('company_name', profile.company || '');
      form.setValue('role', profile.role || '');
    }
  }, [profile, form]);

  React.useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/auth', { state: { from: '/pitch-deck-request' } });
    }
  }, [user, navigate]);

  const onSubmit = async (data: PitchDeckRequestFormValues) => {
    if (!user) {
      toast.error('You must be logged in to submit a request');
      return;
    }

    try {
      // Check if user already has a pending or approved request
      const { data: existingRequest, error: checkError } = await supabase
        .from('pitch_deck_requests')
        .select('id, status')
        .eq('user_id', user.id)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingRequest) {
        if (existingRequest.status === 'approved') {
          toast.info('You already have access to the pitch deck');
          navigate('/pitch-deck-view');
          return;
        } else if (existingRequest.status === 'pending') {
          toast.info('Your request is already pending review');
          return;
        } else if (existingRequest.status === 'rejected') {
          toast.info('Your previous request was rejected. You can submit a new request.');
          // Continue with submission for rejected requests
        }
      }

      // Submit the request
      const { error: insertError } = await supabase
        .from('pitch_deck_requests')
        .insert([
          {
            user_id: user.id,
            company_name: data.company_name,
            industry: data.industry,
            role: data.role,
            reason: data.reason,
            status: 'pending'
          }
        ]);

      if (insertError) throw insertError;

      toast.success('Your request has been submitted successfully!');
      navigate('/investor-deck', { replace: true });
    } catch (error: any) {
      console.error('Error submitting pitch deck request:', error);
      toast.error(error.message || 'Failed to submit request');
    }
  };

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'legal', label: 'Legal' },
    { value: 'nonprofit', label: 'Non-profit' },
    { value: 'venture_capital', label: 'Venture Capital' },
    { value: 'other', label: 'Other' },
  ];

  const roleOptions = [
    { value: 'investor', label: 'Investor' },
    { value: 'venture_capitalist', label: 'Venture Capitalist' },
    { value: 'angel_investor', label: 'Angel Investor' },
    { value: 'executive', label: 'Executive (C-level, VP)' },
    { value: 'director', label: 'Director / Manager' },
    { value: 'advisor', label: 'Advisor' },
    { value: 'partner', label: 'Partner' },
    { value: 'analyst', label: 'Analyst' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <MetaTags
        title="Request Pitch Deck Access | PulsePlace.ai"
        description="Request access to the PulsePlace.ai investor pitch deck."
      />
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Request Pitch Deck Access</h1>
        <p className="text-gray-600 mb-6">
          Please complete this form to request access to our investor pitch deck
        </p>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-pulse-600" />
              Access Request Form
            </CardTitle>
            <CardDescription>
              Tell us a bit about yourself and why you're interested in PulsePlace.ai
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormFieldWithValidation
                  control={form.control}
                  name="company_name"
                  label="Company Name"
                  placeholder="Enter your company name"
                  required
                />
                
                <FormFieldWithValidation
                  control={form.control}
                  name="industry"
                  label="Industry"
                  type="select"
                  selectOptions={industryOptions}
                  placeholder="Select your industry"
                  required
                />
                
                <FormFieldWithValidation
                  control={form.control}
                  name="role"
                  label="Your Role"
                  type="select"
                  selectOptions={roleOptions}
                  placeholder="Select your role"
                  required
                />
                
                <FormFieldWithValidation
                  control={form.control}
                  name="reason"
                  label="Reason for Request"
                  type="textarea"
                  placeholder="Please briefly explain why you're interested in viewing our pitch deck"
                  required
                />

                <div className="mt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-pulse-gradient"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PitchDeckRequest;
