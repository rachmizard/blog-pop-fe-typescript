import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { UserService } from "services";

type FollowUser = {
  userId: any;
};

const userService = new UserService();

const useUserQuery = (queryKey: any[] = [], params = {}) => {
  return useQuery(
    ["new-users", ...queryKey],
    () => userService.getNewUsers(params),
    {
      keepPreviousData: true,
      staleTime: Infinity,
      select: (data) => data.data,
    }
  );
};

const useFetchUserFollowsQuery = (queryKey: any[] = [], queryParams = {}) => {
  return useQuery(
    ["follows", queryKey],
    () => userService.getFollows(queryParams),
    {
      keepPreviousData: true,
      staleTime: Infinity,
      select: (data) => data.data,
    }
  );
};

const useFetchDetailUserQuery = (id: number) => {
  return useQuery(["user-detail", id], () => userService.getDetailUser(id), {
    keepPreviousData: true,
    staleTime: Infinity,
    select: (data) => data.data,
  });
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

export {
  useUserQuery,
  useFetchUserFollowsQuery,
  useFollowUserMutation,
  useUnFollowUserMutation,
  useFetchDetailUserQuery,
};
