import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string;
  fallbackTarget?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  page?: string;
  action?: () => void;
}

interface TourContextType {
  isActive: boolean;
  currentStep: number;
  steps: TourStep[];
  startTour: () => void;
  endTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

interface TourProviderProps {
  children: ReactNode;
}

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const steps: TourStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to ThinkDSA! 🎉',
      content: 'Let us show you around this platform designed to help you think before you code. This tour will take you through different pages.',
      target: '[data-tour="logo"]',
      placement: 'bottom',
      page: '/home'
    },
    {
      id: 'topics',
      title: 'Your Topics Dashboard 📚',
      content: 'This is your main dashboard where you can see all your DSA topics. Each topic can contain multiple questions organized by category.',
      target: '[data-tour="topics-section"]',
      placement: 'top',
      page: '/home'
    },
    {
      id: 'new-topic',
      title: 'Create New Topic ➕',
      content: 'Click here to create a new topic. Organize your learning by concepts like Arrays, Trees, Dynamic Programming, etc.',
      target: '[data-tour="new-topic-btn"]',
      placement: 'left',
      page: '/home'
    },
    {
      id: 'topic-card',
      title: 'Topic Cards 📄',
      content: 'Each card represents a topic. Click on any card to dive deeper and see the questions within that topic.',
      target: '[data-tour="topic-card"]:first-child',
      placement: 'top',
      page: '/home'
    },
    {
      id: 'explore-nav',
      title: 'Navigate to Explore 🔍',
      content: 'Now let\'s visit the Explore page to see what the community is working on!',
      target: '[data-tour="explore-nav"]',
      placement: 'bottom',
      page: '/home',
      action: () => {
        setTimeout(() => navigate('/explore'), 1000);
      }
    },
    {
      id: 'explore-page',
      title: 'Explore Community Content 🌟',
      content: 'Here you can discover trending topics, browse recent problems from the community, and get inspiration for your own learning journey.',
      target: '[data-tour="explore-content"]',
      placement: 'top',
      page: '/explore'
    },
    {
      id: 'trending-topics',
      title: 'Trending Topics 🔥',
      content: 'These are the most popular topics that other users are currently working on. Great for finding new challenges!',
      target: '[data-tour="trending-heading"]', // Changed to target the heading directly
      fallbackTarget: '[data-tour="trending-topics"]', // Fallback to the container
      placement: 'bottom',
      page: '/explore'
    },
    {
      id: 'back-to-topics',
      title: 'Back to Your Topics 🏠',
      content: 'Let\'s go back to your topics page to complete the tour.',
      target: '[data-tour="topics-nav"]',
      fallbackTarget: 'nav a[href="/home"]',
      placement: 'bottom',
      page: '/explore',
      action: () => {
        setTimeout(() => navigate('/home'), 1000);
      }
    },
    {
      id: 'theme-toggle',
      title: 'Theme Toggle 🌙',
      content: 'Switch between light and dark themes based on your preference. Try it out!',
      target: '[data-tour="theme-toggle"]',
      placement: 'bottom',
      page: '/home'
    },
    {
      id: 'tour-complete',
      title: 'Tour Complete! 🎊',
      content: 'You\'ve successfully completed the tour! You\'re now ready to start your DSA journey. Click on the help button anytime to restart this tour.',
      target: '[data-tour="logo"]',
      placement: 'bottom',
      page: '/home'
    }
  ];

  const startTour = () => {
    setIsActive(true);
    setCurrentStep(0);
    if (steps[0].page) {
      navigate(steps[0].page);
    }
  };

  const endTour = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStepIndex = currentStep + 1;
      const nextStepData = steps[nextStepIndex];
      
      if (nextStepData.action) {
        nextStepData.action();
      }
      
      if (nextStepData.page && nextStepData.page !== steps[currentStep].page) {
        setTimeout(() => {
          setCurrentStep(nextStepIndex);
        }, 500);
        navigate(nextStepData.page);
      } else {
        setCurrentStep(nextStepIndex);
      }
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      const prevStepData = steps[prevStepIndex];
      
      if (prevStepData.page && prevStepData.page !== steps[currentStep].page) {
        navigate(prevStepData.page);
        setTimeout(() => {
          setCurrentStep(prevStepIndex);
        }, 500);
      } else {
        setCurrentStep(prevStepIndex);
      }
    }
  };

  const skipTour = () => {
    endTour();
  };

  return (
    <TourContext.Provider
      value={{
        isActive,
        currentStep,
        steps,
        startTour,
        endTour,
        nextStep,
        prevStep,
        skipTour,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};