import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { PostService } from "services";
import { IResponsePosts } from "./types/usePost.type";

const postService = new PostService();

const useFetchPosts = () => {
  return useQuery<AxiosResponse<IResponsePosts>, Error>(["posts"], () =>
    postService.getPosts()
  );
};

export { useFetchPosts };
