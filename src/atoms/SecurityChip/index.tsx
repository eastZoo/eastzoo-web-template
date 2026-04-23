import React from "react";
import * as S from "./SecurityChip.style";

interface SecurityChipProps {
  icon: React.ReactNode;
  label: string;
}

export const SecurityChip: React.FC<SecurityChipProps> = ({ icon, label }) => {
  return (
    <S.ChipContainer>
      <S.IconWrapper>{icon}</S.IconWrapper>
      <S.Label>{label}</S.Label>
    </S.ChipContainer>
  );
};

export default SecurityChip;
