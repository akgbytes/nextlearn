import { prisma } from "@/configs/db";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { handleZodError } from "@/utils/handleZodError";
import { omitUndefined } from "@/utils/omitUndefined";
import {
  validateCreateCourse,
  validateEditCourse,
} from "@/validations/course.validation";

export const createCourse = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const payload = handleZodError(validateCreateCourse(req.body));

  const newCourse = await prisma.course.create({
    data: { ...payload, userId: user.id },
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Course created successfully", newCourse));
});

export const updateCourse = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const { id: courseId } = req.params;
  if (!courseId) throw new ApiError(400, "Course ID is required");

  const payload = handleZodError(validateEditCourse(req.body));

  const updatePayload = omitUndefined(payload);

  if (Object.keys(updatePayload).length === 0) {
    throw new ApiError(400, "At least one field is required to update");
  }

  const updatedCourse = await prisma.course.update({
    where: { id: courseId },
    data: { ...updatePayload },
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Course updated successfully", updatedCourse));
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

export const getCourse = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const { id: courseId } = req.params;

  if (!courseId) {
    throw new ApiError(400, "Course ID is required");
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Course fetched successfully", course));
});

const example = asyncHandler(async (req, res) => {});
