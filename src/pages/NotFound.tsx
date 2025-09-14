import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">404</h1>
          <p className="text-xl text-muted-foreground">Oops! Page not found</p>
        </div>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 hover:shadow-glow hover:scale-[1.02]"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
