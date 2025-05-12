
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BookOpen, 
  Brain, 
  Code, 
  Sparkles, 
  CheckCircle, 
  Github
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="fixed top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="size-10 rounded-lg bg-primary/90 flex items-center justify-center text-primary-foreground font-mono">
              TD
            </div>
            <span>ThinkDSA</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/register')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-24 lg:pt-32 border-b">
        <div className="container px-4 md:px-6 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="flex flex-col items-center space-y-4 text-center max-w-3xl mx-auto">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                ThinkDSA
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Think before you code.
              </p>
            </div>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Organize, explore, and grow your DSA problem-solving skills — with thoughtful feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button size="lg" onClick={() => navigate('/register')}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            </div>
          </div>

          {/* Abstract geometric background shapes (optional) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-10">
            <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full border-8 border-primary/40" />
            <div className="absolute top-20 left-20 h-[400px] w-[400px] rounded-full border-8 border-accent/40" />
            <div className="absolute top-40 left-40 h-[300px] w-[300px] rounded-full border-8 border-primary/40" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Features
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to master data structures and algorithms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-md hover:border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Personalized Topics</h3>
              <p className="text-muted-foreground">
                Create custom collections of problems organized by concept, difficulty, or learning goal
              </p>
            </div>
            
            <div className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-md hover:border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Add From Anywhere</h3>
              <p className="text-muted-foreground">
                Import problems from LeetCode, GeeksForGeeks, and other platforms with a single click
              </p>
            </div>
            
            <div className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-md hover:border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Pseudocode First</h3>
              <p className="text-muted-foreground">
                Focus on designing your solution before coding with our simple pseudocode editor
              </p>
            </div>
            
            <div className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-md hover:border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">AI Feedback</h3>
              <p className="text-muted-foreground">
                Get valuable insights and improvement suggestions on your problem-solving approach
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How It Works
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Enhance your algorithmic thinking in a structured way
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block transform -translate-x-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary mb-4 shadow-sm">
                  <span className="text-xl font-bold text-primary-foreground">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Create Topics</h3>
                <p className="text-muted-foreground">
                  Organize your learning by creating topics that match your study plan or interview prep
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary mb-4 shadow-sm">
                  <span className="text-xl font-bold text-primary-foreground">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Add Questions</h3>
                <p className="text-muted-foreground">
                  Import problems from various platforms and organize them within your topics
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary mb-4 shadow-sm">
                  <span className="text-xl font-bold text-primary-foreground">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Think, Solve, Improve</h3>
                <p className="text-muted-foreground">
                  Work through problems systematically with pseudocode and get AI-powered feedback
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to level up your problem-solving?
              </h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join ThinkDSA today and transform how you approach data structures and algorithms
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6 mt-6">
              <Button size="lg" onClick={() => navigate('/register')}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            </div>
            <div className="flex items-center justify-center mt-8">
              <CheckCircle className="w-5 h-5 text-primary mr-2" />
              <span className="text-muted-foreground">No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 md:py-12">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded bg-primary/90 flex items-center justify-center text-primary-foreground font-mono text-sm">
              TD
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 ThinkDSA. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="https://github.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
