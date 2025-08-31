import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { enqueueSnackbar } from "notistack";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  fetchOptions: {
    onError: async (context) => {
      const { response } = context;
      if (response.status === 429) {
        const retryAfter = response.headers.get("X-Retry-After");
        enqueueSnackbar(
          `Rate limit exceeded. Retry after ${retryAfter} seconds`,
          { variant: "error" }
        );
      }
    },
  },
  plugins: [adminClient()],
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  sendVerificationEmail,
  verifyEmail,
} = authClient;
