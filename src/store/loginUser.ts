import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { RECOIL_PERSIST_KEY } from "@/lib/constants/sharedStrings";
import type { User } from "@/types/User";

const { persistAtom } = recoilPersist({
  key: RECOIL_PERSIST_KEY,
});

const userInfo = (): User | null => {
  const info = localStorage.getItem("user");
  return info ? JSON.parse(info) : null;
};

export const userState = atom<User | null>({
  key: `user`,
  default: userInfo(),
  effects_UNSTABLE: [persistAtom],
});
