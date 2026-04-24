import type { JSX } from "react";

export interface MenuItem {
  oid: string;
  title: string;
  icon?: string;
  depth: number;
  path?: string;
  submenu?: MenuItem[];
  allowNavigation?: boolean;
}

export interface MenuType {
  oid: string;
  title: string;
  icon?: string;
  depth: number;
  parentId: string;
  path?: string;
  sortRef?: number;
  allowNavigation?: boolean;
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
