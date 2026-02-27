import styled, { css } from "styled-components";
import { SideTabList } from "../../molecules/SideTabList/SideTabList.style";

interface SideTabItemStyleProps {
  $depth?: number;
  $submenuToggle?: boolean;
  $menuActive?: boolean;
}

export const SideTabItemTit = styled.div<SideTabItemStyleProps>`
  display: flex;
  color: ${(props) => props.theme.colors.black80};
  font-size: 1.3rem;
  font-weight: 500;
  align-items: center;
  cursor: pointer;

  svg {
    path {
      fill: ${(props) => props.theme.colors.black38};
    }
  }

  ${(props) =>
    props.$depth === 1 &&
    css`
      height: 48px;
      padding: 20px;
      background: ${(props) => props.theme.colors.white100};
      border-bottom: 1px solid ${(props) => props.theme.colors.black12};
      justify-content: space-between;
    `}

  ${(props) =>
    props.$depth === 2 &&
    css`
      height: 36px;
      padding: 0 32px;
    `}
`;

export const SideTabItem = styled.li<SideTabItemStyleProps>`
  ${(props) =>
    props.$submenuToggle === true &&
    css`
      & > ${SideTabItemTit} {
        font-weight: 600;
      }

      & > ${SideTabList} {
        max-height: auto;
        border-bottom: 1px solid ${(props) => props.theme.colors.black12};
        transition: max-height 0.4s ease-in-out;
      }
    `}

  ${(props) =>
    props.$submenuToggle === false &&
    css`
      & > ${SideTabList} {
        max-height: 0px;
        padding: 0;
        transition: max-height 0.2s ease-in-out;
      }
    `}

    ${(props) =>
    props.$depth === 2 &&
    css`
      &:hover {
        background: ${(props) => props.theme.colors.primary5};

        ${SideTabItemTit} {
          color: ${(props) => props.theme.colors.primary100};
        }
      }
    `}
`;
