import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { prisma } from "@/configs/db";
import { env } from "@/configs/env";
import { resend } from "@/utils/resendClient";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const verifyLink = `${env.FRONTEND_URL}/verify-email?email=${user.email}&token=${token}`;

      await resend.emails.send({
        from: "LMS <noreply@akgbytes.com>",
        to: [user.email],
        subject: "Verify your email",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <title>Verify Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:30px;">
          <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; padding:40px; text-align:center; border:1px solid #eee;">
            
            <!-- Logo -->
            <div style="margin-bottom:20px;">
              <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" width="50" alt="logo" />
            </div>

            <!-- Title -->
            <h2 style="color:#333; margin-bottom:20px;">Verify Email</h2>

            <!-- Greeting -->
            <p style="color:#555; font-size:15px;">Hello ${
              user.name || user.email
            },</p>
            <p style="color:#555; font-size:15px;">Click the button below to verify your email address.</p>

            <!-- Button -->
            <a href="${verifyLink}" 
              style="display:inline-block; margin-top:20px; padding:12px 20px; background-color:#000; color:#fff; 
                     text-decoration:none; border-radius:5px; font-weight:bold;">
              Verify Email
            </a>

            
          </div>
        </body>
        </html>
      `,
      });
    },
    afterEmailVerification: async (user, request) => {
      console.log(`${user.email} has verified their email!`);
    },
  },

  advanced: {
    cookies: {
      session_token: {
        name: "lms_session",
      },
    },
    defaultCookieAttributes: { sameSite: "None", secure: true, httpOnly: true },
    useSecureCookies: true,
  },

  session: {
    cookieCache: { enabled: true, maxAge: 10 * 60 },
  },

  trustedOrigins: [env.FRONTEND_URL],

  rateLimit: {
    enabled: true,
    window: 60, // time window in seconds
    max: 50, // max requests in the window
    customRules: {
      "/sign-in/email-otp": {
        window: 60,
        max: 3,
      },
    },
  },

  plugins: [admin()],
});
