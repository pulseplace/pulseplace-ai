
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormFieldWithValidation from '@/components/ui/form-field-with-validation';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import MetaTags from '@/components/MetaTags';
import { Loader2 } from 'lucide-react';

const requestSchema = z.object({
  company_name: z.string().min(2, 'Company name is required'),
  reason: z.string().min(10, 'Please provide a brief reason for your request')
});

type RequestFormValues = z.infer<typeof requestSchema>;

const PitchDeckRequest: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [existingRequest, setExistingRequest] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      company_name: profile?.company || '',
      reason: ''
    }
  });

  React.useEffect(() => {
    if (user) {
      checkExistingRequest();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  React.useEffect(() => {
    if (profile) {
      form.setValue('company_name', profile.company || '');
    }
  }, [profile, form]);

  const checkExistingRequest = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('pitch_deck_requests')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking for existing request:', error);
      }

      if (data) {
        setExistingRequest(data);
      }
    } catch (error) {
      console.error('Error checking for existing request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: RequestFormValues) => {
    if (!user) {
      toast.error('You must be signed in to request access');
      navigate('/auth');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('pitch_deck_requests')
        .insert({
          user_id: user.id,
          company_name: data.company_name,
          reason: data.reason
        });

      if (error) throw error;

      toast.success('Your request has been submitted successfully');
      await checkExistingRequest();
    } catch (error: any) {
      console.error('Error submitting request:', error);
      toast.error(error.message || 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-pulse-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <MetaTags
        title="Request Pitch Deck Access | PulsePlace.ai"
        description="Request access to the full PulsePlace.ai investor pitch deck."
      />

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Request Pitch Deck Access</CardTitle>
            <CardDescription>
              Complete this form to request access to our full investor pitch deck
            </CardDescription>
          </CardHeader>
          <CardContent>
            {existingRequest ? (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                  <h3 className="font-medium text-blue-800">Request Submitted</h3>
                  <p className="text-blue-700 mt-1">
                    Your request has been submitted and is {existingRequest.status}.
                  </p>
                  {existingRequest.status === 'approved' ? (
                    <div className="mt-4">
                      <p className="text-green-700 mb-2">
                        Your request has been approved! You can now access the full pitch deck.
                      </p>
                      <Button
                        onClick={() => navigate('/pitch-deck-view')}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        View Pitch Deck
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm mt-2">
                      We're currently reviewing your request and will notify you once it's approved.
                    </p>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  <p>Request details:</p>
                  <ul className="mt-2 space-y-1">
                    <li><span className="font-medium">Company:</span> {existingRequest.company_name}</li>
                    <li><span className="font-medium">Reason:</span> {existingRequest.reason}</li>
                    <li>
                      <span className="font-medium">Submitted on:</span>{' '}
                      {new Date(existingRequest.created_at).toLocaleDateString()}
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormFieldWithValidation
                    control={form.control}
                    name="company_name"
                    label="Company Name"
                    placeholder="Your company name"
                    required
                  />

                  <FormFieldWithValidation
                    control={form.control}
                    name="reason"
                    label="Reason for Request"
                    placeholder="Briefly describe why you're interested in our pitch deck"
                    type="textarea"
                    required
                  />

                  <Button
                    type="submit"
                    className="w-full bg-pulse-gradient"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PitchDeckRequest;
