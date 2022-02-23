import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { PostService } from "services";
import { ICreatePostVariables, IResponsePosts } from "types/post.type";

const postService = new PostService();

const useFetchPosts = (params = {}) => {
  return useQuery<AxiosResponse<IResponsePosts>, Error>(["posts", params], () =>
    postService.getPosts(params)
  );
};

const useCreatePostMutation = () => {
  return useMutation<AxiosResponse, Error, ICreatePostVariables>((args) =>
    postService.createPost(args)
  );
};

export { useFetchPosts, useCreatePostMutation };
