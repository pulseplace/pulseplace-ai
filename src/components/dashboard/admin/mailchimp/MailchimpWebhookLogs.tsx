
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
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
import { toast } from "@/hooks/use-toast";
import { MailchimpEvent } from './types';
import EventDetailDialog from './EventDetailDialog';
import EventList, { NoEvents, LoadingEvents } from './EventList';
import EventFilters from './EventFilters';

const MailchimpWebhookLogs: React.FC = () => {
  const [events, setEvents] = useState<MailchimpEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<MailchimpEvent | null>(null);
  const [viewRawData, setViewRawData] = useState<boolean>(false);
  
  const fetchEvents = async () => {
    setIsLoading(true);
    
    try {
      let query = supabase
        .from('mailchimp_events')
        .select('*')
        .order('timestamp', { ascending: false });
      
      if (activeTab !== 'all') {
        query = query.eq('event_type', activeTab);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      setEvents(data || []);
    } catch (error: any) {
      console.error('Error fetching Mailchimp events:', error);
      toast({
        title: "Error fetching events",
        description: error.message || "Failed to load Mailchimp webhook events",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchEvents();
  }, [activeTab]);
  
  const handleViewDetails = (event: MailchimpEvent) => {
    setSelectedEvent(event);
  };
  
  const handleDialogOpenChange = (open: boolean) => {
    if (!open) setSelectedEvent(null);
  };
  
  // Filter events based on search term
  const filteredEvents = events.filter(event => 
    (event.email?.toLowerCase().includes(searchTerm) || '') ||
    event.event_type.toLowerCase().includes(searchTerm) ||
    (event.list_id?.toLowerCase().includes(searchTerm) || '')
  );
  
  // Extract unique event types for tabs
  const eventTypes = ['all', ...Array.from(new Set(events.map(event => event.event_type)))];
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Mailchimp Webhook Logs</CardTitle>
            <CardDescription>
              Monitor and analyze Mailchimp subscription events
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <EventFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            eventTypes={eventTypes}
            filteredEvents={filteredEvents}
            isLoading={isLoading}
            fetchEvents={fetchEvents}
          />
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Confirmed</TableHead>
                  <TableHead>List ID</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <EventList 
                  events={filteredEvents}
                  isLoading={isLoading}
                  handleViewDetails={handleViewDetails}
                />
              </TableBody>
            </Table>
          </div>
          
          {/* Event details dialog */}
          <EventDetailDialog 
            selectedEvent={selectedEvent}
            onOpenChange={handleDialogOpenChange}
            viewRawData={viewRawData}
            setViewRawData={setViewRawData}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MailchimpWebhookLogs;
