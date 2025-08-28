import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing, uploadFiles } = generateReactHelpers<any>({
  url: "http://localhost:8080/api/uploadthing",
});
