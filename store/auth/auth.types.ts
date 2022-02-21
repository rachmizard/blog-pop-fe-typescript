export interface IAuthState {
  isAuthenticated: boolean;
  accessToken: string;
  user?: IAuthUserState;
}

interface IAuthUserState {
  createdAt: string;
  email: string;
  hashedToken: string;
  id: number;
  name: string;
  role: string;
  salt: string;
  updatedAt: string;
}
