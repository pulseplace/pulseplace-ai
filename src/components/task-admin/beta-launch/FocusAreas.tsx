
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import FocusAreaItem from './FocusAreaItem';
import { FocusArea } from './types';

interface FocusAreasProps {
  areas: FocusArea[];
}

const FocusAreas: React.FC<FocusAreasProps> = ({ areas }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {areas.map((area, index) => (
            <FocusAreaItem key={index} area={area} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FocusAreas;
