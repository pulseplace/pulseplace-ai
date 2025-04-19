
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { BadgeStyle, BadgeVariant } from '@/types/badge.types';

export const useBadgeSharing = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('html');
  const [badgeStyle, setBadgeStyle] = useState<BadgeStyle>('standard');
  const [badgeVariant, setBadgeVariant] = useState<BadgeVariant>('default');
  const [customCta, setCustomCta] = useState("We're Pulse Certified!");
  const [hasCopied, setHasCopied] = useState(false);
  
  // Handle copy text (for embed code, etc.)
  const handleCopy = (type: string, text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setHasCopied(true);
        
        toast({
          title: `${type.charAt(0).toUpperCase() + type.slice(1)} Copied`,
          description: `The ${type} has been copied to your clipboard`,
        });
        
        setTimeout(() => {
          setHasCopied(false);
        }, 2000);
      })
      .catch(err => {
        toast({
          title: "Copy Failed",
          description: `Could not copy ${type} to clipboard: ${err.message}`,
          variant: "destructive",
        });
      });
  };
  
  // Handle download badge
  const handleDownloadBadge = () => {
    toast({
      title: "Badge Downloaded",
      description: "Your certification badge has been downloaded",
    });
    
    // In a real implementation, this would handle the actual download
  };
  
  return {
    activeTab,
    setActiveTab,
    badgeStyle,
    setBadgeStyle,
    badgeVariant,
    setBadgeVariant,
    customCta,
    setCustomCta,
    hasCopied,
    handleCopy,
    handleDownloadBadge
  };
};
