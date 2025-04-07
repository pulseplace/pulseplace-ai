
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { createSurvey } from '@/services/surveyService';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const surveySchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().optional(),
  department: z.string().optional(),
});

const SurveyForm = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof surveySchema>>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      title: "",
      description: "",
      department: profile?.department || "",
    },
  });

  React.useEffect(() => {
    if (profile) {
      // Prefill department from user profile if available
      form.setValue('department', profile.department || '');
    }
  }, [profile, form]);

  const onSubmit = async (values: z.infer<typeof surveySchema>) => {
    if (!user) {
      setError("You must be logged in to create a survey");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await createSurvey({
        title: values.title,
        description: values.description,
        department: values.department,
      });

      toast.success('Survey created successfully!');
      navigate('/dashboard/surveys');
    } catch (error: any) {
      console.error('Error creating survey:', error);
      setError(error.message || 'Failed to create survey');
      toast.error(error.message || 'Failed to create survey');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Survey</CardTitle>
        <CardDescription>
          Design a new pulse survey to gather feedback from your team
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Survey Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Quarterly Pulse Check" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Help us understand how you're feeling about the current quarter..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Engineering" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard/surveys')}
                type="button"
              >
                Cancel
              </Button>
              <Button 
                className="bg-pulse-gradient" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Survey"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SurveyForm;
