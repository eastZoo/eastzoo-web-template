import { styled } from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const Label = styled.label`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.6px;
  text-transform: uppercase;
  padding: 1px 0 2px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyledInput = styled.input<{ $hasLeftIcon?: boolean; $hasRightIcon?: boolean }>`
  width: 100%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 13px 15px 11px ${({ $hasLeftIcon }) => ($hasLeftIcon ? "43px" : "15px")};
  padding-right: ${({ $hasRightIcon }) => ($hasRightIcon ? "43px" : "15px")};
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    border-color: rgba(46, 196, 160, 0.5);
    box-shadow: 0 0 0 2px rgba(46, 196, 160, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const LeftIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.3);
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const RightIcon = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.3);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.5);
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;
