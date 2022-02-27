import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { UserService } from "services";
import { IResponseUsers } from "./types/useUser.type";

type FollowUser = {
  userId: any;
};

const userService = new UserService();

const useUserQuery = (params = {}) => {
  return useQuery<AxiosResponse<IResponseUsers>, Error>(["new-users"], () =>
    userService.getNewUsers(params)
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
