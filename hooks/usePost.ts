import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { PostService } from "services";
import {
  ICreatePostCommentVariables,
  ICreatePostVariables,
  IPost,
  IResponsePosts,
} from "types/post.type";

const postService = new PostService();

const useFetchPosts = (params = {}) => {
  return useQuery<AxiosResponse<IResponsePosts>, Error>(
    ["posts", params],
    () => postService.getPosts(params),
    {
      staleTime: Infinity,
    }
  );
};

const useFetchDetailPost = (id: string) => {
  return useQuery<AxiosResponse<IPost>>(["post", id], () =>
    postService.getPost(id)
  );
};

const useCreatePostMutation = () => {
  return useMutation<AxiosResponse, Error, ICreatePostVariables>((args) =>
    postService.createPost(args)
  );
};

const useCreatePostCommentMutation = (postId: number) => {
  return useMutation<AxiosResponse, Error, ICreatePostCommentVariables>(
    (args) => postService.createPostComment(postId, args)
  );
};

export {
  useFetchPosts,
  useFetchDetailPost,
  useCreatePostMutation,
  useCreatePostCommentMutation,
};
