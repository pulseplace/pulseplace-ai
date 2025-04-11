
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldAlert } from 'lucide-react';

const PromoteToAdmin: React.FC = () => {
  const { user, refreshProfile } = useAuth();
  const [isPromoting, setIsPromoting] = useState(false);

  const promoteToAdmin = async () => {
    if (!user) {
      toast.error('You must be signed in');
      return;
    }

    if (!confirm('Are you sure you want to promote yourself to admin? This should only be done for the initial admin user.')) {
      return;
    }

    setIsPromoting(true);

    try {
      const { error } = await supabase.functions.invoke('create-admin', {
        body: { userId: user.id }
      });

      if (error) throw error;

      await refreshProfile();
      toast.success('You have been promoted to admin successfully!');
    } catch (error: any) {
      console.error('Error promoting to admin:', error);
      toast.error(error.message || 'Failed to promote to admin');
    } finally {
      setIsPromoting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5" />
          Admin Promotion
        </CardTitle>
        <CardDescription>
          Promote yourself to admin to manage pitch deck access
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-amber-600 text-sm bg-amber-50 p-3 rounded-md border border-amber-200">
            <strong>Warning:</strong> This should only be used for the initial admin user setup. Only promote your account
            if you are the designated administrator for this application.
          </p>
          <Button
            onClick={promoteToAdmin}
            className="w-full"
            disabled={isPromoting}
          >
            {isPromoting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Promoting...
              </>
            ) : (
              'Promote to Admin'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromoteToAdmin;
