import type { MenuType } from "@/types/menu";

export let M: MenuType[] = [];

export const MenuSet = (Menu: MenuType[]) => {
  M = Menu;
};
