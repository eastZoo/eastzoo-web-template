import styled from "styled-components";

export const SidemenuFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  padding: 16px;
  gap: 12px;
  background: linear-gradient(
    to left,
    ${(props) => props.theme.colors.sidemenuBackgroundLight},
    ${(props) => props.theme.colors.sidemenuBackground}
  );
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  overflow: hidden;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  overflow: hidden;
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

export const UserText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

export const UserName = styled.span`
  color: ${(props) => props.theme.colors.white100};
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  max-width: 80px;
`;

export const Separator = styled.span`
  color: ${(props) => props.theme.colors.white100};
  font-size: 13px;
  opacity: 0.6;
  flex-shrink: 0;
`;

export const UserEmail = styled.span`
  color: ${(props) => props.theme.colors.white100};
  font-size: 13px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  flex: 1;
`;

export const LogoutButton = styled.button`
  width: 100%;
  min-width: 0;
  padding: 10px 12px;
  background: transparent;
  color: ${(props) => props.theme.colors.white100};
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-sizing: border-box;
  &:active {
    transform: translateY(0);
  }
`;
