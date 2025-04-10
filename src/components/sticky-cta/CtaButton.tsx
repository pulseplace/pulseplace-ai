
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, Mail } from 'lucide-react';

interface CtaConfig {
  text: string;
  link?: string;
  action?: () => void;
  icon: string;
}

interface CtaButtonProps {
  config: CtaConfig;
  isMobile: boolean;
  onActionClick: () => void;
}

const CtaButton = ({ config, isMobile, onActionClick }: CtaButtonProps) => {
  const buttonClassName = `bg-pulse-gradient hover:opacity-90 transition-all font-medium px-4 py-2 shadow-lg rounded-full group ${isMobile ? 'text-sm' : ''}`;
  
  const getIcon = () => {
    if (config.icon === 'chevron-right') {
      return <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />;
    }
    return <Mail className="ml-1 h-5 w-5" />;
  };

  if (config.link) {
    return (
      <Link to={config.link}>
        <Button 
          className={buttonClassName}
          size={isMobile ? "default" : "lg"}
        >
          {config.text}
          {getIcon()}
        </Button>
      </Link>
    );
  }
  
  return (
    <Button 
      className={buttonClassName}
      size={isMobile ? "default" : "lg"}
      onClick={onActionClick}
    >
      {config.text}
      {getIcon()}
    </Button>
  );
};

export default CtaButton;
