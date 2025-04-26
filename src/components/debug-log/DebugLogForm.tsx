
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDebugLogs } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const debugLogSchema = z.object({
  description: z.string().min(5, { message: "Description is required" }),
  component: z.string().min(1, { message: "Component is required" }),
  severity: z.string().min(1, { message: "Severity is required" }),
  notes: z.string().optional(),
  assignedTo: z.string().optional(),
  loggedBy: z.string().min(1, { message: "Logged by is required" }),
});

type DebugLogFormValues = z.infer<typeof debugLogSchema>;

const DebugLogForm = () => {
  const { addDebugLog } = useDebugLogs();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const form = useForm<DebugLogFormValues>({
    resolver: zodResolver(debugLogSchema),
    defaultValues: {
      description: "",
      component: "",
      severity: "medium",
      notes: "",
      assignedTo: "",
      loggedBy: "",
    },
  });
  
  const onSubmit = (data: DebugLogFormValues) => {
    addDebugLog({
      description: data.description,
      component: data.component,
      severity: data.severity as any,
      notes: data.notes,
      assignedTo: data.assignedTo || undefined,
      loggedBy: data.loggedBy,
      status: 'Open'
    });
    
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pulse-gradient hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          Log New Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log a new issue</DialogTitle>
          <DialogDescription>
            Describe the issue you've encountered to help track and resolve it.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief description of the issue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="component"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Component</FormLabel>
                    <FormControl>
                      <Input placeholder="Affected component" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Severity</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Additional details about the issue"
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="loggedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logged By</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign To (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Who should fix this?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end pt-2">
              <Button type="submit">Log Issue</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DebugLogForm;
