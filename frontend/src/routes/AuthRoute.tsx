import { useSession } from "@/lib/auth-client";
import { Outlet } from "react-router";

const AuthRoute = () => {
  const { data, isPending } = useSession();

  if (isPending) {
    return <div></div>;
  }

  return <Outlet />;
};

export default AuthRoute;
