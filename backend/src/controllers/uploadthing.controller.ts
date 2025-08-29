import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi({});

export const deleteFileFromUploadThing = asyncHandler(async (req, res) => {
  const { key } = req.params;
  await utapi.deleteFiles(key as string);
  res.status(200).json(new ApiResponse(200, "File deleted successfully", null));
});
