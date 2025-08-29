import { api } from "@/app/api";
import { BASE_URL } from "@/lib/constants";
import type { ApiResponse } from "@/types/course";

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
  }),
});

export const { useDeleteFileMutation } = adminApi;
