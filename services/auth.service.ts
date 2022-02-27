import { IAuthRegisterVariables } from "store/auth/auth.types";
import AdapterService from "./adapterService.service";

export default class AuthService extends AdapterService {
  constructor() {
    super();
  }

  async getProfile() {
    try {
      return this.sendGetRequest("/auth/profile");
    } catch (error: any) {
      throw new Error("AuthService.getProfile: " + error?.message);
    }
  }

  async login(email: string, password: string) {
    try {
      return this.sendPostRequest("/auth/login", { email, password });
    } catch (error: any) {
      throw new Error("AuthService.login: " + error?.message);
    }
  }

  async register(body: IAuthRegisterVariables) {
    try {
      return this.sendPostRequest("/auth/register", body);
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
