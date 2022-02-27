import { IUser } from "./user.type";

export interface IFollow {
  followerId: number;
  followingId: number;
  follower: IUser;
}
