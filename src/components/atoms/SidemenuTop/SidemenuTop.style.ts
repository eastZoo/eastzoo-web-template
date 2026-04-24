import styled, { css } from "styled-components";

interface SidemenuTopProps {
  $isCollapsed?: boolean;
}

export const SidemenuTop = styled.div<SidemenuTopProps>`
  overflow: hidden;
  display: flex;
  width: 100%;
  padding: 24px 16px 21px;
  /* Figma: --background/normal/brand */
  background: ${(props) => props.theme.colors.sidemenuBackground};
  align-items: center;
  /* Figma: --line/normal/alternative */
  border-bottom: 1px solid ${(props) => props.theme.colors.sidemenuBorder};

  ${(props) =>
    props.$isCollapsed
      ? css`
          justify-content: center;
          gap: 8px;
        `
      : css`
          justify-content: space-between;
        `}
`;

export const LogoWrap = styled.div<SidemenuTopProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;

  ${(props) =>
    props.$isCollapsed &&
    css`
      display: none;
    `}
`;

export const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Pretendard", sans-serif;
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
`;

export const LogoTextWhite = styled.span`
  color: ${(props) => props.theme.colors.white100};
`;

export const LogoTextAccent = styled.span`
  /* Figma: --color/cyan/47 */
  color: ${(props) => props.theme.colors.sidemenuAvatarText};
`;

export const SidemenuBtn = styled.button`
  display: flex;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease;
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.white100};

  &:hover {
    background: ${(props) => props.theme.colors.sidemenuHover};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const SidemenuTopSpan = styled.span`
  color: ${(props) => props.theme.colors.white100};
  font-size: 3.4rem;
  font-weight: 400;
  white-space: nowrap;
`;
