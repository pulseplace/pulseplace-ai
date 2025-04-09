
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, RefreshCw, Search, XCircle } from 'lucide-react';

interface SubscriberProfile {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  confirmed_opt_in: boolean | null;
  mailchimp_tags: string[] | null;
  created_at: string | null;
}

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
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  
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
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by name or email..."
              onChange={handleSearch}
              value={searchTerm}
              className="pl-8"
            />
          </div>
          
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Loading subscribers...
                    </TableCell>
                  </TableRow>
                ) : filteredSubscribers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No subscribers found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell>{subscriber.email || "—"}</TableCell>
                      <TableCell>
                        {subscriber.first_name || subscriber.last_name ? 
                          `${subscriber.first_name || ''} ${subscriber.last_name || ''}`.trim() : 
                          "—"}
                      </TableCell>
                      <TableCell>
                        {subscriber.confirmed_opt_in ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            <span>Confirmed</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-amber-600">
                            <XCircle className="h-4 w-4 mr-1" />
                            <span>Pending</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {subscriber.mailchimp_tags && subscriber.mailchimp_tags.length > 0 ? (
                            subscriber.mailchimp_tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="whitespace-nowrap">
                                {tag}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-gray-500 text-sm">No tags</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {subscriber.created_at ? 
                          new Date(subscriber.created_at).toLocaleDateString() : 
                          "—"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MailchimpSubscribersTable;
