import * as S from "./LoginPage.style";
import { useEffect, useState } from "react";
import { useLogin } from "@/lib/hooks/useAuth";
import { isApiSuccess } from "@/types/api";
import { readAccessToken } from "@/lib/functions/authFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import { IsButton, IsInputText, IsCheckbox, IsChip } from "insystem-atoms";

// 다크 테마 스타일 토큰 (Figma 디자인 기준)
const DARK_THEME = {
  label: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "12px",
    letterSpacing: "0.6px",
    textTransform: "uppercase" as const,
  },
  field: {
    background: "rgba(255, 255, 255, 0.06)",
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: "10px",
    "--is-input-placeholder-color": "rgba(255, 255, 255, 0.2)",
  } as React.CSSProperties,
  input: { color: "rgba(255, 255, 255, 0.8)" },
  icon: { color: "rgba(255, 255, 255, 0.3)" },
  checkbox: {
    box: {
      background: "rgba(255, 255, 255, 0.06)",
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    label: { color: "rgba(255, 255, 255, 0.4)", fontSize: "13px" },
  },
  chip: {
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.07)",
    text: { color: "rgba(255, 255, 255, 0.3)" },
    icon: { color: "rgba(255, 255, 255, 0.3)", opacity: 0.7 },
  },
} as const;

const SEED_ACCOUNTS = [
  { email: "admin@eastzoo.local", role: "ADMIN" },
  { email: "manager@eastzoo.local", role: "MANAGER" },
  { email: "developer@eastzoo.local", role: "DEVELOPER" },
] as const;

const SEED_PASSWORD = "Admin123!";

// 아이콘 컴포넌트들
const ShieldCheckIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 2.33334L4.66667 6.41668V12.8333C4.66667 18.8183 8.645 24.4183 14 25.6667C19.355 24.4183 23.3333 18.8183 23.3333 12.8333V6.41668L14 2.33334Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 14L12.8333 16.3333L17.5 11.6667"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
  >
    <path
      d="M7.5 7.5C9.15685 7.5 10.5 6.15685 10.5 4.5C10.5 2.84315 9.15685 1.5 7.5 1.5C5.84315 1.5 4.5 2.84315 4.5 4.5C4.5 6.15685 5.84315 7.5 7.5 7.5Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.75 13.5C12.75 11.0147 10.3995 9 7.5 9C4.60051 9 2.25 11.0147 2.25 13.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
  >
    <path
      d="M11.25 6.75H3.75C3.05964 6.75 2.5 7.30964 2.5 8V12.5C2.5 13.1904 3.05964 13.75 3.75 13.75H11.25C11.9404 13.75 12.5 13.1904 12.5 12.5V8C12.5 7.30964 11.9404 6.75 11.25 6.75Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.75 6.75V4.25C4.75 3.52065 5.03973 2.82118 5.55546 2.30546C6.07118 1.78973 6.77065 1.5 7.5 1.5C8.22935 1.5 8.92882 1.78973 9.44454 2.30546C9.96027 2.82118 10.25 3.52065 10.25 4.25V6.75"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DocumentIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    style={{ color: props.color }}
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    {...props}
  >
    <path
      d="M6.1875 1.375H2.75C2.50136 1.375 2.2629 1.47377 2.08709 1.64959C1.91127 1.8254 1.8125 2.06386 1.8125 2.3125V8.6875C1.8125 8.93614 1.91127 9.1746 2.08709 9.35041C2.2629 9.52623 2.50136 9.625 2.75 9.625H8.25C8.49864 9.625 8.7371 9.52623 8.91291 9.35041C9.08873 9.1746 9.1875 8.93614 9.1875 8.6875V4.375L6.1875 1.375Z"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.1875 1.375V4.375H9.1875"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockClosedIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    {...props}
  >
    <path
      d="M8.25 5.04167H2.75C2.24374 5.04167 1.83333 5.45208 1.83333 5.95833V9.16667C1.83333 9.67293 2.24374 10.0833 2.75 10.0833H8.25C8.75626 10.0833 9.16667 9.67293 9.16667 9.16667V5.95833C9.16667 5.45208 8.75626 5.04167 8.25 5.04167Z"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.4375 5.04167V3.20833C3.4375 2.59429 3.68139 2.00539 4.11538 1.5714C4.54936 1.13742 5.13827 0.893333 5.75231 0.893333C6.36635 0.893333 6.95525 1.13742 7.38924 1.5714C7.82322 2.00539 8.06711 2.59429 8.06711 3.20833V5.04167"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClipboardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    style={{ color: props.color }}
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    {...props}
  >
    <path
      d="M7.33333 1.83333H8.25C8.49864 1.83333 8.7371 1.93211 8.91291 2.10792C9.08873 2.28374 9.1875 2.5222 9.1875 2.77083V9.14583C9.1875 9.39447 9.08873 9.63293 8.91291 9.80875C8.7371 9.98456 8.49864 10.0833 8.25 10.0833H2.75C2.50136 10.0833 2.2629 9.98456 2.08709 9.80875C1.91127 9.63293 1.8125 9.39447 1.8125 9.14583V2.77083C1.8125 2.5222 1.91127 2.28374 2.08709 2.10792C2.2629 1.93211 2.50136 1.83333 2.75 1.83333H3.66667"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.875 0.916667H4.125C3.87086 0.916667 3.66667 1.12086 3.66667 1.375V2.29167C3.66667 2.54581 3.87086 2.75 4.125 2.75H6.875C7.12914 2.75 7.33333 2.54581 7.33333 2.29167V1.375C7.33333 1.12086 7.12914 0.916667 6.875 0.916667Z"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 로그인 페이지
 * - 버튼 클릭 시 임시 토큰을 localStorage에 저장
 * - 로그인 후 원래 가려던 경로로 redirect
 */
