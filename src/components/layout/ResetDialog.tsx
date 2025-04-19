
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface ResetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReset: () => void;
  isResetting: boolean;
}

const ResetDialog = ({ open, onOpenChange, onReset, isResetting }: ResetDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Demo Data</DialogTitle>
          <DialogDescription>
            This will reset all demo data to its initial state. Any customizations or changes made during this session will be lost.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 bg-amber-50 rounded-md my-4">
          <div className="text-sm text-amber-800">
            <p className="font-medium">The following will be reset:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Team metrics and insights</li>
              <li>PulseBot conversation history</li>
              <li>QA Sprint tracker progress</li>
              <li>Dashboard statistics</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isResetting}>
            Cancel
          </Button>
          <Button 
            variant="default" 
            onClick={onReset}
            disabled={isResetting}
          >
            {isResetting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Resetting...
              </>
            ) : (
              'Reset Demo Data'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetDialog;
