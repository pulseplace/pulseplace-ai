
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  onCopy: (text: string) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  label?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ 
  text, 
  onCopy, 
  variant = "outline", 
  className = "",
  size = "sm",
  label = "Copy Code"
}) => {
  const [hasCopied, setHasCopied] = useState(false);
  
  const handleCopy = () => {
    onCopy(text);
    setHasCopied(true);
    
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };
  
  return (
    <Button 
      onClick={handleCopy}
      variant={variant}
      size={size}
      className={className}
    >
      {hasCopied ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 mr-2" />
          {label}
        </>
      )}
    </Button>
  );
};

export default CopyButton;
