import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { sendVerificationEmail, verifyEmail } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email") || "";

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  const [loading, setLoading] = useState<boolean>(false);

  const sendEmail = () => {
    setLoading(true);
    sendVerificationEmail({
      email: email!,
      callbackURL: `${
        import.meta.env.VITE_FRONTEND_URL
      }/verify-email?email=${email}`,

      fetchOptions: {
        onSuccess: () => {
          setLoading(false);
          toast.success("Verification email sent");
        },
        onError: (ctx) => {
          setStatus("error");
          toast.error(ctx.error.message || "Error sending email");
        },
      },
    });
  };

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    verifyEmail({
      query: { token },
      fetchOptions: {
        onSuccess: () => {
          setStatus("success");
          setTimeout(() => navigate("/signin"), 2000);
          toast.success("Email verified successfully");
        },
        onError: (ctx) => {
          setStatus("error");
          toast.error(ctx.error.message || "Error verifying email");
        },
      },
    });
  }, [token, navigate]);

  return (
    <Card className="dark:border-white/10">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
        <CardDescription className="text-muted-foreground text-center">
          {status === "loading" && "Verifying your email, please wait..."}
          {status === "success" &&
            "Your email has been verified. Redirecting to login..."}
          {status === "error" &&
            "Invalid or expired verification link. Please request a new one."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {status === "error" && (
          <Button disabled={loading} onClick={sendEmail} className="w-full">
            Resend Verification Email
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default VerifyEmailPage;
