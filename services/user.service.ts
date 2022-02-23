import AdapterService from "./adapterService.service";

export default class UserService extends AdapterService {
  constructor() {
    super();
  }

  async getNewUsers() {
    try {
      return this.sendGetRequest("/users");
    } catch (error: any) {
      throw new Error("UserService.login: " + error?.message);
    }
  }
}
