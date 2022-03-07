import { IFollow } from "./follow.type";
import { IPaginate } from "./paginate.type";
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

export interface IUserFollow {
  followerId: number;
  followingId: number;
  following: Pick<IUser, "id" | "email" | "name">;
  follower: Pick<IUser, "id" | "email" | "name">;
}

export interface IUserFollowResponse {
  paginate: IPaginate;
  data: IUserFollow[];
}
