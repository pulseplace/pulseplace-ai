
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProfileForm from '@/components/profile/ProfileForm';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, Shield, UserCog } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <ProfileForm />
          
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-2 border-b">
                  <div>
                    <p className="font-medium">Email Address</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change Email
                  </Button>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-2 border-b">
                  <div>
                    <p className="font-medium">Account Type</p>
                    <p className="text-sm text-gray-500">Business Account</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Upgrade Plan
                  </Button>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-2">
                  <div>
                    <p className="font-medium">Sign Out</p>
                    <p className="text-sm text-gray-500">End your current session</p>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">Configure how and when you receive notifications about your PulseScore™ and certifications.</p>
              <div className="space-y-4">
                {/* Placeholder for notification preferences */}
                <p className="text-sm text-gray-500 italic">Notification preferences will be available in the full release.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">Manage your account security settings and password.</p>
              <Button variant="outline">Change Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSettings;
