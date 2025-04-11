
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  content: React.ReactNode;
  imageUrl?: string;
}

interface ScrollDeckProps {
  slides: Slide[];
  className?: string;
}

const ScrollDeck: React.FC<ScrollDeckProps> = ({ slides, className = '' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            {slides[currentSlide].imageUrl && (
              <div className="w-full aspect-video bg-gray-100 overflow-hidden">
                <img 
                  src={slides[currentSlide].imageUrl} 
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">{slides[currentSlide].title}</h3>
              <div className="prose max-w-none">
                {slides[currentSlide].content}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevSlide}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="text-sm text-gray-500">
          {currentSlide + 1} of {slides.length}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={goToNextSlide}
          disabled={currentSlide === slides.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ScrollDeck;
