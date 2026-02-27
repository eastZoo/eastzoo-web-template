import styled from "styled-components";

export const HeaderPopupItem = styled.li`
  display: flex;
  padding: 0 16px;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary100};
    background: ${(props) => props.theme.colors.primary5};

    svg {
      path {
        fill: ${(props) => props.theme.colors.primary100};
      }
    }
  }
`;

export const HeaderPopupItemBox = styled.div`
  display: flex;
  height: 38px;
  font-size: 1.3rem;
  align-items: center;
  gap: 4px;

  svg {
    path {
      fill: ${(props) => props.theme.colors.primary60};
    }
  }
`;
