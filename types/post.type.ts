import { IPaginate } from "./paginate.type";

export interface IPost {
  id: number;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  title: string;
  content: string;
  authorId: number;
  author?: IAuthorPost;
  postComment: IPostComment[];
}

export interface IPostComment {
  id: number;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  title: string;
  content: string;
  authorId: number;
  author?: IAuthorPost;
  postCommentId?: any;
  postComments: IPostComment[];
}

interface IAuthorPost {
  id: number;
  name: string;
  email: string;
}
export interface ICreatePostVariables {
  title: string;
  content: string;
  published: true;
}

export interface IResponsePosts {
  paginate: IPaginate;
  data: IPost[];
}

export interface ICreatePostCommentVariables {
  content: string;
}
