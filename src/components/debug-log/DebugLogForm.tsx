
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDebugLogs } from '@/contexts/DebugLogsContext';
import { Plus } from 'lucide-react';

const DebugLogForm = () => {
  const { addDebugLog } = useDebugLogs();
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Major");
  const [loggedBy, setLoggedBy] = useState("");
  const [fixLink, setFixLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!component || !description || !severity || !loggedBy) {
      return; // Basic validation
    }
    
    addDebugLog({
      component,
      description,
      severity: severity as any,
      status: 'Open',
      loggedBy,
      fixLink: fixLink || undefined
    });
    
    // Reset form
    setComponent("");
    setDescription("");
    setSeverity("Major");
    setLoggedBy("");
    setFixLink("");
    
    // Close dialog
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pulse-gradient flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Log New Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Log a new issue</DialogTitle>
            <DialogDescription>
              Enter the details of the bug or issue you've encountered.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="component">Component</Label>
                <Input
                  id="component"
                  value={component}
                  onChange={(e) => setComponent(e.target.value)}
                  placeholder="e.g., Dashboard, PulseBot"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="severity">Severity</Label>
                <Select value={severity} onValueChange={setSeverity} required>
                  <SelectTrigger id="severity">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="Major">Major</SelectItem>
                    <SelectItem value="Minor">Minor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed description of the issue..."
                className="min-h-[100px]"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loggedBy">Logged By</Label>
                <Input
                  id="loggedBy"
                  value={loggedBy}
                  onChange={(e) => setLoggedBy(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fixLink">Fix Link (optional)</Label>
                <Input
                  id="fixLink"
                  value={fixLink}
                  onChange={(e) => setFixLink(e.target.value)}
                  placeholder="e.g., GitHub PR or branch URL"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-pulse-gradient">
              Submit Issue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DebugLogForm;
