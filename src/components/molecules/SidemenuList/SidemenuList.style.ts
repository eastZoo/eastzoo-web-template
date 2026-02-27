import styled from "styled-components";

interface SidemenuListProps {
  $depth?: number;
}

export const SidemenuListBox = styled.ul<SidemenuListProps>`
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  width: 100%;
  padding: ${(props) => (props.$depth === 1 ? "8px 0" : "0")};
  flex-direction: column;
  background: linear-gradient(
    to left,
    ${(props) => props.theme.colors.sidemenuBackgroundLight},
    ${(props) => props.theme.colors.sidemenuBackground}
  );

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
`;
