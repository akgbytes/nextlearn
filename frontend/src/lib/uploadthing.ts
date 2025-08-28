import { generateUploadButton } from "@uploadthing/react";
import { type FileRoute } from "uploadthing/types";

type FileRouterType = {
  courseUploader: FileRoute<{
    input: undefined;
    output: null;
    errorShape: any;
  }>;
};

export const UploadButton = generateUploadButton({
  url: "https://your-server.com/api/uploadthing",
});
// ...
