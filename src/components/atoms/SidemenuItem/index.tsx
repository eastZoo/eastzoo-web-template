import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./SidemenuItem.style";
import SidemenuList from "../../molecules/SidemenuList";
import { useSelectedMenu } from "@/store/menu";

/**
 * Figma Document 아이콘 컴포넌트 - stroke 스타일
 * 모든 메뉴에 동일한 Document 아이콘 사용
 * 아이콘 색상은 CSS color 속성으로 제어 (currentColor)
 */
const MenuIcon = () => {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 1H4C3.44772 1 3 1.44772 3 2V14C3 14.5523 3.44772 15 4 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 1V5H13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface SidemenuItemProps {
  data: any;
  isCollapsed?: boolean;
  onContextMenu: (event: React.MouseEvent, target: any) => void;
}

export const SidemenuItem = ({
  data,
  isCollapsed = false,
  onContextMenu,
}: SidemenuItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [submenu, setSubmenu] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [selectedMenuId, setMenu] = useSelectedMenu();

  const isMatch = () => {
    if (selectedMenuId && data.oid === selectedMenuId) {
      return true;
    }
    if (location.pathname === data.path) {
      return true;
    }
    if (!data.submenu) {
      return location.pathname === data.path;
    }
    return false;
  };

  const isActive = isMatch();

  useEffect(() => {
    if (!initialized) {
      const openMenu = (menu: any, path: string) => {
        if (!menu.submenu) return false;
        for (const subItem of menu.submenu) {
          if (path.startsWith(subItem.path)) {
            return true;
          }
          if (subItem.submenu && openMenu(subItem, path)) {
            return true;
          }
        }
        return false;
      };
      if (openMenu(data, location.pathname)) {
        setSubmenu(true);
      }

      setInitialized(true);
    }
  }, [location.pathname, data]);

  const submenuToggle = () => {
    setSubmenu(!submenu);
  };

  const handleMenuClick = () => {
    if (data.path) {
      navigate(data.path);
      setMenu({ id: data.oid });
    }
  };

  const handleSubmenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In collapsed mode, navigate directly if there's a path
    if (isCollapsed && data.path) {
      handleMenuClick();
      return;
    }
    submenuToggle();
    if (data.allowNavigation && data.path) {
      handleMenuClick();
    }
  };

  // In collapsed mode, only show depth 1 items
  if (isCollapsed && data.depth !== 1) {
    return null;
  }

  return (
    <S.SidemenuItemBox
      $submenuToggle={submenu}
      $menuActive={isActive}
      $isCollapsed={isCollapsed}
      onContextMenu={(e) => onContextMenu(e, data.path)}
    >
      {data.submenu && !isCollapsed ? (
        <>
          <S.ItemWrapper $isCollapsed={isCollapsed}>
            <S.SidemenuListItem
              $depth={data.depth}
              $menuActive={isActive}
              $isCollapsed={isCollapsed}
              onClick={handleSubmenuClick}
            >
              <S.SidemenuItemTit $isCollapsed={isCollapsed}>
                {data.depth === 1 && <MenuIcon />}
                {data.depth !== 1 && !isCollapsed && (
                  <S.BulletPoint>•</S.BulletPoint>
                )}
                <S.TitBox $isCollapsed={isCollapsed}>{data.title}</S.TitBox>
              </S.SidemenuItemTit>
              {data.depth === 1 && data.submenu && !isCollapsed && (
                <S.ArrowIcon $open={submenu} $isCollapsed={isCollapsed} aria-hidden>
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </S.ArrowIcon>
              )}
            </S.SidemenuListItem>
            {isCollapsed && (
              <S.ItemTooltip>{data.title}</S.ItemTooltip>
            )}
          </S.ItemWrapper>
          <SidemenuList
            depth={data.depth + 1}
            menuList={data.submenu}
            isCollapsed={isCollapsed}
            onContextMenu={onContextMenu}
          />
        </>
      ) : (
        <S.ItemWrapper $isCollapsed={isCollapsed}>
          <S.SidemenuListItem
            key={data.path}
            $depth={data.depth}
            $menuActive={isActive}
            $isCollapsed={isCollapsed}
            onClick={handleMenuClick}
          >
            <S.SidemenuItemTit $isCollapsed={isCollapsed}>
              {data.depth === 1 && <MenuIcon />}
              {data.depth !== 1 && !isCollapsed && (
                <S.BulletPoint>•</S.BulletPoint>
              )}
              <S.TitBox $isCollapsed={isCollapsed}>{data.title}</S.TitBox>
            </S.SidemenuItemTit>
          </S.SidemenuListItem>
          {isCollapsed && (
            <S.ItemTooltip>{data.title}</S.ItemTooltip>
          )}
        </S.ItemWrapper>
      )}
    </S.SidemenuItemBox>
  );
};
