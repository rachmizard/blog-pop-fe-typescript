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

export interface IAuthLoginVariables {
  email: string;
  password: string;
}

export interface IAuthRegisterVariables {
  email: string;
  password: string;
  name: string;
}
