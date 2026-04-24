import styled, { css } from "styled-components";

interface FooterProps {
  $isCollapsed?: boolean;
}

export const SidemenuFooterContainer = styled.div<FooterProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  padding: 17px 12px 16px;
  gap: 12px;
  /* Figma: --background/normal/brand */
  background: ${(props) => props.theme.colors.sidemenuBackground};
  /* Figma: --line/normal/alternative */
  border-top: 1px solid ${(props) => props.theme.colors.sidemenuBorder};
  box-sizing: border-box;
  overflow: hidden;

  ${(props) =>
    props.$isCollapsed &&
    css`
      padding: 17px 12px 16px;
      align-items: center;
      justify-content: center;
    `}
`;

export const UserInfo = styled.div<FooterProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  padding: 8px;
  border-radius: 8px;

  ${(props) =>
    props.$isCollapsed &&
    css`
      justify-content: center;
      padding: 8px;
    `}
`;

export const UserAvatar = styled.div<FooterProps>`
  width: 32px;
  height: 32px;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Figma: --color/cyan/47-12% */
  background: ${(props) => props.theme.colors.sidemenuAvatarBg};
  /* Figma: --color/cyan/47 */
  border: 1px solid ${(props) => props.theme.colors.sidemenuAvatarBorder};
  border-radius: 16px;
  /* Figma: --color/cyan/47 */
  color: ${(props) => props.theme.colors.sidemenuAvatarText};
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.3024px;
  line-height: 1.334;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

export const UserIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserText = styled.div<FooterProps>`
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
  overflow: hidden;

  ${(props) =>
    props.$isCollapsed &&
    css`
      display: none;
    `}
`;

export const UserName = styled.span`
  /* Figma: white */
  color: ${(props) => props.theme.colors.sidemenuUserName};
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.203px;
  line-height: 1.429;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1px 0 2px;
`;

export const UserRole = styled.span`
  /* Figma: --color/white/-35% */
  color: ${(props) => props.theme.colors.sidemenuUserRole};
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.3024px;
  line-height: 1.334;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1px 0 2px;
`;

export const UserEmail = styled.span`
  color: ${(props) => props.theme.colors.sidemenuUserRole};
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Separator = styled.span`
  color: ${(props) => props.theme.colors.sidemenuUserRole};
  font-size: 13px;
  opacity: 0.6;
  flex-shrink: 0;
`;

export const LogoutButton = styled.button<FooterProps>`
  width: 100%;
  min-width: 0;
  padding: 10px 12px;
  background: ${(props) => props.theme.colors.sidemenuLogoutButton};
  color: ${(props) => props.theme.colors.white100};
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${(props) => props.theme.colors.sidemenuLogoutButtonHover};
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  ${(props) =>
    props.$isCollapsed &&
    css`
      padding: 10px;
      width: 40px;
      height: 40px;

      span {
        display: none;
      }
    `}
`;
