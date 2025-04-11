
import React from 'react';
import { Button } from "@/components/ui/button";
import { LinkCheck } from 'lucide-react';
import { quickAudit } from '@/utils/auditAndTesting';
import { useNavigate } from 'react-router-dom';

type ValidationButtonProps = {
  variant?: 'icon' | 'text' | 'full';
  className?: string;
};

const ValidationButton: React.FC<ValidationButtonProps> = ({ 
  variant = 'icon',
  className = ''
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    quickAudit();
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
        <LinkCheck className="h-5 w-5" />
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
        <LinkCheck className="mr-2 h-4 w-4" />
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
