import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <img src="/logo.svg" alt="logo" className="size-10" />
          <span className="text-2xl">NextLearn</span>
        </Link>
        <Outlet />
        <div className="text-balance text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <span className="hover:text-primary hover:underline">
            Terms of service
          </span>{" "}
          and{" "}
          <span className="hover:text-primary hover:underline">
            Privacy Policy
          </span>
          .
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
