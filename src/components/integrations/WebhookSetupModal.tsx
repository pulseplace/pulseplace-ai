
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface WebhookSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  onSave: (webhookUrl: string) => Promise<void>;
}

export function WebhookSetupModal({
  isOpen,
  onClose,
  serviceName,
  onSave
}: WebhookSetupModalProps) {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSave = async () => {
    if (!webhookUrl.trim()) {
      toast({
        title: "Missing Webhook URL",
        description: "Please enter a webhook URL to continue.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await onSave(webhookUrl);
      toast({
        title: "Webhook Saved",
        description: `Your ${serviceName} webhook has been successfully saved.`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error Saving Webhook",
        description: "There was a problem saving your webhook. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configure {serviceName} Webhook</DialogTitle>
          <DialogDescription>
            Enter your webhook URL to connect with {serviceName}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              placeholder={`Enter your ${serviceName} webhook URL`}
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500">
            <p>You can find this URL in your {serviceName} integration settings.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
