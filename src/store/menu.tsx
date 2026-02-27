import { atom, selector } from "recoil";
import type { MenuType, Tab, TabSelect } from "@/types/menu";

export let M: MenuType[] = [];

export const MenuSet = (Menu: MenuType[]) => {
  M = Menu;
};


export const menuState = atom<MenuType[]>({
  key: `menu`,
  default: [],
});

export const openTabsState = atom<Tab[]>({
  key: `openTabs`,
  default: [],
});

export const selectedMenuState = atom<string>({
  key: `selectedMenu`,
  default: "",
});

export const selectedMenuSelector = selector({
  key: `selectedMenuSelector`,
  get: ({ get }) => {
    return get(selectedMenuState);
  },
  set: ({ get, set }, newValue: Object) => {
    const { id, isClose } = newValue as TabSelect;
    const openTabs: Tab[] = get(openTabsState);
    const menuList: MenuType[] = get(menuState);
    const preMenuId: string = get(selectedMenuState);

    if (isClose) {
      const { chagedId, deletedMenuList } = closeTab(openTabs, id, preMenuId);
      set(selectedMenuState, chagedId);
      set(openTabsState, deletedMenuList);
    } else {
      const tmpOpenTabs = openTab(M, openTabs, id);
      set(selectedMenuState, id);
      set(openTabsState, tmpOpenTabs);
    }
  },
});

function closeTab(openTabs: Tab[], id: string, preMenuId: string) {
  let chagedId = preMenuId;
  let deletedMenuList = openTabs.filter((menu: Tab) => {
    return menu.id !== id;
  });

  if (id === preMenuId && deletedMenuList.length > 0) {
    chagedId = deletedMenuList[deletedMenuList.length - 1].id;
    deletedMenuList[deletedMenuList.length - 1] = {
      ...deletedMenuList[deletedMenuList.length - 1],
      isSelected: true,
    };
  }

  if (deletedMenuList.length === 0) chagedId = "";

  return { chagedId, deletedMenuList };
}

function openTab(menuList: MenuType[], openTabs: Tab[], id: string) {
  let isUse: boolean = false;
  const selectedMenu: MenuType | undefined = menuList.find(
    (menu: MenuType) => menu.oid === id
  );

  // 메뉴를 찾을 수 없는 경우 빈 탭 리스트 반환
  if (!selectedMenu) {
    console.warn(`Menu with id "${id}" not found`);
    return openTabs.map((tab: Tab) => ({ ...tab, isSelected: false }));
  }

  // 이미 탭에 들어가 있다면 isSelected만 추가
  let tmpOpenTabs = openTabs.map((tab: Tab) => {
    const tmpTab = { ...tab };
    if (tmpTab.id === id) {
      isUse = true;
      return { ...tab, isSelected: true };
    }
    tmpTab.isSelected = false;
    return { ...tab, isSelected: false };
  });

  // 없다면 리스트에 새로 추가
  if (!isUse) {
    tmpOpenTabs = [
      ...tmpOpenTabs,
      {
        id: id,
        menuName: selectedMenu.title || "",
        path: selectedMenu.path || "",
        isSelected: true,
      },
    ];
  }
  return tmpOpenTabs;
}