export default function LoginPage() {
  /** ========== state 영역 ========== */
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLogin();
  const [userId, setUserId] = useState<string>(SEED_ACCOUNTS[0].email);
  const [password, setPassword] = useState<string>(SEED_PASSWORD);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const from =
    (location.state as { from?: { pathname: string } } | null)?.from
      ?.pathname ?? "/";

  function safeAppPath(pathname: string): string {
    if (!pathname.startsWith("/") || pathname.startsWith("//")) return "/";
    return pathname;
  }

  useEffect(() => {
    if (readAccessToken()) {
      navigate(safeAppPath(from), { replace: true });
    }
  }, [from, navigate]);

  /** ========== api 영역 ========== */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await loginMutation.mutateAsync({
        email: userId,
        password,
      });

      if (!isApiSuccess(res) || !readAccessToken()) {
        setErrorMessage(res.message ?? "로그인에 실패했습니다.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate(safeAppPath(from), { replace: true });
    } catch {
      setErrorMessage("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <title>로그인</title>
      <S.Container>
        <S.GridBackground />
        <S.LoginCard>
          {/* 헤더 */}
          <S.CardHeader>
            <S.LogoIconBox>
              <S.LogoIcon>
                <ShieldCheckIcon />
              </S.LogoIcon>
            </S.LogoIconBox>
            <S.TitleContainer>
              <S.Title>
                <span className="white">Vectra</span>
                <span className="accent">Secure</span>
              </S.Title>
              <S.Subtitle>보안형 AI 질의·검색 플랫폼</S.Subtitle>
            </S.TitleContainer>
          </S.CardHeader>

          {/* 폼 */}
          <S.FormContainer onSubmit={handleLogin}>
            {/* 에러 메시지 */}
            {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}

            {/* 아이디 입력 */}
            <IsInputText
              label="아이디"
              labelShow
              size="medium"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setErrorMessage("");
              }}
              leftIconSlot={<UserIcon />}
              labelStyle={DARK_THEME.label}
              fieldStyle={DARK_THEME.field}
              inputStyle={DARK_THEME.input}
              iconStyle={DARK_THEME.icon}
              placeholderText="아이디를 입력하세요"
              placeholderActive
              fullWidth
              required
            />

            {/* 비밀번호 입력 */}
            <IsInputText
              label="비밀번호"
              labelShow
              size="medium"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
              }}
              placeholderText="비밀번호를 입력하세요"
              leftIconSlot={<LockIcon />}
              labelStyle={DARK_THEME.label}
              fieldStyle={DARK_THEME.field}
              inputStyle={DARK_THEME.input}
              iconStyle={DARK_THEME.icon}
              clearable={true}
              fullWidth
              required
            />

            {/* 로그인 유지 & 비밀번호 찾기 */}
            <S.OptionsRow>
              <IsCheckbox
                size="small"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                label="로그인 상태 유지"
                labelStyle={DARK_THEME.checkbox.label}
                boxStyle={DARK_THEME.checkbox.box}
              />
              <S.Link href="#">비밀번호 찾기</S.Link>
            </S.OptionsRow>

            {/* 로그인 버튼 */}
            <IsButton
              type="submit"
              variant="solid"
              color="primary"
              size="lg"
              fullWidth
              disabled={loginMutation.isPending}
              loading={loginMutation.isPending}
            >
              {loginMutation.isPending ? "로그인 중..." : "로그인"}
            </IsButton>
          </S.FormContainer>

          {/* 구분선 */}
          <S.Divider>
            <S.DividerLine />
            <S.DividerText>보안 인증</S.DividerText>
            <S.DividerLine />
          </S.Divider>

          {/* 보안 칩들 - insystem-atoms IsChip 사용 */}
          <S.SecurityChips>
            <IsChip
              variant="outlined"
              size="sm"
              leftIconSlot={<DocumentIcon style={{ color: "#2EC4A0" }} />}
              style={DARK_THEME.chip}
              contentStyle={DARK_THEME.chip.text}
              iconStyle={DARK_THEME.chip.icon}
              interaction={false}
            >
              원문 미전송
            </IsChip>
            <IsChip
              variant="outlined"
              size="sm"
              leftIconSlot={<LockClosedIcon style={{ color: "#2EC4A0" }} />}
              style={DARK_THEME.chip}
              contentStyle={DARK_THEME.chip.text}
              iconStyle={DARK_THEME.chip.icon}
              interaction={false}
            >
              암호화 통신
            </IsChip>
            <IsChip
              variant="outlined"
              size="sm"
              leftIconSlot={<ClipboardIcon style={{ color: "#2EC4A0" }} />}
              style={DARK_THEME.chip}
              contentStyle={DARK_THEME.chip.text}
              iconStyle={DARK_THEME.chip.icon}
              interaction={false}
              onClick={() => {
                console.log("감사 로그");
              }}
            >
              감사 로그
            </IsChip>
          </S.SecurityChips>

          {/* 푸터 */}
          <S.Footer>
            <S.FooterText>
              © 2025 VectraSecure · 무단 접근 시 법적 책임이 따릅니다
            </S.FooterText>
          </S.Footer>
        </S.LoginCard>
      </S.Container>
    </>
  );
}
