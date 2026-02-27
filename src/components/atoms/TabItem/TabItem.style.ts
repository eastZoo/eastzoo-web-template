import styled, { css } from "styled-components";

interface TabItemStyleProps {
  $active: boolean;
}

export const TabItem = styled.div<TabItemStyleProps>`
  display: flex;
  align-items: center;

  ${(props) =>
    props.$active &&
    css`
      color: ${(props) => props.theme.colors.primary100};
      border-bottom: 1px solid ${(props) => props.theme.colors.primary100};
    `}
`;

export const TabItemTitle = styled.div<TabItemStyleProps>`
  display: flex;
  width: auto;
  height: 44px;
  padding: 0 4px;
  color: ${(props) => props.theme.colors.black60};
  font-size: 1.4rem;
  font-weight: 600;
  white-space: nowrap;
  letter-spacing: 0;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary60};
  }

  ${(props) =>
    props.$active &&
    css`
      color: ${(props) => props.theme.colors.primary100};
      cursor: default;

      &:hover {
        color: ${(props) => props.theme.colors.primary100};
      }
    `}
`;

export const TabItemCloseBox = styled.div`
  cursor: pointer;
  svg {
    display: flex;
    width: 14px;
    height: 14px;
    align-items: center;
    justify-content: center;
  }
`;
