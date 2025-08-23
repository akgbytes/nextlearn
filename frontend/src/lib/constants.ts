export const fallbackAvatarUrl = (name: string) =>
  `https://avatar.vercel.sh/${name}`;

export const courseLevel = ["Beginner", "Intermediate", "Advanced"];
export type CourseLevel = (typeof courseLevel)[number];

export const courseStatus = ["Draft", "Published", "Archieved"];
export type CourseStatus = (typeof courseStatus)[number];

export const courseCategories = [
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

export type CourseCategory = (typeof courseCategories)[number];
