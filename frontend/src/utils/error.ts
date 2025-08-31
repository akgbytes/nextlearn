import type { SerializedError } from "@reduxjs/toolkit";
import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { enqueueSnackbar } from "notistack";

type ApiErrorResponse = {
  statusCode: number;
  message: string;
  data: any;
  success: boolean;
};

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export function handleApiError(
  error: FetchBaseQueryError | SerializedError | null
) {
  if (!error) return;
  console.log("Error handler: ", error);
  if (isFetchBaseQueryError(error)) {
    const errMsg =
      "error" in error ? error.error : (error.data as ApiErrorResponse).message;
    enqueueSnackbar(errMsg, { variant: "error" });
  } else if (isErrorWithMessage(error)) {
    enqueueSnackbar(error.message, { variant: "error" });
  }
}
