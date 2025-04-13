
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link2, Cpu } from 'lucide-react';
import { runLinkValidation } from '@/utils/linkValidation';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

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
    console.log('Running link validation');
    const results = await runLinkValidation();
    if (onComplete) {
      onComplete(results);
    }
    
    // Show a toast to inform user
    toast({
      title: "Link Validation Complete",
      description: `Checked ${results.length} links across the site.`,
      duration: 3000
    });
  };
  
  const handleViewDashboard = () => {
    navigate('/dashboard/link-validation');
  };
  
  const handleViewHandoverReport = () => {
    navigate('/project-handover');
  };
  
  const handleViewAIProgress = () => {
    navigate('/features/ai-engine');
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
    <div className={`flex flex-wrap gap-2 ${className}`}>
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
      <Button 
        variant="default"
        size="sm" 
        onClick={handleViewHandoverReport}
      >
        Project Handover
      </Button>
      <Button 
        variant="outline"
        size="sm" 
        onClick={handleViewAIProgress}
        className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
      >
        <Cpu className="mr-2 h-4 w-4" />
        AI Integration Status
      </Button>
    </div>
  );
};

export default ValidationButton;
