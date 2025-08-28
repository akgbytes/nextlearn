export interface BaseResponse {
  message: string;
  code: number;
  success: boolean;
}

export interface ApiResponse<T> extends BaseResponse {
  data: T;
}
