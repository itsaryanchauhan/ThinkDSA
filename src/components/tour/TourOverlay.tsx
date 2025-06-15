import React, { useEffect, useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTour } from '@/context/TourContext';

const TourOverlay: React.FC = () => {
  const { isActive, currentStep, steps, nextStep, endTour } = useTour();
  const [highlightedElement, setHighlightedElement] = useState<Element | null>(null);

  const waitForElement = (selector: string, timeout = 3000): Promise<Element | null> => {
    return new Promise((resolve) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      setTimeout(() => {
        observer.disconnect();
        resolve(null);
      }, timeout);
    });
  };

  useEffect(() => {
    if (!isActive || !steps[currentStep]) return;

    const setupTourStep = async () => {
      const currentStepData = steps[currentStep];
      let element = await waitForElement(currentStepData.target);
      
      // If main target not found, try fallback
      if (!element && currentStepData.fallbackTarget) {
        console.log(`Primary target not found, trying fallback: ${currentStepData.fallbackTarget}`);
        element = await waitForElement(currentStepData.fallbackTarget);
      }
      
      // If still no element, try some common selectors as last resort
      if (!element) {
        console.log(`No element found for step: ${currentStepData.id}`);
        // For trending topics, try to find any heading with "Trending"
        if (currentStepData.id === 'trending-topics') {
          element = document.querySelector('h2') || document.querySelector('[data-tour="explore-content"]');
        }
        // For back-to-topics, try to find any navigation
        if (currentStepData.id === 'back-to-topics') {
          element = document.querySelector('nav') || document.querySelector('header');
        }
      }
      
      if (element) {
        setHighlightedElement(element);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        console.warn(`Could not find any element for tour step: ${currentStepData.id}`);
        // Still show the tooltip even if element is not found
        setHighlightedElement(null);
      }
    };

    setupTourStep();
  }, [isActive, currentStep, steps]);

  if (!isActive || !steps[currentStep]) return null;

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <>
      {/* Dark overlay with spotlight cutout */}
      <div className="fixed inset-0 z-40 pointer-events-auto">
        <div className="absolute inset-0 bg-black/70" onClick={endTour} />
        {highlightedElement && (
          <div
            className="absolute bg-transparent border-4 border-primary shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] rounded-lg animate-pulse"
            style={{
              top: highlightedElement.getBoundingClientRect().top - 8,
              left: highlightedElement.getBoundingClientRect().left - 8,
              width: highlightedElement.getBoundingClientRect().width + 16,
              height: highlightedElement.getBoundingClientRect().height + 16,
            }}
          />
        )}
      </div>
      
      {/* Fixed position tooltip */}
      <div className="fixed bottom-6 right-6 z-50 max-w-sm">
        <div className="bg-background border-2 border-primary rounded-lg p-4 shadow-2xl animate-in slide-in-from-bottom-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-base pr-2 leading-tight">
              {currentStepData.title}
            </h3>
            <Button variant="ghost" size="sm" onClick={endTour} className="h-6 w-6 p-0 shrink-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {currentStepData.content}
          </p>
          
          {/* Show warning if element not found */}
          {!highlightedElement && (
            <div className="text-xs text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 rounded px-2 py-1 mb-3">
              ⚠️ Element not visible - continue tour to proceed
            </div>
          )}
          
          {/* Page indicator */}
          {currentStepData.page && (
            <div className="flex items-center gap-2 text-xs bg-primary/10 rounded-md px-2 py-1 mb-3">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <span className="font-medium">
                {currentStepData.page === '/home' ? 'Topics Dashboard' : 'Explore Page'}
              </span>
            </div>
          )}
          
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Tour Progress</span>
              <span>{currentStep + 1} of {steps.length}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={endTour}
              className="text-xs"
            >
              Skip Tour
            </Button>
            <Button 
              size="sm" 
              onClick={nextStep}
              className="font-medium"
            >
              {isLastStep ? (
                <>🎉 Finish</>
              ) : (
                <>
                  Next Step
                  <ChevronRight className="h-3 w-3 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourOverlay;