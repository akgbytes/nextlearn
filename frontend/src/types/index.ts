import type { CourseLevel, CourseStatus, UserRole } from "@/lib/constants";

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export type CourseLevel = (typeof CourseLevel)[keyof typeof CourseLevel];
export type CourseStatus = (typeof CourseStatus)[keyof typeof CourseStatus];

export interface BaseResponse {
  message: string;
  code: number;
  success: boolean;
}

export interface ApiResponse<T> extends BaseResponse {
  data: T;
}

export type Course = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  shortDescription: string;
  thumbnailUrl: string;
  price: number;
  duration: number;
  category: string;
  slug: string;
  level: CourseLevel;
  status: CourseStatus;
  userId: string;
};
