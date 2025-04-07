
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Check, Share2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface CopyButtonProps {
  text: string;
  onCopy: (text: string) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  label?: string;
  showShareIcon?: boolean;
}

const CopyButton: React.FC<CopyButtonProps> = ({ 
  text, 
  onCopy, 
  variant = "outline", 
  className = "",
  size = "sm",
  label = "Copy Code",
  showShareIcon = false
}) => {
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      onCopy(text);
      setHasCopied(true);
      
      toast({
        title: "Copied to clipboard",
        description: `The ${showShareIcon ? "sharing link" : "code"} has been copied to your clipboard.`,
      });
      
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard. Try selecting and copying manually.",
        variant: "destructive"
      });
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
            className={`transition-all duration-300 ${hasCopied ? 'bg-green-50 text-green-700 border-green-200' : ''} ${className}`}
          >
            {hasCopied ? (
              <>
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span className="animate-fade-in">Copied</span>
              </>
            ) : (
              <>
                {showShareIcon ? <Share2 className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {label}
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-800 text-white border-gray-700">
          <p>{hasCopied ? "Copied!" : "Copy to clipboard"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;
