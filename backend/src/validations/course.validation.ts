import { CourseLevel, CourseStatus } from "@/generated/prisma/enums";
import * as z from "zod";

export const createCourseSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Title must be at least 3 characters long" })
    .max(100, { error: "Title must be at most 100 characters long" }),

  description: z
    .string()
    .min(50, { error: "Description must be at least 50 characters long" }),

  shortDescription: z
    .string()
    .min(25, {
      error: "Short description must be at least 25 characters long",
    })
    .max(250, {
      error: "Short description must be at most 250 characters long",
    }),

  thumbnailUrl: z.string().min(1, { error: "Thumbnail is required" }),

  price: z.coerce
    .number<number>()
    .min(0, { error: "Price must be not be negative" }),

  duration: z.coerce
    .number<number>()
    .min(1, { error: "Duration must be at least 1 hour" })
    .max(500, { error: "Duration must be at most 500 hours" }),

  category: z.string().min(1, { error: "Category is required" }),

  slug: z
    .string()
    .min(3, { error: "Slug must be at least 3 characters long" })
    .regex(/^[a-z0-9-]+$/, {
      error: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),

  level: z.enum(CourseLevel, {
    error: (issue) =>
      `Invalid level, Expected ${Object.values(CourseLevel).join(
        " | "
      )}, Received ${issue.input}`,
  }),

  status: z.enum(CourseStatus, {
    error: (issue) =>
      `Invalid level, Expected ${Object.values(CourseStatus).join(
        " | "
      )}, Received ${issue.input}`,
  }),
});

export const editCourseSchema = createCourseSchema.partial();

export const validateCreateCourse = (data: unknown) =>
  createCourseSchema.safeParse(data);

export const validateEditCourse = (data: unknown) =>
  editCourseSchema.safeParse(data);
