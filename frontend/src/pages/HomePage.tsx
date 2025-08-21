import { ModeToggle } from "@/components/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";

import { Link } from "react-router";

const HomePage = () => {
  const { data } = useSession();

  if (!data) {
    return (
      <div>
        <ModeToggle />
        <h1>HomePage</h1>
        <Link to="/login" className={buttonVariants()}>
          Login
        </Link>
      </div>
    );
  }
  return (
    <div>
      <ModeToggle />
      <h1>Welcome {data.user.name}</h1>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
