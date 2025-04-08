
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Eye } from 'lucide-react';

interface AnonymityBannerProps {
  isAnonymous: boolean;
}

const AnonymityBanner: React.FC<AnonymityBannerProps> = ({ isAnonymous }) => {
  return (
    <Alert className={`mb-6 ${isAnonymous ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
      {isAnonymous ? (
        <>
          <Shield className="h-4 w-4 text-green-600 mr-2" />
          <AlertDescription className="text-green-800 font-medium">
            This survey is anonymous. Your feedback will not be linked to your identity.
          </AlertDescription>
        </>
      ) : (
        <>
          <Eye className="h-4 w-4 text-blue-600 mr-2" />
          <AlertDescription className="text-blue-800 font-medium">
            This survey is identified. Your name and department will be linked to your responses.
          </AlertDescription>
        </>
      )}
    </Alert>
  );
};

export default AnonymityBanner;
