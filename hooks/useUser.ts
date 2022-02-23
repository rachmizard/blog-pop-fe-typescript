import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { UserService } from "services";
import { IResponseUsers } from "./types/useUser.type";

const userService = new UserService();

const useUserQuery = () => {
  return useQuery<AxiosResponse<IResponseUsers>, Error>(
    ["new-users"],
    () => userService.getNewUsers(),
    {
      staleTime: Infinity,
    }
  );
};

export { useUserQuery };
