
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LogOut, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-border sticky top-0 z-40 bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <a 
            href="/" 
            className="flex items-center gap-2 font-bold text-xl"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            <div className="size-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-mono">
              TD
            </div>
            <span>ThinkDSA</span>
          </a>
          {user && (
            <nav className="hidden md:flex gap-6">
              <a 
                href="/home" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/home");
                }}
              >
                Topics
              </a>
              <a 
                href="/explore" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/explore");
                }}
              >
                Explore
              </a>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {user && (
            <>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/explore")}
              >
                <Search className="h-5 w-5" />
              </Button>
              <div className="hidden md:block text-sm">
                <span className="text-muted-foreground mr-2">Signed in as</span>
                <span>{user.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </Button>
            </>
          )}
          {!user && location.pathname !== "/" && (
            <Button onClick={() => navigate("/login")}>Sign In</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
