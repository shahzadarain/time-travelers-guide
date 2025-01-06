import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Clock, Users } from "lucide-react";

export const MainNav = () => {
  return (
    <NavigationMenu className="mb-8">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:text-primary">
            <Users className="h-4 w-4" />
            Meeting Planner
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/world-clock" className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:text-primary">
            <Clock className="h-4 w-4" />
            World Clock
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};