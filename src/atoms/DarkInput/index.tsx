import React, { forwardRef } from "react";
import * as S from "./DarkInput.style";

interface DarkInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export const DarkInput = forwardRef<HTMLInputElement, DarkInputProps>(
  ({ label, leftIcon, rightIcon, onRightIconClick, ...props }, ref) => {
    return (
      <S.InputContainer>
        {label && <S.Label>{label}</S.Label>}
        <S.InputWrapper>
          {leftIcon && <S.LeftIcon>{leftIcon}</S.LeftIcon>}
          <S.StyledInput
            ref={ref}
            $hasLeftIcon={!!leftIcon}
            $hasRightIcon={!!rightIcon}
            {...props}
          />
          {rightIcon && (
            <S.RightIcon type="button" onClick={onRightIconClick} tabIndex={-1}>
              {rightIcon}
            </S.RightIcon>
          )}
        </S.InputWrapper>
      </S.InputContainer>
    );
  }
);

DarkInput.displayName = "DarkInput";

export default DarkInput;
