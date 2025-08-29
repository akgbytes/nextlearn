import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new ApiError(401, "Unauthorized");
  if (req.user.role !== "admin") throw new ApiError(403, "Forbidden");

  next();
});
