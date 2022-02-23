import AdapterService from "./adapterService.service";

export default class UserService extends AdapterService {
  constructor() {
    super();
  }

  async getNewUsers(params = {}) {
    try {
      return this.sendGetRequest("/users", params);
    } catch (error: any) {
      throw new Error("UserService.login: " + error?.message);
    }
  }
}
