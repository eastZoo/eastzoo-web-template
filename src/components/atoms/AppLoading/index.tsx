import styled, { keyframes } from "styled-components";

/**
 * AppLoading - 앱 전역 로딩 화면
 * 로그인 페이지와 동일한 디자인 톤 (다크 블루 배경 + 틸 액센트)
 */
export const AppLoading = () => {
  return (
    <Container>
      <GridBackground />
      <LoadingContent>
        <SpinnerWrapper>
          <Spinner viewBox="0 0 50 50">
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </Spinner>
        </SpinnerWrapper>
        <LoadingText>로딩 중...</LoadingText>
      </LoadingContent>
    </Container>
  );
};

export default AppLoading;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  position: fixed;
  inset: 0;
  background: linear-gradient(90deg, rgb(17, 28, 78) 0%, rgb(17, 28, 78) 100%);
  z-index: 9999;
`;

const GridBackground = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      180deg,
      rgba(46, 196, 160, 0.04) 2.5%,
      rgba(46, 196, 160, 0) 2.5%
    ),
    linear-gradient(
      90deg,
      rgba(46, 196, 160, 0.04) 2.5%,
      rgba(46, 196, 160, 0) 2.5%
    );
  background-size: 40px 40px;
`;

const LoadingContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const SpinnerWrapper = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgb(30, 49, 120) 0%, rgb(17, 28, 78) 100%);
  border: 1px solid rgba(46, 196, 160, 0.3);
  border-radius: 16px;
  box-shadow: 0px 0px 24px 0px rgba(46, 196, 160, 0.15);
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const Spinner = styled.svg`
  width: 28px;
  height: 28px;
  animation: ${spin} 2s linear infinite;

  circle {
    stroke: #2ec4a0;
    animation: ${dash} 1.5s ease-in-out infinite;
  }
`;

const LoadingText = styled.span`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.5);
`;
