
import React from 'react';

interface LabelProps {
  value: string;
  position: string;
}

const Label: React.FC<LabelProps> = ({ value, position }) => {
  return (
    <text
      x={position === 'insideBottomRight' ? 500 : 0}
      y={position === 'insideBottomRight' ? 60 : 0}
      dy={-6}
      fill="red"
      fontSize={10}
      textAnchor="end"
    >
      {value}
    </text>
  );
};

export default Label;
