import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

export const fileRouter = {
  courseUploader: f({
    image: { maxFileSize: "4MB" },
    pdf: { maxFileSize: "16MB" },
  }).onUploadComplete(({ file }) => {
    console.log("File uploaded:", file.ufsUrl);
  }),
} satisfies FileRouter;

export type FileRouterType = typeof fileRouter;
