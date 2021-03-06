import { atom } from "recoil";
import { IPostState } from "./post.type";

const postAtom = atom<IPostState>({
  key: "post-likes",
  default: {
    likes: [],
  },
});

export { postAtom };
