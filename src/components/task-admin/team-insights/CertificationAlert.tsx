
import React from 'react';
import { Check } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface CertificationAlertProps {
  teams: string[];
}

const CertificationAlert: React.FC<CertificationAlertProps> = ({ teams }) => {
  if (teams.length === 0) return null;
  
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="bg-green-100 p-1.5 rounded-full mt-0.5">
          <Check className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-medium text-green-800">Certification Eligibility Signals</h3>
          <p className="text-sm text-green-700 mt-1">
            The following teams are eligible for PulseScore™ Certification:
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {teams.map((team, index) => (
              <Badge key={index} className="bg-green-100 text-green-800 border border-green-200">
                {team}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationAlert;
