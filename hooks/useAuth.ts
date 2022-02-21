import { useMutation } from "react-query";

import { AuthService } from "services";
import type { IAuthLoginVariables } from "./types/useAuth.type";

const authService = new AuthService();

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

export { useAuthLoginMutation, useAuthLogoutMutation };
