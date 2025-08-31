import { api } from "@/app/api";
import { BASE_URL } from "@/lib/constants";
import type { CourseFormValues } from "@/pages/admin/CreateCourse";
import type { ApiResponse, Course } from "@/types";

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

    getCourses: builder.query<ApiResponse<Course[]>, void>({
      query: () => ({
        url: `${BASE_URL}/courses`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useDeleteFileMutation,
  useCreateCourseMutation,
  useGetCoursesQuery,
} = adminApi;
