import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { RECOIL_PERSIST_KEY } from "@/lib/constants/sharedStrings";

const { persistAtom } = recoilPersist({
  key: RECOIL_PERSIST_KEY,
});

export const logIdState = atom<number | null>({
  key: `logId`,
  default: null,
  effects_UNSTABLE: [persistAtom],
});
