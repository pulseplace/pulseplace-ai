
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookingConfirmationProps {
  onSuccess?: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    meetingType: 'product-demo',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('send-booking-confirmation', {
        body: formData,
      });

      if (error) throw error;

      console.log('Booking confirmation result:', data);
      
      setIsConfirmed(true);
      toast({
        title: 'Booking Confirmed',
        description: 'Your meeting has been scheduled and a confirmation email has been sent.',
      });

      // Call onSuccess callback if provided
      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    } catch (error: any) {
      console.error('Error sending booking confirmation:', error);
      toast({
        title: 'Booking Error',
        description: error.message || 'Failed to process your booking. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isConfirmed) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>Booking Confirmed!</CardTitle>
          <CardDescription>
            An email confirmation has been sent to {formData.email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-gray-50 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Meeting Details</p>
                <p className="mt-1 text-sm text-gray-500">
                  <strong>Date:</strong> {formData.date}<br />
                  <strong>Time:</strong> {formData.time}<br />
                  <strong>Type:</strong> {formData.meetingType === 'product-demo' ? 'Product Demo' : 'Consultation Call'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Schedule a Meeting</CardTitle>
        <CardDescription>
          Choose a time to discuss how PulsePlace can help your organization
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="date"
                  name="date"
                  type="date"
                  className="pl-10"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="meetingType">Meeting Type</Label>
            <Select
              value={formData.meetingType}
              onValueChange={handleSelectChange('meetingType')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select meeting type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product-demo">Product Demo</SelectItem>
                <SelectItem value="consultation">Consultation Call</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-pulse-gradient" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm Booking'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BookingConfirmation;
