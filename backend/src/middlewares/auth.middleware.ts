import { User } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { fromNodeHeaders } from "better-auth/node";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) throw new ApiError(401, "Unauthorized");

  req.user = session.user as User;
  next();
});
