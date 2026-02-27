import { useRecoilValue } from "recoil";
import { userState } from "@/store/loginUser";
import { useLogout } from "@/lib/hooks/useLogout";
import * as S from "./SidemenuFooter.style";
import IconUser from "@/styles/assets/svg/icon_user.svg";

export const SidemenuFooter = () => {
  const user = useRecoilValue(userState);
  const logout = useLogout();

  // 사용자 정보가 없을 경우 기본값 사용
  const userName = user?.userName || "홍길동";
  const userEmail = user?.email || "admin@example.com";

  return (
    <S.SidemenuFooterContainer>
      <S.UserInfo>
        <S.UserText>
          <S.UserIcon>
            <img src={IconUser} alt="user" />
          </S.UserIcon>
          <S.UserName>{userName}</S.UserName>
          <S.Separator>|</S.Separator>
          <S.UserEmail>{userEmail}</S.UserEmail>
        </S.UserText>
      </S.UserInfo>
      <S.LogoutButton onClick={logout}>로그아웃</S.LogoutButton>
    </S.SidemenuFooterContainer>
  );
};
