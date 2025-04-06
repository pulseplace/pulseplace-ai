
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon, Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  avatarInitials: string;
  rating?: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "PulsePlace.ai transformed how we understand our workplace culture. The insights we gained led to a 35% increase in employee satisfaction scores.",
    author: "Sarah Johnson",
    title: "VP of People Operations",
    company: "TechForward Inc.",
    avatarInitials: "SJ",
    rating: 5
  },
  {
    quote: "The AI-driven insights helped us identify blind spots in our culture that we never would have found with traditional surveys.",
    author: "Michael Chen",
    title: "Chief People Officer",
    company: "GrowthMind",
    avatarInitials: "MC",
    rating: 5
  },
  {
    quote: "Being Pulse Certified has become a competitive advantage in our recruiting efforts. Candidates specifically mention it as a reason they applied.",
    author: "Priya Patel",
    title: "Head of Talent Acquisition",
    company: "InnovateCorp",
    avatarInitials: "PP",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-pulse-100 text-pulse-700 text-sm font-medium mb-4">
            <span>What Our Clients Say</span>
            <div className="w-2 h-2 rounded-full bg-pulse-500 ml-2"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Organizations using PulsePlace.ai are discovering new insights and transforming their workplace culture.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-pulse-600 opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <CardContent className="p-6 relative z-10">
                <div className="mb-4 text-pulse-500">
                  <QuoteIcon className="h-8 w-8 opacity-80" />
                </div>
                {testimonial.rating && (
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                )}
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 bg-pulse-100 text-pulse-700 mr-4">
                    <AvatarFallback>{testimonial.avatarInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.title}, {testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Join these organizations and many more who are transforming their workplace culture with PulsePlace.ai
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
