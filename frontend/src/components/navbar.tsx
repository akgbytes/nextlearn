import { Link } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import UserButton from "@/components/user-button";

type NavigationLink = {
  name: string;
  to: string;
};
const navigationLinks: NavigationLink[] = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Courses",
    to: "/courses",
  },
  {
    name: "Dashboard",
    to: "/dashboard",
  },
];

const Navbar = () => {
  const { data: auth, isPending } = useSession();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 
    backdrop-blur-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex min-h-16 items-center">
        <Link to="" className="flex items-center space-x-2 mr-4">
          <img src="/logo.svg" className="size-8" />
          <span className="font-bold">Elevera</span>
        </Link>

        {/* navigation links */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            {navigationLinks.map(({ name, to }) => (
              <Link
                key={name}
                to={to}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />

            {isPending ? null : auth ? (
              <UserButton
                name={auth.user.name}
                email={auth.user.email}
                image={auth.user.image || ""}
              />
            ) : (
              <>
                <Link
                  to="/login"
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Login
                </Link>
                <Link to="/login" className={cn(buttonVariants())}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
