
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useRequireAuth } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
  enableInternalScroll?: boolean;
}

const Layout = ({ 
  children, 
  requireAuth = false,
  enableInternalScroll = true
}: LayoutProps) => {
  const { isAuthenticated, isLoading } = useRequireAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse-subtle">Loading...</div>
      </div>
    );
  }

  // Redirect to login if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to home if user is already authenticated and tries to access login/register
  if (
    isAuthenticated && 
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Navigate to="/home" replace />;
  }

  // Landing page doesn't use the navbar or internal scrolling
  if (location.pathname === "/") {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          {children}
        </main>
        <Toaster />
      </div>
    );
  }

  // For authenticated pages, use internal scrolling if enabled
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-4 overflow-hidden">
        {enableInternalScroll ? (
          <ScrollArea className="h-[calc(100vh-4rem)] rounded-md">
            <div className="px-1 pb-4">
              {children}
            </div>
          </ScrollArea>
        ) : (
          children
        )}
      </main>
      <Toaster />
    </div>
  );
};

export default Layout;
