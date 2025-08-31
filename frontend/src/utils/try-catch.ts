import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type Success<T> = {
  data: T;
  error: null;
};

type Failure = {
  data: null;
  error: FetchBaseQueryError | SerializedError;
};

type Result<T> = Success<T> | Failure;

export async function tryCatch<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error as FetchBaseQueryError | SerializedError,
    };
  }
}
