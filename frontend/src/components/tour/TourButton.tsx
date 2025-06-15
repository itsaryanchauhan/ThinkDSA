import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTour } from '@/context/TourContext';
import { cn } from '@/lib/utils';

const TourButton: React.FC = () => {
  const { startTour, isActive } = useTour();

  if (isActive) return null;

  return (
    <Button
      onClick={startTour}
      size="icon"
      className={cn(
        "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg",
        "bg-primary hover:bg-primary/90 text-primary-foreground",
        "shadow-primary/20 hover:shadow-primary/40 hover:shadow-xl",
        "transition-all duration-300 hover:scale-105",
        // No animation, just hover effects
      )}
      aria-label="Start tour"
    >
      <HelpCircle className="h-6 w-6" />
    </Button>
  );
};

export default TourButton;