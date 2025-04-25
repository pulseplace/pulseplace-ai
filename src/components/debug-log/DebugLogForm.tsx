
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BugIcon, Plus } from 'lucide-react';
import { useDebugLogs } from '@/contexts/TaskContext';
import { DebugLog, DebugLogSeverity, DebugLogStatus } from '@/types/task.types';

export interface DebugLogFormProps {
  onSubmit?: (log: Omit<DebugLog, 'id' | 'dateLogged'>) => void;
  onCancel?: () => void;
}

const DebugLogForm = ({ onSubmit, onCancel }: DebugLogFormProps = {}) => {
  const { addDebugLog } = useDebugLogs();
  const [isOpen, setIsOpen] = useState(false);
  const [logData, setLogData] = useState<Omit<DebugLog, 'id' | 'dateLogged'>>({
    component: '',
    description: '',
    severity: 'Major',
    status: 'Open',
    loggedBy: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use the provided onSubmit or default to addDebugLog
    if (onSubmit) {
      onSubmit(logData);
    } else {
      addDebugLog(logData);
    }
    
    // Reset form and close dialog
    setLogData({
      component: '',
      description: '',
      severity: 'Major',
      status: 'Open',
      loggedBy: ''
    });
    setIsOpen(false);
  };

  const handleCancel = () => {
    // Use the provided onCancel or default to closing dialog
    if (onCancel) {
      onCancel();
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pulse-gradient">
          <Plus className="mr-2 h-4 w-4" />
          Log New Issue
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BugIcon className="h-5 w-5" />
            Log a New Debug Issue
          </DialogTitle>
          <DialogDescription>
            Report bugs and issues to track them in the debug log.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="component">Component/Module</Label>
              <Input 
                id="component"
                value={logData.component}
                onChange={(e) => setLogData({...logData, component: e.target.value})}
                placeholder="e.g. Dashboard"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="loggedBy">Logged By</Label>
              <Input 
                id="loggedBy"
                value={logData.loggedBy}
                onChange={(e) => setLogData({...logData, loggedBy: e.target.value})}
                placeholder="Your name"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Issue Description</Label>
            <Textarea 
              id="description"
              value={logData.description}
              onChange={(e) => setLogData({...logData, description: e.target.value})}
              placeholder="Describe the issue in detail..."
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <Select 
                value={logData.severity} 
                onValueChange={(value: DebugLogSeverity) => setLogData({...logData, severity: value})}
              >
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
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={logData.status} 
                onValueChange={(value: DebugLogStatus) => setLogData({...logData, status: value})}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Fixed">Fixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DebugLogForm;
