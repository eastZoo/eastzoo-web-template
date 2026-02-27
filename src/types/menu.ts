import type { JSX } from "react";

export interface MenuItem {
  id: number;
  title: string;
  icon?: JSX.Element;
  depth: number;
  path?: string;
  submenu?: MenuItem[];
}

export interface MenuType {
  oid: string;
  title: string;
  icon?: string;
  depth: number;
  parentId: string;
  path?: string;
  sortRef?: number;
  allowNavigation?: boolean; // submenu가 있어도 경로 이동 허용 여부 (기본값: false)
}

export interface Tab {
  id: string;
  menuName: string;
  path: string;
  isSelected: boolean;
}

export interface TabSelect {
  id: string;
  isClose?: boolean;
}
