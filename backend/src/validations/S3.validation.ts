import * as z from "zod";

const uploadFileSchema = z.object({
  fileName: z.string().min(1, { error: "" }),
  contentType: z.string().min(1, { error: "required" }),
  size: z.number().min(1, { error: "required" }),
  isImage: z.boolean(),
});

export const validateUploadFile = (data: unknown) => {
  return uploadFileSchema.safeParse(data);
};

const deleteFileSchema = z.object({
  key: z.string(),
});

export const validateDeleteFile = (data: unknown) => {
  return deleteFileSchema.safeParse(data);
};
