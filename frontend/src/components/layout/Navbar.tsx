import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const Navbar = () => {
  const navigate = useNavigate();
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
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
