import styled, { css } from "styled-components";

interface SidemenuSectionProps {
  $isCollapsed?: boolean;
}

export const SidemenuSection = styled.section<SidemenuSectionProps>`
  grid-area: MN;
  display: grid;
  height: 100svh;
  background: ${(props) => props.theme.colors.sidemenuBackground};
  border-right: 1px solid ${(props) => props.theme.colors.sidemenuBorder};
  grid-template-rows: 64px 1fr auto;
  transition: width 0.2s ease;
  overflow: hidden;

  ${(props) =>
    props.$isCollapsed
      ? css`
          width: 80px;
        `
      : css`
          width: 220px;
        `}
`;
