import * as z from "zod";

export const courseFormSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Title must be at least 3 characters long" })
    .max(100, { error: "Title must be at most 100 characters long" }),

  description: z
    .string()
    .min(10, { error: "Description must be at least 50 characters long" }),

  shortDescription: z
    .string()
    .min(5, {
      error: "Short description must be at least 25 characters long",
    })
    .max(160, {
      error: "Short description must be at most 250 characters long",
    }),

  thumbnailUrl: z.string().min(1, { error: "Thumbnail is required" }),

  price: z.coerce
    .number<number>()
    .int()
    .positive({ error: "Price cannot be negative" }),

  duration: z.coerce
    .number<number>()
    .min(1, { error: "Duration must be at least 1 hour" })
    .max(300, { error: "Duration must be at most 500 hours" }),

  category: z.string().min(1, { error: "Category is required" }),

  slug: z
    .string()
    .min(3, { error: "Slug must be at least 3 characters long" })
    .regex(/^[a-z0-9-]+$/, {
      error: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),

  level: z.string().min(1, { error: "Level is required" }),

  status: z.string().min(1, { error: "Status is required" }),
});
