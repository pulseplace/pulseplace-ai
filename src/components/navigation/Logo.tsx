
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">
        PulsePlace.ai
      </Link>
    </div>
  );
};

export default Logo;
