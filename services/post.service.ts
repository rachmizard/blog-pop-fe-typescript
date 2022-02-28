import { AxiosResponse } from "axios";
import {
  ICreatePostCommentVariables,
  IPost,
  IResponsePosts,
} from "types/post.type";
import AdapterService from "./adapterService.service";

export default class PostService extends AdapterService {
  constructor() {
    super();
  }

  async getPosts(params = {}): Promise<AxiosResponse<IResponsePosts>> {
    try {
      return this.sendGetRequest("/posts", params);
    } catch (error: any) {
      throw new Error("PostService.getPosts: " + error?.message);
    }
  }

  async getPost(id: string): Promise<AxiosResponse<IPost>> {
    try {
      return this.sendGetRequest("/posts/" + id);
    } catch (error: any) {
      throw new Error("PostService.getPost: " + error?.message);
    }
  }

  async createPost(body = {}) {
    try {
      return this.sendPostRequest("/posts", body);
    } catch (error: any) {
      throw new Error("PostService.createPost: " + error?.message);
    }
  }

  async createPostComment(postId: number, body: ICreatePostCommentVariables) {
    try {
      return this.sendPostRequest("/posts/" + postId, body);
    } catch (error: any) {
      throw new Error("PostService.createPostComment: " + error?.message);
    }
  }
}
