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
import { Button } from "@/components/ui/button";
import { useSnackbar } from "notistack";

const VerifyEmail = () => {
  const { enqueueSnackbar } = useSnackbar();
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

          enqueueSnackbar("Verification email sent", { variant: "success" });
        },
        onError: (ctx) => {
          setStatus("error");
          enqueueSnackbar(ctx.error.message || "Error sending email", {
            variant: "error",
          });
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

          enqueueSnackbar("Email verified successfully", {
            variant: "success",
          });
        },
        onError: (ctx) => {
          setStatus("error");

          enqueueSnackbar(ctx.error.message || "Error verifying email", {
            variant: "error",
          });
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

export default VerifyEmail;
