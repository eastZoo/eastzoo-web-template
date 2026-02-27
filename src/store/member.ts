import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import type { Member } from "@/types/member";
import { RECOIL_PERSIST_KEY } from "@/lib/constants/sharedStrings";

const { persistAtom } = recoilPersist({
  key: RECOIL_PERSIST_KEY,
});

export const memberState = atom<Member | null>({
  key: `member`,
  default: null,
  effects_UNSTABLE: [persistAtom],
});
