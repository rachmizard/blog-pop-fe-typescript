import { AxiosResponse } from "axios";
import { IResponseUsers } from "hooks/types/useUser.type";
import AdapterService from "./adapterService.service";

export default class UserService extends AdapterService {
  constructor() {
    super();
  }

  async getNewUsers(params = {}): Promise<AxiosResponse<IResponseUsers>> {
    try {
      return this.sendGetRequest("/users", params);
    } catch (error: any) {
      throw new Error("UserService.login: " + error?.message);
    }
  }

  async followUserById(userId: any) {
    try {
      return this.sendPostRequest("/follows/" + userId);
    } catch (error: any) {
      throw new Error("UserService.followUserById: " + error?.message);
    }
  }

  async unfollowUserById(userId: any) {
    try {
      return this.sendDeleteRequest("/follows/" + userId);
    } catch (error: any) {
      throw new Error("UserService.followUserById: " + error?.message);
    }
  }
}
