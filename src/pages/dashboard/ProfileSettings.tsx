import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProfileForm from '@/components/profile/ProfileForm';
import MetaTags from '@/components/MetaTags';
import PromoteToAdmin from '@/components/profile/PromoteToAdmin';

const ProfileSettings: React.FC = () => {
  const { profile } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <MetaTags
        title="Profile Settings | PulsePlace.ai"
        description="Manage your profile settings and preferences."
      />
      
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ProfileForm />
        </div>
        
        <div className="space-y-6">
          {/* Only show admin promotion if not already an admin */}
          {profile?.role !== 'admin' && <PromoteToAdmin />}
          
          {/* Other settings cards can go here */}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
