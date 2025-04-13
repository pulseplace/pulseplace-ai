
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const HandoverFooter: React.FC = () => {
  return (
    <div className="flex justify-between pt-4 border-t">
      <Button variant="outline" asChild>
        <Link to="/task-summary">
          <FileText className="mr-2 h-4 w-4" />
          View Task Summary
        </Link>
      </Button>
      
      <Button asChild>
        <Link to="/features/ai-engine">
          View AI Engine Status
        </Link>
      </Button>
    </div>
  );
};

export default HandoverFooter;
