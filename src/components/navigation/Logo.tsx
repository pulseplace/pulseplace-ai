
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="font-bold text-xl text-gray-900">
        <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          GTME
        </span>
        <span className="text-gray-700">.ai</span>
      </div>
    </Link>
  );
};

export default Logo;
