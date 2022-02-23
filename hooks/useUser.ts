import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { UserService } from "services";
import { IResponseUsers } from "./types/useUser.type";

const userService = new UserService();

const useUserQuery = (params = {}) => {
  return useQuery<AxiosResponse<IResponseUsers>, Error>(["new-users"], () =>
    userService.getNewUsers(params)
  );
};

export { useUserQuery };
