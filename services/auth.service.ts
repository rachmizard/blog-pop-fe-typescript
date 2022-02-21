import AdapterService from "./adapterService.service";

export default class AuthService extends AdapterService {
  constructor() {
    super();
  }

  async login(email: string, password: string) {
    try {
      return this.sendPostRequest("/auth/login", { email, password });
    } catch (error: any) {
      throw new Error("AuthService.login: " + error?.message);
    }
  }

  async logout() {
    try {
      return this.sendPostRequest("/auth/logout");
    } catch (error: any) {
      throw new Error("AuthService.login: " + error?.message);
    }
  }
}
