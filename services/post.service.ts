import axios from "axios";
import AdapterService from "./adapterService.service";

export default class PostService extends AdapterService {
  constructor() {
    super();
  }

  async getPosts() {
    try {
      return this.sendGetRequest("/posts");
    } catch (error: any) {
      throw new Error("PostService.login: " + error?.message);
    }
  }
}
