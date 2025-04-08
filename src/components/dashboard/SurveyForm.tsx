
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { createSurvey } from '@/services/surveyService';
import { AlertCircle, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import FormFieldWithValidation from "@/components/ui/form-field-with-validation";
import { Switch } from "@/components/ui/switch";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Enhanced validation schema with detailed error messages
const surveySchema = z.object({
  title: z.string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be less than 100 characters" }),
  description: z.string()
    .max(500, { message: "Description must be less than 500 characters" })
    .optional(),
  department: z.string()
    .max(100, { message: "Department must be less than 100 characters" })
    .optional(),
  is_anonymous: z.boolean().default(true)
});

const SurveyForm = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof surveySchema>>({
    resolver: zodResolver(surveySchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      title: "",
      description: "",
      department: profile?.department || "",
      is_anonymous: true
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
        is_anonymous: values.is_anonymous
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
            <FormFieldWithValidation
              control={form.control}
              name="title"
              label="Survey Title"
              placeholder="Quarterly Pulse Check"
              required
            />
            
            <FormFieldWithValidation
              control={form.control}
              name="description"
              label="Description"
              description="Provide context for your survey participants"
              placeholder="Help us understand how you're feeling about the current quarter..."
              type="textarea"
            />
            
            <FormFieldWithValidation
              control={form.control}
              name="department"
              label="Department"
              description="Leave blank for company-wide surveys"
              placeholder="Engineering"
            />
            
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="is_anonymous"
                  render={({ field }) => (
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="anonymous-mode"
                        />
                        <label 
                          htmlFor="anonymous-mode" 
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          Enable Anonymous Feedback?
                        </label>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>When enabled, employee responses will not be linked to their identity. This promotes open and honest feedback.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {field.value 
                          ? "Responses will be anonymous. No identifying information will be stored." 
                          : "Responses will be linked to employee identities."}
                      </p>
                    </div>
                  )}
                />
              </div>
            </div>
            
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
                disabled={isLoading || !form.formState.isValid}
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
