import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { PostService } from "services";
import {
  ICreatePostCommentVariables,
  ICreatePostVariables,
} from "types/post.type";

const postService = new PostService();

const useFetchPosts = (params = {}) => {
  return useQuery(["posts", params], () => postService.getPosts(params), {
    staleTime: Infinity,
    keepPreviousData: true,
    getNextPageParam: (data) => console.log(data),
    select: (data) => data.data,
  });
};

const useFetchDetailPost = (id: string) => {
  return useQuery(["post", id], () => postService.getPost(id));
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
