
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { SubscriberProfile } from './SubscriberTypes';
import SubscriberList from './SubscriberList';
import SubscriberSearch from './SubscriberSearch';

const MailchimpSubscribersTable: React.FC = () => {
  const [subscribers, setSubscribers] = useState<SubscriberProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchSubscribers = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .not('email', 'is', null)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setSubscribers(data || []);
    } catch (error: any) {
      console.error('Error fetching subscribers:', error);
      toast({
        title: "Error fetching subscribers",
        description: error.message || "Failed to load subscriber profiles",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSubscribers();
  }, []);
  
  const filteredSubscribers = subscribers.filter(sub => 
    (sub.email?.toLowerCase().includes(searchTerm) || '') ||
    (sub.first_name?.toLowerCase().includes(searchTerm) || '') ||
    (sub.last_name?.toLowerCase().includes(searchTerm) || '')
  );
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Mailchimp Subscribers</CardTitle>
            <CardDescription>
              View and manage subscriber profiles with confirmation status
            </CardDescription>
          </div>
          <div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={fetchSubscribers}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <SubscriberSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Confirmed</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Sign-up Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SubscriberList 
                  subscribers={filteredSubscribers} 
                  isLoading={isLoading} 
                />
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MailchimpSubscribersTable;
