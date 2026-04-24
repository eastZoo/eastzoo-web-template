import styled, { css } from "styled-components";
import { SidemenuListBox } from "../../molecules/SidemenuList/SidemenuList.style";

interface SidemenuItemProps {
  $depth?: number;
  $submenuToggle?: boolean;
  $menuActive?: boolean;
  $isCollapsed?: boolean;
}

export const SidemenuListItem = styled.div<SidemenuItemProps>`
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.15s ease;
  border-radius: 8px;
  /* Figma: --interaction/inactive */
  color: ${(props) => props.theme.colors.sidemenuTextNormal};
  background: transparent;

  svg {
    color: ${(props) => props.theme.colors.sidemenuTextNormal};
  }

  &:hover {
    background: ${(props) => props.theme.colors.sidemenuHover};
  }

  /* Depth 1 - Main menu items */
  ${(props) =>
    props.$depth === 1 &&
    css`
      height: 40px;
      padding: 10px 12px;
      font-size: 14px;
      letter-spacing: 0.203px;
      line-height: 1.429;
    `}

  /* Depth 2 - Submenu items */
  ${(props) =>
    props.$depth === 2 &&
    css`
      height: 40px;
      padding: 10px 12px 10px 44px;
      font-size: 14px;
    `}

  /* Depth 3 - Sub-submenu items */
  ${(props) =>
    props.$depth === 3 &&
    css`
      height: 36px;
      padding: 10px 12px 10px 56px;
      font-size: 13px;
    `}

  /* Collapsed mode - Depth 1 only */
  ${(props) =>
    props.$isCollapsed &&
    props.$depth === 1 &&
    css`
      justify-content: center;
      align-items: center;
      padding: 0;
      margin: 4px auto;
      height: 48px;
      width: 48px;
      border-radius: 12px;
    `}

  /* Active state - Figma design */
  ${(props) =>
    props.$menuActive &&
    css`
      /* Figma: --background/transparent/primary */
      background: ${props.theme.colors.sidemenuActive};
      /* Figma: --primary/normal for active text */
      color: ${props.theme.colors.sidemenuTextActive};
      font-weight: 600;

      svg {
        color: ${props.theme.colors.sidemenuTextActive};
      }

      &:hover {
        background: ${props.theme.colors.sidemenuActive};
      }
    `}
`;

export const SidemenuItemTit = styled.div<SidemenuItemProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  color: inherit;
  overflow: hidden;

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: inherit;
    transition: color 0.15s ease;
  }

  ${(props) =>
    props.$isCollapsed &&
    css`
      justify-content: center;
      width: 100%;
      height: 100%;

      svg {
        width: 20px;
        height: 20px;
      }
    `}
`;

export const TitBox = styled.div<{ $isCollapsed?: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${(props) =>
    props.$isCollapsed &&
    css`
      display: none;
    `}
`;

export const BulletPoint = styled.span`
  color: inherit;
  font-size: 10px;
  margin-right: 8px;
`;

export const ArrowIcon = styled.span<{ $open: boolean; $isCollapsed?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  color: inherit;
  font-size: 12px;
  ${(props) => props.$open && "transform: rotate(180deg);"}

  svg {
    width: 16px;
    height: 16px;
    display: block;
    color: inherit;
  }

  ${(props) =>
    props.$isCollapsed &&
    css`
      display: none;
    `}
`;

export const SidemenuItemBox = styled.li<SidemenuItemProps>`
  list-style: none;

  /* Collapsed mode centering */
  ${(props) =>
    props.$isCollapsed &&
    css`
      display: flex;
      justify-content: center;
    `}

  /* Submenu OPEN state */
  ${(props) =>
    props.$submenuToggle === true &&
    css`
      & > ${SidemenuListItem} {
        & > ${SidemenuItemTit} {
          font-weight: 600;
        }
      }

      & > ${SidemenuListBox} {
        max-height: 100svh;
        transition: max-height 0.3s ease-in-out;
        overflow: visible;
      }
    `}

  /* Submenu CLOSED state */
  ${(props) =>
    props.$submenuToggle === false &&
    css`
      & > ${SidemenuListBox} {
        max-height: 0px;
        transition: max-height 0.2s ease-in-out;
        overflow: hidden;
      }
    `}

  /* Active menu styling */
  ${(props) =>
    props.$menuActive === true &&
    css`
      & > ${SidemenuListItem} {
        background: ${props.theme.colors.sidemenuActive};
        color: ${props.theme.colors.sidemenuTextActive};

        & > ${SidemenuItemTit} {
          font-weight: 600;
        }

        svg {
          color: ${props.theme.colors.sidemenuTextActive};
        }
      }
    `}
`;

/* Tooltip for collapsed mode */
export const ItemTooltip = styled.div`
  position: absolute;
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
  background: ${(props) => props.theme.colors.gray800};
  color: ${(props) => props.theme.colors.white100};
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  z-index: 1000;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;

  &::before {
    content: "";
    position: absolute;
    left: -4px;
    top: 50%;
    transform: translateY(-50%);
    border: 4px solid transparent;
    border-right-color: ${(props) => props.theme.colors.gray800};
  }
`;

export const ItemWrapper = styled.div<{ $isCollapsed?: boolean }>`
  position: relative;
  width: 100%;

  ${(props) =>
    props.$isCollapsed &&
    css`
      display: flex;
      justify-content: center;
    `}

  &:hover ${ItemTooltip} {
    opacity: 1;
  }
`;
