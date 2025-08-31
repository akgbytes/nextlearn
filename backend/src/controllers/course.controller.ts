import { prisma } from "@/configs/db";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { handleZodError } from "@/utils/handleZodError";
import { validateCreateCourse } from "@/validations/course.validation";

export const createCourse = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const data = handleZodError(validateCreateCourse(req.body));

  const newCourse = await prisma.course.create({
    data: { ...data, userId: user.id },
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Course created successfully", newCourse));
});

export const getCourses = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  res
    .status(200)
    .json(new ApiResponse(200, "All courses fetched successfully", courses));
});

const example = asyncHandler(async (req, res) => {});
