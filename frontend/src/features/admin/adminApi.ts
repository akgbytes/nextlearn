import { api } from "@/app/api";
import { BASE_URL } from "@/lib/constants";
import type { CourseFormValues } from "@/pages/admin/CreateCourse";
import type { ApiResponse, Course } from "@/types";
import type { data } from "react-router";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteFile: builder.mutation<
      ApiResponse<null>,
      {
        key: string;
      }
    >({
      query: ({ key }) => ({
        url: `${BASE_URL}/uploadthing/file/${key}`,
        method: "DELETE",
      }),
    }),

    createCourse: builder.mutation<ApiResponse<Course>, CourseFormValues>({
      query: (data) => ({
        url: `${BASE_URL}/courses`,
        method: "POST",
        body: data,
      }),
    }),

    updateCourse: builder.mutation<
      ApiResponse<Course>,
      CourseFormValues & { id: string }
    >({
      query: ({ id, ...data }) => ({
        url: `${BASE_URL}/courses/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    getCourses: builder.query<ApiResponse<Course[]>, void>({
      query: () => ({
        url: `${BASE_URL}/courses`,
        method: "GET",
      }),
    }),

    getCourse: builder.query<ApiResponse<Course>, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_URL}/courses/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useDeleteFileMutation,
  useCreateCourseMutation,
  useGetCoursesQuery,
  useGetCourseQuery,
  useLazyGetCourseQuery,
  useUpdateCourseMutation,
} = adminApi;
