
import React from 'react';
import BulkUploadTeam from '@/components/dashboard/BulkUploadTeam';

const BulkTeamUploadPage = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Team Onboarding</h1>
      <BulkUploadTeam />
    </div>
  );
};

export default BulkTeamUploadPage;
