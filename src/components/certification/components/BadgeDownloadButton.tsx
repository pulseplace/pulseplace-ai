
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface BadgeDownloadButtonProps {
  onDownload: () => void;
}

const BadgeDownloadButton: React.FC<BadgeDownloadButtonProps> = ({
  onDownload
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = () => {
    setIsDownloading(true);
    onDownload();
    
    // Simulated download delay
    setTimeout(() => {
      setIsDownloading(false);
    }, 1500);
  };
  
  return (
    <Button 
      onClick={handleDownload}
      disabled={isDownloading}
      className="w-full"
    >
      {isDownloading ? 'Downloading...' : 'Download Badge'}
    </Button>
  );
};

export default BadgeDownloadButton;
