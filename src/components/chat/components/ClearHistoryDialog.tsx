
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

export interface ClearHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClearHistory: () => void;
}

export const ClearHistoryDialog: React.FC<ClearHistoryDialogProps> = ({
  open,
  onOpenChange,
  onClearHistory,
}) => {
  const handleClear = () => {
    onClearHistory();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear Chat History</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your conversation history. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear History
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
