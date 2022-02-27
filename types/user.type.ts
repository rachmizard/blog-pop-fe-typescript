import { IFollow } from "./follow.type";
import { IPost } from "./post.type";

export type RoleEnums = "USER" | "ADMIN" | "";

export interface IUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  hashedToken: string;
  salt: string;
  role: RoleEnums;
  posts?: IPost[];
  followedBy?: IFollow[];
  following?: IFollow[];
}
