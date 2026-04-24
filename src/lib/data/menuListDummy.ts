import type { MenuType } from "@/types/menu";

const ROOT_ID = "0";

/** 1·2·3 뎁스 사이드 메뉴용 flat 더미 (parentId로 계층 구성, buildMenuTree로 트리 변환)
 *
 * rolesDummy와 매칭되어 역할에 따라 메뉴가 표시됩니다.
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
    oid: "menu-1-file-management",
    title: "파일 관리",
    icon: "IconMenu02",
    depth: 1,
    parentId: ROOT_ID,
    path: "/file-management",
    sortRef: 11,
  },
  {
    oid: "menu-1-chat",
    title: "채팅",
    icon: "IconMenu02",
    depth: 1,
    parentId: ROOT_ID,
    path: "/chat",
    sortRef: 12,
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
  {
    oid: "menu-1-component",
    title: "컴포넌트",
    icon: "IconMenu04",
    depth: 1,
    parentId: ROOT_ID,
    path: "/component",
    sortRef: 30,
  },
  {
    oid: "menu-1-settings",
    title: "설정",
    icon: "IconMenu05",
    depth: 1,
    parentId: ROOT_ID,
    path: "/settings",
    sortRef: 40,
  },

  // ----- 2뎁스 (샘플 메뉴 하위) -----
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
    oid: "menu-2-sample-sample",
    title: "1-2.샘플페이지",
    icon: "IconMenu07",
    depth: 2,
    parentId: "menu-1-sample",
    path: "/sample/1-2",
    sortRef: 23,
  },

  // ----- 3뎁스 (1-2.샘플페이지 하위) -----
  {
    oid: "menu-3-sample-sub1",
    title: "1-2-1.서브페이지",
    depth: 3,
    parentId: "menu-2-sample-sample",
    path: "/sample/1-2/sub1",
    sortRef: 24,
  },
  {
    oid: "menu-3-sample-sub2",
    title: "1-2-2.서브페이지",
    depth: 3,
    parentId: "menu-2-sample-sample",
    path: "/sample/1-2/sub2",
    sortRef: 25,
  },

  // ----- 2뎁스 (컴포넌트 하위) -----
  {
    oid: "menu-2-atoms",
    title: "Atoms",
    depth: 2,
    parentId: "menu-1-component",
    path: "/component/atoms",
    sortRef: 31,
  },
  {
    oid: "menu-2-molecules",
    title: "Molecules",
    depth: 2,
    parentId: "menu-1-component",
    path: "/component/molecules",
    sortRef: 32,
  },

  // ----- 2뎁스 (설정 하위) -----
  {
    oid: "menu-2-user-settings",
    title: "사용자 설정",
    depth: 2,
    parentId: "menu-1-settings",
    path: "/settings/user",
    sortRef: 41,
  },
  {
    oid: "menu-2-system-settings",
    title: "시스템 설정",
    depth: 2,
    parentId: "menu-1-settings",
    path: "/settings/system",
    sortRef: 42,
  },
];
