import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import type { IAuthState } from "./auth.types";

const { persistAtom } = recoilPersist({
  key: "auth",
});

const authAtom = atom<IAuthState>({
  key: "auth-user",
  default: {
    isAuthenticated: false,
    accessToken: "",
    user: {
      createdAt: "",
      email: "",
      hashedToken: "",
      id: 0,
      name: "",
      role: "",
      salt: "",
      updatedAt: "",
      posts: [],
      followedBy: [],
      following: [],
    },
  },
  effects_UNSTABLE: [persistAtom],
});

export { authAtom };
