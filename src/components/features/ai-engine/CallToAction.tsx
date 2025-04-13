
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <div className="text-center">
      <Link to="/book-demo">
        <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white">
          Schedule a Demo
        </Button>
      </Link>
    </div>
  );
};

export default CallToAction;
