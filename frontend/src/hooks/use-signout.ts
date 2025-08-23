import { signOut } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useSignOut = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/");
          toast.success("Signed out successfully");
        },
        onError: () => {
          toast.success("Failed to sign out");
        },
      },
    });
  };

  return handleSignOut;
};
