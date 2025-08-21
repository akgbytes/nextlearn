export const UserRole = ["ADMIN", "USER"] as const;
export type UserRole = (typeof UserRole)[number];

export enum NodeEnv {
  Development = "development",
  Production = "production",
}
