export class ApiResponse<T> {
  public readonly success: boolean;

  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly data: T,
    public readonly meta?: Record<string, unknown>
  ) {
    this.success = statusCode < 400;
  }
}
