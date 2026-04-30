import IconLogout from "@/styles/assets/svg/icon_logout.svg";
import IconPassword from "@/styles/assets/svg/icon_password.svg";
import IconUser from "@/styles/assets/svg/icon_user.svg";
import { HeaderPopupItem } from "@/components/atoms/HeaderPopupItem";
import * as S from "./HeaderPopup.style";

interface HeaderPopupProps {
  popupRef: React.ForwardedRef<HTMLDivElement>;
  popupOutsideClick: (e: any) => void;
  changedInfo: (e: any) => void;
  handleModal: (e: any) => void;
  logout: () => void;
}

export const HeaderPopup = ({
  popupRef,
  popupOutsideClick,
  changedInfo,
  handleModal,
  logout,
}: HeaderPopupProps) => {
  const popupItem = [
    {
      id: 1,
      title: "사용자 정보 변경",
      icon: <IconUser />,
      onClick: changedInfo,
    },
    {
      id: 2,
      title: "비밀번호 변경",
      icon: <IconPassword />,
      onClick: handleModal,
    },
    {
      id: 3,
      title: "로그아웃",
      icon: <IconLogout />,
      onClick: logout,
    },
  ];

  return (
    <S.HeaderPopupBg ref={popupRef} onClick={(e: any) => popupOutsideClick(e)}>
      <S.HeaderPopup>
        <S.HeaderPopupList>
          {popupItem.map((item: any) => {
            return (
              <HeaderPopupItem
                key={item.id}
                title={item.title}
                icon={item.icon}
                onClick={item.onClick}
              />
            );
          })}
        </S.HeaderPopupList>
      </S.HeaderPopup>
    </S.HeaderPopupBg>
  );
};
