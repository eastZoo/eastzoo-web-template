import styled from "styled-components";
import { Modal } from "../Modal";

/** 확인 버튼 스타일 타입 */
type ConfirmVariant = "primary" | "danger" | "accent";

export interface AlertProps {
  /** 모달 표시 여부 */
  isOpen: boolean;
  /** 모달 닫기 핸들러 */
  onClose: () => void;
  /** 확인 버튼 클릭 핸들러 */
  onConfirm: () => void;
  /** 제목 */
  title: string;
  /** 설명 (React.ReactNode로 bold 텍스트 지원) */
  description: React.ReactNode;
  /** 취소 버튼 텍스트 (기본값: "닫기") */
  cancelText?: string;
  /** 확인 버튼 텍스트 (기본값: "확인") */
  confirmText?: string;
  /** 확인 버튼 스타일 (기본값: "primary") */
  confirmVariant?: ConfirmVariant;
  /** 추가 콘텐츠 (파일 목록 등) */
  children?: React.ReactNode;
  /** 모달 너비 (기본값: 384) */
  width?: number;
}

/**
 * Alert 컴포넌트
 * 재사용 가능한 알림/경고 모달
 * Figma design: node 143-4271
 */
export const Alert = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  cancelText = "닫기",
  confirmText = "확인",
  confirmVariant = "primary",
  children,
  width = 384,
}: AlertProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width={width}>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        {children}
      </Content>
      <Actions>
        <CancelButton type="button" onClick={onClose}>
          {cancelText}
        </CancelButton>
        <ConfirmButton
          type="button"
          onClick={onConfirm}
          $variant={confirmVariant}
        >
          {confirmText}
        </ConfirmButton>
      </Actions>
    </Modal>
  );
};

export default Alert;

/** ============================= Styled Components ============================= */

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 24px 16px 16px;
`;

const Title = styled.h2`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.24px;
  color: #171719;
  margin: 0;
`;

const Description = styled.p`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.091px;
  color: rgba(46, 47, 51, 0.88);
  margin: 0;

  /* Bold 텍스트 지원 */
  strong,
  b {
    font-weight: 700;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 16px;
`;

const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  background: rgba(112, 115, 124, 0.08);
  border: none;
  border-radius: 8px;
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.091px;
  color: rgba(46, 47, 51, 0.88);
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(112, 115, 124, 0.16);
  }
`;

const confirmBg = (v: ConfirmVariant) => {
  if (v === "danger") return "#FF4242";
  if (v === "accent") return "#0066FF";
  return "#2EC4A0"; // primary - 메인 컬러
};

const confirmBgHover = (v: ConfirmVariant) => {
  if (v === "danger") return "#E03333";
  if (v === "accent") return "#0052CC";
  return "#26A88A"; // primary hover
};

const ConfirmButton = styled.button<{ $variant: ConfirmVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  background: ${({ $variant }) => confirmBg($variant)};
  border: none;
  border-radius: 8px;
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.091px;
  color: white;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ $variant }) => confirmBgHover($variant)};
  }
`;
