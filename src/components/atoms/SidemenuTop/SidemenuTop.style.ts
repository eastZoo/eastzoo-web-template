import styled from "styled-components";

export const SidemenuTop = styled.div`
  overflow: hidden;
  display: flex;
  width: 100%;
  padding: 0 20px;
  background: linear-gradient(
    to left,
    ${(props) => props.theme.colors.sidemenuBackgroundLight},
    ${(props) => props.theme.colors.sidemenuBackground}
  );
  align-items: center;
  gap: 12px;
`;

export const SidemenuBtn = styled.button`
  display: flex;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.white100};

  &:hover {
    background: ${(props) => props.theme.colors.sidemenuHover};
  }
`;

export const SidemenuTopSpan = styled.span`
  color: ${(props) => props.theme.colors.white100};
  font-size: 3.4rem;
  font-weight: 400;
  white-space: nowrap;
`;
