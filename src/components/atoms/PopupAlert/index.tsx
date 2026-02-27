import * as S from "./PopupAlert.style";

interface PopupAlertProps {
  title?: string;
  text?: string;
  buttons?: React.ReactElement;
}

export const PopupAlert = ({ title, text, buttons }: PopupAlertProps) => {
  return (
    <S.PopupAlertBox>
      <S.PopupAlert>
        <S.PopupTitle>{title}</S.PopupTitle>

        <S.PopupContent>{text}</S.PopupContent>

        <S.PopupButtons>{buttons}</S.PopupButtons>
      </S.PopupAlert>
    </S.PopupAlertBox>
  );
};
