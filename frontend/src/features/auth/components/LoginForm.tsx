import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Alert, AlertTitle } from "@/components/ui/alert";

import { FcGoogle } from "react-icons/fc";
import { OctagonAlertIcon } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(1, { error: "Password is required" }),
});

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);

    await signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: `${import.meta.env.VITE_FRONTEND_URL}/dashboard`,
      },
      {
        onError: ({ error }) => {
          setError(error.message);
        },
      }
    );
  };

  const onSocial = async (provider: "google") => {
    setError(null);

    await signIn.social({
      provider,
      callbackURL: `${import.meta.env.VITE_FRONTEND_URL}/dashboard`,
    });
  };

  return (
    <Card className="dark:border-white/10">
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription className="text-muted-foreground text-balance">
          Login to your account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <div className="flex flex-col gap-6">
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="kk@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* {!!error && (
              <Alert className="bg-destructive/10 border-none">
                <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )} */}

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full cursor-pointer"
            >
              Sign in
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
