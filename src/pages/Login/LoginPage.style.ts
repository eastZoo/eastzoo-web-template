import { styled, keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  position: relative;
  background: linear-gradient(90deg, rgb(17, 28, 78) 0%, rgb(17, 28, 78) 100%);
`;

export const GridBackground = styled.div`
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

export const LoginCard = styled.div`
  position: relative;
  width: 420px;
  padding: 45px 41px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  box-shadow: 0px 24px 80px 0px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

export const LogoIconBox = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgb(30, 49, 120) 0%, rgb(17, 28, 78) 100%);
  border: 1px solid rgba(46, 196, 160, 0.3);
  border-radius: 16px;
  box-shadow: 0px 0px 24px 0px rgba(46, 196, 160, 0.15);
  padding: 1px;
`;

export const LogoIcon = styled.div`
  width: 28px;
  height: 28px;
  color: #2ec4a0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const Title = styled.h1`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.3px;
  margin: 0;
  padding-bottom: 1px;

  span.white {
    color: white;
  }

  span.accent {
    color: #2ec4a0;
  }
`;

export const Subtitle = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 12.5px;
  letter-spacing: 0.25px;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
  padding: 1px 0 2px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

/* insystem-atoms 컴포넌트는 이제 직접 스타일 props를 받으므로 wrapper 불필요 */

export const OptionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:checked {
    background: #2ec4a0;
    border-color: #2ec4a0;
  }

  &:checked::after {
    content: "";
    display: block;
    width: 10px;
    height: 8px;
    margin: 3px auto;
    background: url("data:image/svg+xml,%3csvg viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M9 1L3.5 6.5L1 4' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")
      no-repeat center;
  }
`;

export const CheckboxText = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
`;

export const Link = styled.a`
  font-family: "Pretendard", sans-serif;
  font-size: 13px;
  color: #2ec4a0;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const LoginButton = styled.button<{ $isLoading?: boolean }>`
  width: 100%;
  padding: 13px 13px 15px;
  background: #2ec4a0;
  border: none;
  border-radius: 10px;
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.3px;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: #26a88a;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.svg`
  width: 18px;
  height: 18px;
  animation: ${spin} 1s linear infinite;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 8px;
`;

export const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
`;

export const DividerText = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.2);
  white-space: nowrap;
  padding: 1px 0 2px;
`;

export const SecurityChips = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 10px;
  padding-top: 8px;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 11px;
  padding-bottom: 0.59px;
`;

export const FooterText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.2);
  margin: 0;
  line-height: 21.6px;
  text-align: center;
`;

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  border: 1px solid rgba(255, 107, 107, 0.3);
  padding: 10px 14px;
  font-size: 13px;
  text-align: center;
  border-radius: 8px;
  background: rgba(255, 107, 107, 0.1);
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
