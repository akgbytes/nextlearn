import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  return (
    <Card className="dark:border-white/10">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome Back</CardTitle>
        <CardDescription className="">Login to your account</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button variant="outline" className="w-full">
          <FcGoogle className="size-4" />
          Sign in with Google
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="kk@gmail.com" />
          </div>
          <Button>Continue with Email</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
