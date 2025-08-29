import { generateReactHelpers } from "@uploadthing/react";
import { BASE_URL } from "./constants";

export const { useUploadThing, uploadFiles } = generateReactHelpers<any>({
  url: `${BASE_URL}/uploadthing`,
});
