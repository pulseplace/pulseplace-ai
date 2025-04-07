
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const industries = [
  "Technology",
  "Healthcare",
  "Financial Services",
  "Education",
  "Manufacturing",
  "Retail",
  "Government",
  "Non-profit",
  "Hospitality",
  "Media & Entertainment",
  "Other"
];

interface OnboardingFormProps {
  onFormSubmit: (data: OnboardingFormData) => void;
}

export interface OnboardingFormData {
  email: string;
  companyName: string;
  role: string;
  industry: string;
}

const OnboardingForm = ({ onFormSubmit }: OnboardingFormProps) => {
  const { toast } = useToast();
  const form = useForm<OnboardingFormData>({
    defaultValues: {
      email: "",
      companyName: "",
      role: "",
      industry: ""
    }
  });

  const handleSubmit = (data: OnboardingFormData) => {
    toast({
      title: "Form Submitted",
      description: "Starting your PulseScore survey..."
    });
    onFormSubmit(data);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Get Started with PulsePlace.ai</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your work email (we'll never spam you)</FormLabel>
                  <FormControl>
                    <Input placeholder="jane@company.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization name you want scored</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Corporation" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>e.g., HR Head, People Ops, Founder</FormLabel>
                  <FormControl>
                    <Input placeholder="Chief People Officer" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Optional, helps with benchmarking</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-pulse-gradient">
              Get Your PulseScore <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OnboardingForm;
