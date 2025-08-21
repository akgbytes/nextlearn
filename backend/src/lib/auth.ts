import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/configs/db";
import { env } from "@/configs/env";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  advanced: {
    cookies: {
      session_token: {
        name: "crackly_session",
      },
    },
    defaultCookieAttributes: { sameSite: "None", secure: true, httpOnly: true },
    useSecureCookies: true,
  },
  session: {
    cookieCache: { enabled: true, maxAge: 10 * 60 },
  },
  trustedOrigins: [env.FRONTEND_URL],
});
