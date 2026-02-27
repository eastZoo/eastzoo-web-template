import type { MenuType } from "@/types/menu";

const ROOT_ID = "0";

/** 1·2·3 뎁스 사이드 메뉴용 flat 더미 (parentId로 계층 구성, buildMenuTree로 트리 변환)
 *
 * permissionDummy와 매칭되어 권한에 따라 메뉴가 표시됩니다.
 */
export const menuListDummy: MenuType[] = [
  // ----- 1뎁스 -----
  {
    oid: "menu-1-main",
    title: "대시보드",
    icon: "IconMenu02",
    depth: 1,
    parentId: ROOT_ID,
    path: "/",
    sortRef: 10,
  },
  {
    oid: "menu-1-sample",
    title: "1.샘플 메뉴",
    icon: "IconMenu03",
    depth: 1,
    parentId: ROOT_ID,
    path: "/sample",
    sortRef: 20,
  },

  // ----- 2뎁스 (키 관리 하위) -----

  {
    oid: "menu-2-sample-info",
    title: "1-1.샘플페이지",
    icon: "IconMenu06",
    depth: 2,
    parentId: "menu-1-sample",
    path: "/sample/1-1",
    sortRef: 22,
  },
  {
    oid: "menu-2-sample-create",
    title: "1-2.샘플페이지",
    icon: "IconMenu05",
    depth: 2,
    parentId: "menu-1-sample",
    path: "/sample/1-2",
    sortRef: 23,
  },
];
