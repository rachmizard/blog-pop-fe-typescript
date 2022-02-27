import { IUser } from "types/user.type";

export interface IAuthState {
  isAuthenticated: boolean;
  accessToken: string;
  user: IUser;
  followingState: Number[];
}

export interface IAuthLoginVariables {
  email: string;
  password: string;
}

export interface IAuthRegisterVariables {
  email: string;
  password: string;
  name: string;
}
