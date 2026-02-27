import * as S from "./headerPopupItem.style";

interface HeaderPopupProps {
  title: string;
  icon: React.ReactElement;
  onClick?: any;
}

export const HeaderPopupItem = ({ title, icon, onClick }: HeaderPopupProps) => {
  return (
    <S.HeaderPopupItem>
      <S.HeaderPopupItemBox onClick={onClick}>
        {icon}
        {title}
      </S.HeaderPopupItemBox>
    </S.HeaderPopupItem>
  );
};
