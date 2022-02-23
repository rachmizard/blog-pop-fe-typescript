import AdapterService from "./adapterService.service";

export default class PostService extends AdapterService {
  constructor() {
    super();
  }

  async getPosts(params = {}) {
    try {
      return this.sendGetRequest("/posts", params);
    } catch (error: any) {
      throw new Error("PostService.login: " + error?.message);
    }
  }

  async createPost(body = {}) {
    try {
      return this.sendPostRequest("/posts", body);
    } catch (error: any) {
      throw new Error("PostService.login: " + error?.message);
    }
  }
}
