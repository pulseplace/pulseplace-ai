
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export function useBadgeSharing() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('html');
  const [badgeStyle, setBadgeStyle] = useState('standard'); // 'standard' or 'compact'
  const [customCta, setCustomCta] = useState('Verified by PulsePlace.ai');
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      
      toast({
        title: "Copied to clipboard",
        description: "The code has been copied to your clipboard"
      });
      
      setTimeout(() => {
        setHasCopied(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({
        title: "Copy failed",
        description: "Please try again or copy manually",
        variant: "destructive"
      });
    }
  };

  const handleDownloadBadge = () => {
    // In a real implementation, we would generate and download an image
    toast({
      title: "Download started",
      description: "Badge image is being downloaded"
    });
  };

  return {
    activeTab,
    setActiveTab,
    badgeStyle,
    setBadgeStyle,
    customCta,
    setCustomCta,
    hasCopied,
    handleCopy,
    handleDownloadBadge
  };
}
