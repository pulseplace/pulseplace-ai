
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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Download, Eye, RefreshCw, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface MailchimpEvent {
  id: string;
  event_type: string;
  email: string | null;
  timestamp: string;
  list_id: string | null;
  raw_data: string | null;
  processed_at: string;
}

const getEventTypeBadge = (eventType: string) => {
  const typeColors: Record<string, string> = {
    subscribe: "bg-green-100 text-green-800",
    unsubscribe: "bg-red-100 text-red-800",
    profile: "bg-blue-100 text-blue-800",
    upemail: "bg-yellow-100 text-yellow-800",
    cleaned: "bg-purple-100 text-purple-800",
    campaign: "bg-indigo-100 text-indigo-800",
  };

  return typeColors[eventType.toLowerCase()] || "bg-gray-100 text-gray-800";
};

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
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  
  const filteredEvents = events.filter(event => 
    (event.email?.toLowerCase().includes(searchTerm) || '') ||
    event.event_type.toLowerCase().includes(searchTerm) ||
    event.list_id?.toLowerCase().includes(searchTerm) || ''
  );
  
  const exportToCSV = () => {
    try {
      // Create CSV content
      const headers = ["Event Type", "Email", "Timestamp", "List ID"];
      const csvContent = [
        headers.join(","),
        ...filteredEvents.map(event => [
          event.event_type,
          event.email || "",
          new Date(event.timestamp).toISOString(),
          event.list_id || ""
        ].join(","))
      ].join("\n");
      
      // Create and download the file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `mailchimp-events-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export successful",
        description: `Exported ${filteredEvents.length} events to CSV`,
      });
    } catch (error: any) {
      console.error('Error exporting to CSV:', error);
      toast({
        title: "Export failed",
        description: error.message || "Failed to export events to CSV",
        variant: "destructive"
      });
    }
  };
  
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
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={fetchEvents}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={exportToCSV}
              disabled={isLoading || filteredEvents.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by email or event..."
                onChange={handleSearch}
                value={searchTerm}
                className="pl-8"
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="h-9">
                {eventTypes.slice(0, 5).map(type => (
                  <TabsTrigger key={type} value={type} className="capitalize">
                    {type}
                  </TabsTrigger>
                ))}
                
                {eventTypes.length > 5 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-9 px-2">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {eventTypes.slice(5).map(type => (
                        <DropdownMenuItem 
                          key={type} 
                          onClick={() => setActiveTab(type)}
                          className="capitalize"
                        >
                          {type}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TabsList>
            </Tabs>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>List ID</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Loading events...
                    </TableCell>
                  </TableRow>
                ) : filteredEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No events found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <Badge className={`${getEventTypeBadge(event.event_type)} capitalize`}>
                          {event.event_type}
                        </Badge>
                      </TableCell>
                      <TableCell>{event.email || "—"}</TableCell>
                      <TableCell>
                        {new Date(event.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>{event.list_id || "—"}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewDetails(event)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Event details dialog */}
          <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Webhook Event Details</DialogTitle>
                <DialogDescription>
                  {selectedEvent && (
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`${getEventTypeBadge(selectedEvent.event_type)} capitalize`}>
                        {selectedEvent.event_type}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(selectedEvent.timestamp).toLocaleString()}
                      </span>
                    </div>
                  )}
                </DialogDescription>
              </DialogHeader>
              
              {selectedEvent && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Email</h4>
                      <p className="text-sm text-gray-700">{selectedEvent.email || "—"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">List ID</h4>
                      <p className="text-sm text-gray-700">{selectedEvent.list_id || "—"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Processed At</h4>
                      <p className="text-sm text-gray-700">
                        {new Date(selectedEvent.processed_at).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Event ID</h4>
                      <p className="text-sm text-gray-700">{selectedEvent.id}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Raw Payload</h4>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setViewRawData(!viewRawData)}
                      >
                        {viewRawData ? "View Formatted" : "View Raw"}
                      </Button>
                    </div>
                    
                    {selectedEvent.raw_data ? (
                      <div className="bg-gray-50 p-4 rounded-md overflow-auto max-h-[300px]">
                        {viewRawData ? (
                          <pre className="text-xs">{selectedEvent.raw_data}</pre>
                        ) : (
                          <pre className="text-xs whitespace-pre-wrap">
                            {JSON.stringify(JSON.parse(selectedEvent.raw_data), null, 2)}
                          </pre>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No raw data available</p>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default MailchimpWebhookLogs;
