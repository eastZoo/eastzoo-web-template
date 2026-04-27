import { useEffect, useCallback } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

export interface ModalProps {
  /** 모달 표시 여부 */
  isOpen: boolean;
  /** 모달 닫기 핸들러 */
  onClose: () => void;
  /** 모달 컨텐츠 */
  children: React.ReactNode;
  /** 오버레이 클릭 시 닫기 여부 (기본값: true) */
  closeOnOverlayClick?: boolean;
  /** ESC 키로 닫기 여부 (기본값: true) */
  closeOnEsc?: boolean;
  /** 모달 너비 (기본값: 432px) */
  width?: number | string;
}

/**
 * Modal 컴포넌트
 * 재사용 가능한 모달 다이얼로그
 */
export const Modal = ({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  width = 432,
}: ModalProps) => {
  /** ESC 키 핸들러 */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape") {
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  /** ESC 키 이벤트 등록 */
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  /** 오버레이 클릭 핸들러 */
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer $width={width}>{children}</ModalContainer>
    </Overlay>,
    document.body
  );
};

export default Modal;

/** ============================= Styled Components ============================= */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContainer = styled.div<{ $width: number | string }>`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => (typeof $width === "number" ? `${$width}px` : $width)};
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 48px);
  background: #ffffff;
  border-radius: 16px;
  overflow: clip;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
`;
