import { Link } from "react-router-dom";

export function MainNav() {
  return (
    <nav className="flex space-x-4 mb-4">
      <Link
        to="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Meeting Planner
      </Link>
      <Link
        to="/world-clock"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        World Clock
      </Link>
      <Link
        to="/time-gpt"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        TimeGPT
      </Link>
    </nav>
  );
}