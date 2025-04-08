
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import FormFieldWithValidation from "@/components/ui/form-field-with-validation";

// Enhanced validation schema with detailed error messages
const profileSchema = z.object({
  first_name: z.string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  last_name: z.string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  company: z.string()
    .min(1, "Company name is required")
    .max(100, "Company name must be less than 100 characters"),
  department: z.string()
    .max(100, "Department must be less than 100 characters")
    .optional(),
  role: z.string()
    .min(1, "Role is required")
    .max(100, "Role must be less than 100 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const departments = [
  { value: "HR", label: "Human Resources" },
  { value: "IT", label: "IT" },
  { value: "Finance", label: "Finance" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
  { value: "Operations", label: "Operations" },
  { value: "Executive", label: "Executive" },
  { value: "Other", label: "Other" }
];

const ProfileForm: React.FC = () => {
  const { profile, user, refreshProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      company: profile?.company || "",
      department: profile?.department || "",
      role: profile?.role || "",
    }
  });
  
  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...data,
          updated_at: new Date().toISOString(),
        });
      
      if (error) throw error;
      
      await refreshProfile();
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldWithValidation
                control={form.control}
                name="first_name"
                label="First Name"
                required
              />
              
              <FormFieldWithValidation
                control={form.control}
                name="last_name"
                label="Last Name"
                required
              />
            </div>
            
            <FormFieldWithValidation
              control={form.control}
              name="company"
              label="Company Name"
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldWithValidation
                control={form.control}
                name="role"
                label="Role"
                placeholder="Your position in the company"
                required
              />
              
              <FormFieldWithValidation
                control={form.control}
                name="department"
                label="Department"
                type="select"
                selectOptions={departments}
                placeholder="Select a department"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full md:w-auto bg-pulse-gradient"
              disabled={isSubmitting || !form.formState.isValid}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Profile"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
