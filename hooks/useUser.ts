import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { UserService } from "services";
import { IResponseUsers } from "./types/useUser.type";

type FollowUser = {
  userId: any;
};

const userService = new UserService();

const useUserQuery = (queryKey: any[] = [], params = {}) => {
  return useQuery<AxiosResponse<IResponseUsers>, Error>(
    ["new-users", ...queryKey],
    () => userService.getNewUsers(params),
    {
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );
};

const useFollowUserMutation = () => {
  return useMutation<AxiosResponse, Error, FollowUser>((args) =>
    userService.followUserById(args.userId)
  );
};

const useUnFollowUserMutation = () => {
  return useMutation<AxiosResponse, Error, FollowUser>((args) =>
    userService.unfollowUserById(args.userId)
  );
};

export { useUserQuery, useFollowUserMutation, useUnFollowUserMutation };
