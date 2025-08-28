import { api } from "@/app/api";
import { BASE_URL } from "@/lib/constants";
import type { ApiResponse } from "@/types/course";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<
      ApiResponse<{
        presignedUrl: string;
        key: string;
      }>,
      {
        fileName: string;
        contentType: string;
        size: number;
        isImage: boolean;
      }
    >({
      query: (data) => ({
        url: `${BASE_URL}/s3/upload`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = adminApi;
