
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Download, FileText, LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MetaTags from '@/components/MetaTags';

const PitchDeckView: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [accessApproved, setAccessApproved] = useState(false);
  const [pitchDeckUrl, setPitchDeckUrl] = useState<string | null>(null);
  const [pitchDeckFile, setPitchDeckFile] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      checkAccessStatus();
    } else {
      setIsLoading(false);
      navigate('/auth', { state: { from: '/pitch-deck-view' } });
    }
  }, [user, navigate]);

  const checkAccessStatus = async () => {
    try {
      setIsLoading(true);
      
      // Check if the user has an approved request
      const { data: requestData, error: requestError } = await supabase
        .from('pitch_deck_requests')
        .select('*')
        .eq('user_id', user?.id)
        .eq('status', 'approved')
        .maybeSingle();

      if (requestError) throw requestError;

      if (requestData) {
        setAccessApproved(true);
        await fetchPitchDeck();
      }
    } catch (error: any) {
      console.error('Error checking access status:', error);
      toast.error('Failed to check access status');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPitchDeck = async () => {
    try {
      // Get the latest pitch deck file
      const { data: files, error: listError } = await supabase
        .storage
        .from('pitch_decks')
        .list();

      if (listError) throw listError;

      if (files && files.length > 0) {
        // Sort by created_at to get the latest file
        const sortedFiles = files.sort((a, b) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        
        const latestFile = sortedFiles[0];
        setPitchDeckFile(latestFile.name);
        
        // Get signed URL for the file
        const { data: urlData, error: urlError } = await supabase
          .storage
          .from('pitch_decks')
          .createSignedUrl(latestFile.name, 3600); // 1 hour expiry

        if (urlError) throw urlError;
        
        if (urlData) {
          setPitchDeckUrl(urlData.signedUrl);
        }
      }
    } catch (error: any) {
      console.error('Error fetching pitch deck:', error);
      toast.error('Failed to fetch pitch deck');
    }
  };

  const downloadPitchDeck = async () => {
    if (pitchDeckFile) {
      try {
        const { data, error } = await supabase
          .storage
          .from('pitch_decks')
          .download(pitchDeckFile);

        if (error) throw error;

        // Create a download link and click it
        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = pitchDeckFile;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast.success('Pitch deck download started');
      } catch (error: any) {
        console.error('Error downloading pitch deck:', error);
        toast.error('Failed to download pitch deck');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-pulse-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <MetaTags
        title="Investor Pitch Deck | PulsePlace.ai"
        description="Access the full PulsePlace.ai investor pitch deck."
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Investor Pitch Deck</h1>
        <p className="text-gray-600 mb-6">
          {accessApproved 
            ? 'Your access to our complete investor pitch deck has been approved'
            : 'Request access to view our complete investor pitch deck'}
        </p>

        {!accessApproved ? (
          <Card>
            <CardHeader>
              <CardTitle>Access Required</CardTitle>
              <CardDescription>
                You need approved access to view the full investor pitch deck
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-md border border-amber-200 flex items-start">
                <LockKeyhole className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-amber-800">Access Restricted</h3>
                  <p className="text-amber-700 text-sm mt-1">
                    You don't currently have access to view the full investor pitch deck.
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/pitch-deck-request')}
                className="w-full bg-pulse-gradient"
              >
                Request Access
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {pitchDeckUrl ? (
              <div className="space-y-4">
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>Full Investor Pitch Deck</CardTitle>
                    <CardDescription>
                      View or download our complete investor materials
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-end">
                      <Button
                        onClick={downloadPitchDeck}
                        variant="outline"
                        className="mb-4"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                    
                    <div className="border rounded-md overflow-hidden bg-gray-100">
                      <iframe
                        src={pitchDeckUrl}
                        className="w-full h-[700px]"
                        title="Investor Pitch Deck"
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="text-center text-sm text-gray-500">
                  <p>
                    This deck is confidential and for your eyes only. Please do not share without permission.
                  </p>
                </div>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Pitch Deck Available</CardTitle>
                  <CardDescription>
                    There is currently no pitch deck available for viewing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8">
                    <FileText className="h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-gray-600 text-center">
                      Our team is currently working on uploading the latest version of our pitch deck.
                      Please check back later or contact us for more information.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PitchDeckView;
