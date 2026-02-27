import { atom, selectorFamily } from "recoil";
import type { Permission } from "@/types/permission";

export const permissionsState = atom<any>({
  key: `permission`,
  default: null,
});

export const permissionSelector = selectorFamily({
  key: "permissionSelector",
  get:
    (pmsMenuName) =>
    ({ get }) => {
      const permissions = get(permissionsState);

      if (!permissions) {
        return undefined;
      }

      return permissions.find(
        (permission: any) => permission.pmsMenuName === pmsMenuName
      );
    },
});
