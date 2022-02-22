export type RoleEnums = "USER" | "ADMIN";

export interface IUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: RoleEnums;
  posts: [];
}
