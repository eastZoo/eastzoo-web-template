import { styled } from "styled-components";

export const ChipContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 13px 9px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
`;

export const IconWrapper = styled.span`
  width: 11px;
  height: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  color: rgba(255, 255, 255, 0.5);

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Label = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
  white-space: nowrap;
`;
