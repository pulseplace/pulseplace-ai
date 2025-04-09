
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Upload } from 'lucide-react';

interface ImportTasksDialogProps {
  onImportComplete: () => void;
}

const ImportTasksDialog: React.FC<ImportTasksDialogProps> = ({ onImportComplete }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async () => {
    if (!jsonText.trim()) {
      toast({
        title: "Error",
        description: "Please paste JSON data to import",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    try {
      // Parse JSON
      let tasksToImport;
      try {
        tasksToImport = JSON.parse(jsonText);
      } catch (error) {
        throw new Error("Invalid JSON format. Please check your data.");
      }

      // Validate it's an array
      if (!Array.isArray(tasksToImport)) {
        throw new Error("JSON data must be an array of tasks.");
      }

      // Format tasks for insert
      const formattedTasks = tasksToImport.map(task => ({
        title: task.title || 'Untitled Task',
        description: task.description || '',
        priority: ['high', 'medium', 'low'].includes(task.priority) ? task.priority : 'medium',
        status: ['pending', 'in-progress', 'completed', 'failed'].includes(task.status) ? task.status : 'pending',
        assigned_to: task.assigned_to || null
      }));

      // Insert tasks
      const { data, error } = await supabase
        .from('lovable_tasks')
        .insert(formattedTasks);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${formattedTasks.length} tasks imported successfully.`
      });

      // Reset and close
      setJsonText('');
      setIsOpen(false);
      onImportComplete();
    } catch (error: any) {
      console.error('Error importing tasks:', error);
      toast({
        title: "Import Failed",
        description: error.message || "An error occurred while importing tasks.",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Import Tasks
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import Tasks from JSON</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-500 mb-2">
            Paste your JSON array of tasks below. Each task should have title, description, priority, and status fields.
          </p>
          <Textarea
            className="min-h-[200px] font-mono text-sm"
            placeholder='[
  {
    "title": "Task title",
    "description": "Task description",
    "priority": "high", // high, medium, or low
    "status": "pending" // pending, in-progress, completed, or failed
  }
]'
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={isImporting}>
            {isImporting ? "Importing..." : "Import Tasks"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportTasksDialog;
