import * as S from "./LoginPage.style";
import ImgCheckbox from "../../styles/assets/img/logo.png";
import { useState } from "react";
import { ACCESS_TOKEN } from "@/lib/constants/sharedStrings";
import { writeAccessToken } from "@/lib/functions/authFunctions";
import { loginApi } from "@/lib/hooks/auth/useLogin";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * 로그인 페이지
 * - 버튼 클릭 시 임시 토큰을 localStorage에 저장
 * - 로그인 후 원래 가려던 경로로 redirect
 */
export default function LoginPage() {
  /** ========== state 영역 ========== */
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: Location } };
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /** ========== api 영역 ========== */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await loginApi({ userId, password });

      if (!response.success) {
        setErrorMessage(response.message);
        setIsLoading(false);
        return;
      }

      if (response.user) {
        alert(`반갑습니다 ${response.user.userName}님!`);
        localStorage.setItem("user", JSON.stringify(response.user));

        if (response.token) {
          writeAccessToken(response.token);
        } else {
          writeAccessToken(ACCESS_TOKEN);
        }

        const redirectTo = "/";
        window.location.href = redirectTo;
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      setErrorMessage("로그인 중 오류가 발생했습니다.");
      setIsLoading(false);
    }
  };

  /** ========== 비즈니스 로직 영역 ========== */

  return (
    <>
      <title>로그인</title>
      <S.Container>
        <S.LoginCard>
          {/* 헤더 */}
          <S.CardHeader>
            <S.LogoContainer>
              <S.LogoBox>
                <img
                  src={ImgCheckbox}
                  alt="logo"
                  style={{
                    width: "165px",
                    height: "72px",
                    display: "block",
                    objectFit: "contain",
                    marginRight: "10px",
                    marginBottom: "0.5rem",
                  }}
                />
              </S.LogoBox>
            </S.LogoContainer>
            <S.Subtitle>SAMPLE SYSTEM</S.Subtitle>
          </S.CardHeader>

          {/* 폼 */}
          <S.FormContainer onSubmit={handleLogin}>
            {/* 에러 메시지 */}
            {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}

            {/* 아이디 입력 */}
            <S.InputGroup>
              <S.Label>아이디</S.Label>
              <S.InputWrapper>
                <S.InputIcon>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </S.InputIcon>
                <S.Input
                  id="text"
                  type="text"
                  value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="아이디를 입력해주세요."
                  required
                />
              </S.InputWrapper>
            </S.InputGroup>

            {/* 비밀번호 입력 */}
            <S.InputGroup>
              <S.Label htmlFor="password">비밀번호</S.Label>
              <S.InputWrapper>
                <S.InputIcon>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </S.InputIcon>
                <S.Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="비밀번호를 입력해주세요."
                  required
                />
              </S.InputWrapper>
            </S.InputGroup>

            {/* 로그인 유지 & 비밀번호 찾기 */}
            <S.OptionsRow>
              <S.CheckboxLabel>
                <input type="checkbox" />
                <span>로그인 상태 유지</span>
              </S.CheckboxLabel>
              <S.Link href="#">비밀번호 찾기</S.Link>
            </S.OptionsRow>

            {/* 로그인 버튼 */}
            <S.LoginButton
              type="submit"
              disabled={isLoading}
              $isLoading={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="spinner" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  로그인 중...
                </>
              ) : (
                <>로그인</>
              )}
            </S.LoginButton>
          </S.FormContainer>

          {/* 푸터 */}
          <S.CardFooter>
            <p>
              계정이 없으신가요? <S.Link href="#">회원가입</S.Link>
            </p>
          </S.CardFooter>
        </S.LoginCard>
      </S.Container>
    </>
  );
}
