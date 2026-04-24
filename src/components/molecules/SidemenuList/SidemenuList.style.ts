import styled, { css } from "styled-components";

interface SidemenuListProps {
  $depth?: number;
  $isCollapsed?: boolean;
}

export const SidemenuListBox = styled.ul<SidemenuListProps>`
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  width: 100%;
  padding: ${(props) => (props.$depth === 1 ? "16px 12px" : "0")};
  flex-direction: column;
  background: ${(props) => props.theme.colors.sidemenuBackground};
  margin: 0;
  list-style: none;
  gap: 4px;

  &::-webkit-scrollbar {
    outline: none;
    border-radius: 10px;
    border: 4px solid transparent;
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.sidemenuScrollbar};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /* Collapsed mode - center items */
  ${(props) =>
    props.$isCollapsed &&
    props.$depth === 1 &&
    css`
      padding: 16px 0;
      align-items: center;
      gap: 8px;
    `}

  /* Hide submenus in collapsed mode */
  ${(props) =>
    props.$isCollapsed &&
    props.$depth !== 1 &&
    css`
      display: none;
    `}
`;
