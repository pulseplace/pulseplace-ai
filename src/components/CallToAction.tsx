
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const CallToAction = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to your backend
    console.log('Contact request submitted:', { name, email, company, message });
    
    toast({
      title: "Message sent",
      description: "Thank you for reaching out! We'll get back to you shortly.",
    });
    
    // Reset form
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Let's Build Lovable Workplaces — Together.
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-pulse-gradient hover:opacity-90 transition-all h-12 px-6 text-base">
                  Join the Beta <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmitRequest}>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Join the Beta Program</DialogTitle>
                    <DialogDescription>
                      Be among the first to experience PulsePlace.ai and get your organization Pulse Certified.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="col-span-3" 
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="col-span-3" 
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="company" className="text-right">
                        Company
                      </Label>
                      <Input 
                        id="company" 
                        value={company} 
                        onChange={(e) => setCompany(e.target.value)} 
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="message" className="text-right">
                        Message
                      </Label>
                      <Textarea 
                        id="message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        className="col-span-3"
                        placeholder="Tell us about your organization and why you're interested in joining the beta."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-pulse-gradient hover:opacity-90">
                      Submit Request
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="border-pulse-300 text-pulse-700 hover:bg-pulse-50 h-12 px-6 text-base"
                >
                  Talk to Us <MessageCircle className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmitRequest}>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Contact Us</DialogTitle>
                    <DialogDescription>
                      Have questions about PulsePlace.ai? Let us know how we can help.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact-name" className="text-right">
                        Name
                      </Label>
                      <Input 
                        id="contact-name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="col-span-3" 
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact-email" className="text-right">
                        Email
                      </Label>
                      <Input 
                        id="contact-email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="col-span-3" 
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact-company" className="text-right">
                        Company
                      </Label>
                      <Input 
                        id="contact-company" 
                        value={company} 
                        onChange={(e) => setCompany(e.target.value)} 
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact-message" className="text-right">
                        Message
                      </Label>
                      <Textarea 
                        id="contact-message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        className="col-span-3"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-pulse-gradient hover:opacity-90">
                      Send Message
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
