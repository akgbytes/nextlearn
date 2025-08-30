export const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;
export const fallbackAvatarUrl = (name: string) =>
  `https://avatar.vercel.sh/${name}`;

export const UserRole = {
  admin: "admin",
  user: "user",
} as const;

export const CourseLevel = {
  beginner: "beginner",
  intermediate: "intermediate",
  advanced: "advanced",
} as const;

export const CourseStatus = {
  draft: "draft",
  published: "published",
  archieved: "archieved",
} as const;

export const CourseCategory = [
  "Development",
  "Business",
  "Finance",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching",
] as const;
