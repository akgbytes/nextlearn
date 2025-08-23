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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTransition } from "react";
import { Link } from "react-router";

import { signIn, signUp } from "@/lib/auth-client";

import { Loader2, Send } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const formSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  email: z.email(),
  password: z.string().min(1, { error: "Password is required" }),
});

const SignUpForm = () => {
  const [isGoogleLoginPending, startGoogleLoginTransition] = useTransition();

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ name, email, password }: FormData) => {
    await signUp.email({
      name,
      email,
      password,
      callbackURL: `${
        import.meta.env.VITE_FRONTEND_URL
      }/verify-email?email=${email}`,

      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message || "Internal Server Error");
        },
      },
    });
  };

  const onSocial = (provider: "google") => {
    startGoogleLoginTransition(async () => {
      await signIn.social({
        provider,
        callbackURL: `${import.meta.env.VITE_FRONTEND_URL}`,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Google, redirecting...");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Internal Server Error");
          },
        },
      });
    });
  };

  return (
    <Card className="dark:border-white/10">
      <CardHeader className="flex flex-col">
        <CardTitle className="text-2xl font-bold">
          Let&apos;s get started
        </CardTitle>
        <CardDescription className="text-muted-foreground text-balance">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <Button
                variant="outline"
                className="w-full cursor-pointer"
                type="button"
                disabled={form.formState.isSubmitting || isGoogleLoginPending}
                onClick={() => onSocial("google")}
              >
                {isGoogleLoginPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <FcGoogle className="size-4" />
                    Sign in with Google
                  </>
                )}
              </Button>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Aman Gupta"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="akgbytes@gmail.com"
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

              <Button
                disabled={form.formState.isSubmitting || isGoogleLoginPending}
                type="submit"
                className="w-full cursor-pointer"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    <span>Continue with email</span>
                  </>
                )}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Already have an account?{" "}
                </span>

                <Link
                  to="/signin"
                  className="underline underline-offset-4 font-medium"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
