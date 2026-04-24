import * as S from "./Sidemenu.style";
import type { MenuItem, MenuType } from "@/types/menu";
import { useMemo } from "react";
import { SidemenuTop } from "../../atoms/SidemenuTop";
import SidemenuList from "../SidemenuList";
import { SidemenuFooter } from "../../atoms/SidemenuFooter";
import { menuListDummy } from "@/lib/data/menuListDummy";
import { buildMenuTree } from "@/lib/utils/buildMenuTree";
import { currentUserRole, canViewMenu } from "@/lib/data/rolesDummy";

interface SidemenuProps {
  isCollapsed?: boolean;
  asideToggle?: () => void;
  onContextMenu: (event: React.MouseEvent, target: any) => void;
  onLogout: () => void;
}

export const Sidemenu = ({
  isCollapsed = false,
  asideToggle,
  onContextMenu,
  onLogout,
}: SidemenuProps) => {
  /**
   * 역할 기반 메뉴 필터링
   * - rolesDummy의 현재 사용자 역할에 따라 canView가 true인 메뉴만 표시
   */
  const filterMenuByRole = (menuList: MenuItem[]): MenuItem[] => {
    const filterSubmenu = (items: MenuItem[]): MenuItem[] => {
      return items
        .filter((item) => canViewMenu(currentUserRole, item.oid))
        .map((item) => ({
          ...item,
          submenu: item.submenu ? filterSubmenu(item.submenu) : undefined,
        }))
        .filter((item) => {
          // 하위 메뉴가 있었는데 전부 필터링된 경우 상위 메뉴도 숨김
          if (item.submenu && item.submenu.length === 0) {
            return false;
          }
          return true;
        });
    };

    return filterSubmenu(menuList);
  };

  const menuTree = useMemo(
    () => filterMenuByRole(buildMenuTree([...menuListDummy])),
    []
  );

  return (
    <S.SidemenuSection $isCollapsed={isCollapsed}>
      <SidemenuTop isCollapsed={isCollapsed} asideToggle={asideToggle} />
      <SidemenuList
        menuList={menuTree}
        onContextMenu={onContextMenu}
        isCollapsed={isCollapsed}
      />
      <SidemenuFooter isCollapsed={isCollapsed} onLogout={onLogout} />
    </S.SidemenuSection>
  );
};
