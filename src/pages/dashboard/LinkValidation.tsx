
import React from 'react';
import LinkValidationDashboard from '@/components/testing/LinkValidationDashboard';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LinkValidation = () => {
  return (
    <>
      <Helmet>
        <title>Link Validation Dashboard | PulsePlace.ai</title>
        <meta name="description" content="Audit and fix navigation links across PulsePlace.ai" />
      </Helmet>
      
      <div className="container mx-auto py-4">
        <Link to="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        
        <LinkValidationDashboard />
      </div>
    </>
  );
};

export default LinkValidation;
