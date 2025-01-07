import { Link, useLocation } from "react-router-dom";
import { Clock, Home, MessageSquare } from "lucide-react";

export function MainNav() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="border-b mb-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center space-x-8">
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Meeting Planner</span>
            </Link>
            <Link
              to="/world-clock"
              className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/world-clock") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>World Clock</span>
            </Link>
            <Link
              to="/time-gpt"
              className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/time-gpt") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>TimeGPT</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}