import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";

import { AuthService } from "services";
import {
  IAuthRegisterVariables,
  IAuthLoginVariables,
} from "store/auth/auth.types";

const authService = new AuthService();

const useGetProfile = () => {
  return useQuery<AxiosResponse<any>, Error>(
    ["profile"],
    () => authService.getProfile(),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
};

const useAuthLoginMutation = () => {
  const { mutate, isLoading, isError, error } = useMutation(
    (args: IAuthLoginVariables) => authService.login(args.email, args.password)
  );

  return {
    mutate,
    isLoading,
    isError,
    error,
  };
};

const useAuthLogoutMutation = () => {
  const { mutate, isLoading, isError, error } = useMutation((args: any) =>
    authService.logout()
  );

  return {
    mutate,
    isLoading,
    isError,
    error,
  };
};

const useAuthRegisterMutation = () => {
  const { mutate, isLoading, isError, error } = useMutation(
    (args: IAuthRegisterVariables) => authService.register(args)
  );

  return {
    mutate,
    isLoading,
    isError,
    error,
  };
};

export {
  useGetProfile,
  useAuthLoginMutation,
  useAuthLogoutMutation,
  useAuthRegisterMutation,
};
