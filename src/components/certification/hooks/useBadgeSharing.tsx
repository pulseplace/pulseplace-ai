
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { BadgeStyle } from '@/types/badge.types';

export const useBadgeSharing = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('html');
  const [badgeStyle, setBadgeStyle] = useState<BadgeStyle>('standard');
  const [customCta, setCustomCta] = useState("We're Pulse Certified!");
  const [hasCopied, setHasCopied] = useState<Record<string, boolean>>({
    html: false,
    linkedin: false, 
    twitter: false,
    notion: false
  });
  
  // Handle copy button click
  const handleCopy = (type: string, text: string) => {
    navigator.clipboard.writeText(text);
    setHasCopied(prev => ({ ...prev, [type]: true }));
    
    toast({
      title: "Copied Successfully",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} content copied to clipboard`,
    });
    
    setTimeout(() => {
      setHasCopied(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };
  
  // Handle badge download
  const handleDownloadBadge = () => {
    // In a real implementation, you would convert the SVG to an image and download it
    toast({
      title: "Badge Downloaded",
      description: "Your certification badge has been downloaded",
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
};
