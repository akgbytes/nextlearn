import { signOut } from "@/lib/auth-client";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

export const useSignOut = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSignOut = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/");
          enqueueSnackbar("Signed out successfully", { variant: "success" });
        },
        onError: () => {
          enqueueSnackbar("Failed to sign out", { variant: "error" });
        },
      },
    });
  };

  return handleSignOut;
};
