
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-2xl font-bold bg-gradient-to-r from-pulse-400 to-teal-400 bg-clip-text text-transparent">
        PulsePlace.ai
      </span>
    </Link>
  );
};

export default Logo;
