
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    navigator.clipboard.writeText(text).then(() => {
      onCopy(text);
      setHasCopied(true);
      
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    });
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            onClick={handleCopy}
            variant={variant}
            size={size}
            className={`transition-all duration-300 ${className}`}
          >
            {hasCopied ? (
              <>
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span className="animate-fade-in">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                {label}
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{hasCopied ? "Copied!" : "Copy to clipboard"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;
