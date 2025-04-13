
import React from 'react';
import PhaseCard from './PhaseCard';
import { PhaseItem } from './types';

interface PhaseListProps {
  phases: PhaseItem[];
}

const PhaseList: React.FC<PhaseListProps> = ({ phases }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Phase Details & Tasks</h3>
      {phases.map((phase, index) => (
        <PhaseCard key={index} phase={phase} />
      ))}
    </div>
  );
};

export default PhaseList;
