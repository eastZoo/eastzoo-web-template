import type { MenuType } from "@/types/menu";

export function buildMenuTree(flatList: MenuType[]) {
  const map = new Map<string, any>();
  const roots: any[] = [];

  // 정렬 보장
  flatList.sort((a, b) => (a.sortRef ?? 0) - (b.sortRef ?? 0));

  // 1단계: 초기 구조 생성
  for (const item of flatList) {
    const menuItem = {
      id: item.oid,
      oid: item.oid,
      title: item.title,
      // 실제 렌더링은 SidemenuItem에서 icon key(string) 기반으로 처리
      icon: item.icon,
      depth: item.depth,
      path: item.path,
      allowNavigation: item.allowNavigation,
      submenu: [],
    };
    map.set(item.oid, menuItem);
  }

  // 2단계: 부모에 붙이기
  for (const item of flatList) {
    const current = map.get(item.oid);
    if (!item.parentId || item.parentId === "0") {
      roots.push(current);
    } else {
      const parent = map.get(item.parentId);
      if (parent) {
        parent.submenu.push(current);
      }
    }
  }

  // 빈 submenu 제거
  const pruneEmptySubmenu = (items: any[]) => {
    for (const item of items) {
      if (item.submenu.length > 0) {
        pruneEmptySubmenu(item.submenu);
      } else {
        delete item.submenu;
      }
    }
  };

  pruneEmptySubmenu(roots);

  return roots;
}
