
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
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Insertables } from '@/types/database.types';

const surveySchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().optional(),
  department: z.string().optional(),
});

const SurveyForm = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof surveySchema>>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      title: "",
      description: "",
      department: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof surveySchema>) => {
    if (!user || !profile) return;

    setIsLoading(true);
    try {
      const surveyData: Insertables<'pulse_surveys'> = {
        title: values.title,
        description: values.description || null,
        created_by: user.id,
        company: profile.company,
        department: values.department || null,
      };

      const { data, error } = await supabase
        .from('pulse_surveys')
        .insert([surveyData])
        .select();

      if (error) throw error;

      toast.success('Survey created successfully!');
      navigate('/dashboard/surveys');
    } catch (error: any) {
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
