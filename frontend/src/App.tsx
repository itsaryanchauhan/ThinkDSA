import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import ApiKeyPrompt from "@/components/ui/ApiKeyPrompt";
import { useEffect, useState } from "react";

// Pages
import HomePage from "./pages/HomePage";
import TopicDetailPage from "./pages/TopicDetailPage";
import QuestionDetailPage from "./pages/QuestionDetailPage";
import ExplorePage from "./pages/ExplorePage";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  const [hasKey, setHasKey] = useState(!!localStorage.getItem("geminiApiKey"));
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("geminiApiKey")) {
      setShowPrompt(true);
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ApiKeyPrompt
            open={showPrompt}
            onClose={() => setShowPrompt(false)}
            onSave={() => {
              setShowPrompt(false);
              setHasKey(true);
            }}
          />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={hasKey ? <HomePage /> : <Index />} />
              <Route
                path="/topic/:id"
                element={hasKey ? <TopicDetailPage /> : <Index />}
              />
              <Route
                path="/topic/:topicId/question/:questionId"
                element={hasKey ? <QuestionDetailPage /> : <Index />}
              />
              <Route
                path="/explore"
                element={hasKey ? <ExplorePage /> : <Index />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
