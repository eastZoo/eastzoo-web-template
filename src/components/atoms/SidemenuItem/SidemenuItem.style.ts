import styled, { css } from "styled-components";
import { SidemenuListBox } from "../../molecules/SidemenuList/SidemenuList.style";

interface SidemenuItemProps {
  $depth?: number;
  $submenuToggle?: boolean;
  $menuActive?: boolean;
}

export const SidemenuListItem = styled.div<SidemenuItemProps>`
  display: flex;
  color: ${(props) => props.theme.colors.white100};
  font-weight: 500;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) => (props.$menuActive ? props.theme.colors.sidemenuActive : "transparent")};

  svg {
    path {
      fill: ${(props) => props.theme.colors.white100};
    }
  }

  &:hover {
    background: ${(props) => (props.$menuActive ? props.theme.colors.sidemenuActive : props.theme.colors.sidemenuHover)};
    color: ${(props) => props.theme.colors.white100};
    font-weight: 600;

    svg {
      path {
        fill: ${(props) => props.theme.colors.white100};
      }
    }
  }

  ${(props) =>
    props.$depth === 1 &&
    css`
      height: 44px;
      padding: 0 16px 0 20px;
      font-size: 1.5rem;
    `}

  ${(props) =>
    props.$depth === 2 &&
    css`
      height: 36px;
      padding: 0 16px 0 42px;
      font-size: 1.4rem;
    `}

    ${(props) =>
    props.$depth === 3 &&
    css`
      height: 36px;
      padding: 0 16px 0 56px;
      font-size: 1.4rem;
    `}
`;

export const SidemenuItemTit = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => props.theme.colors.white100};

  svg {
    path {
      fill: ${(props) => props.theme.colors.white100};
    }
  }
`;

export const TitBox = styled.div`
  white-space: nowrap;
`;

export const BulletPoint = styled.span`
  color: ${(props) => props.theme.colors.white100};
  font-size: 1.2rem;
  margin-right: 4px;
`;

export const ArrowIcon = styled.span<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  color: ${(props) => props.theme.colors.white100};
  font-size: 12px;
  ${(props) => props.$open && "transform: rotate(180deg);"}

  svg {
    width: 16px;
    height: 16px;
    display: block;
  }
`;

export const SidemenuItemBox = styled.li<SidemenuItemProps>`
  // 하위메뉴 OPEN/CLOSE
  ${(props) =>
    props.$submenuToggle === true &&
    css`
      & > ${SidemenuListItem} {
        & > ${SidemenuItemTit} {
          color: ${(props) => props.theme.colors.white100};
          font-weight: 600;
        }

        svg {
          path {
            fill: ${(props) => props.theme.colors.white100};
            fill-opacity: 1;
          }
        }
      }

      & > ${SidemenuListBox} {
        max-height: 100svh;
        transition: max-height 0.4s ease-in-out;
        padding-left: 20px;
        position: relative;
        
        &::before {
          content: "";
          position: absolute;
          left: 20px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: ${(props) => props.theme.colors.sidemenuDivider};
        }
      }
    `}

  ${(props) =>
    props.$submenuToggle === false &&
    css`
      & > ${SidemenuListBox} {
        max-height: 0px;
        transition: max-height 0.2s ease-in-out;
        overflow: hidden;
      }
    `} 
    
  // 해당 메뉴 ACTIVE/UNACTIVE
  ${(props) =>
    props.$menuActive === true &&
    css`
      & > ${SidemenuListItem} {
        background: ${props.theme.colors.sidemenuActive};

        & > ${SidemenuItemTit} {
          color: ${props.theme.colors.white100};
          font-weight: 600;
        }

        svg {
          path {
            fill: ${props.theme.colors.white100};
          }
        }
      }
    `}
`;
