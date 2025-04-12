
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link2 } from 'lucide-react';
import { runLinkValidation } from '@/utils/linkValidation';
import { useNavigate } from 'react-router-dom';

type ValidationButtonProps = {
  variant?: 'icon' | 'text' | 'full';
  className?: string;
  onComplete?: (results: any) => void;
};

const ValidationButton: React.FC<ValidationButtonProps> = ({ 
  variant = 'icon',
  className = '',
  onComplete
}) => {
  const navigate = useNavigate();
  
  const handleClick = async () => {
    const results = await runLinkValidation();
    if (onComplete) {
      onComplete(results);
    }
  };
  
  const handleViewDashboard = () => {
    navigate('/dashboard/link-validation');
  };
  
  if (variant === 'icon') {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleClick}
        className={`rounded-full ${className}`}
        title="Run quick link validation"
      >
        <Link2 className="h-5 w-5" />
      </Button>
    );
  }
  
  if (variant === 'text') {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleClick}
        className={className}
      >
        Validate Links
      </Button>
    );
  }
  
  return (
    <div className={`flex gap-2 ${className}`}>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleClick}
      >
        <Link2 className="mr-2 h-4 w-4" />
        Quick Link Audit
      </Button>
      <Button 
        variant="secondary"
        size="sm" 
        onClick={handleViewDashboard}
      >
        View Dashboard
      </Button>
    </div>
  );
};

export default ValidationButton;
