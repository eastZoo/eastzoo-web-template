import styled from "styled-components";
interface ModalStyleProps {
  $width?: any;
  $height?: any;
  $padding?: string;
}

export const ModalBg = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  width: 100vw;
  height: 100svh;
  background: ${(props) => props.theme.colors.black60};
  align-items: center;
  justify-content: center;
  z-index: 998;
`;

export const Modal = styled.div<ModalStyleProps>`
  display: flex;
  background: ${(props) => props.theme.colors.white100};
  border-radius: 12px;
  box-shadow: ${(props) => props.theme.shadows.modal};
  flex-direction: column;
  width: ${(props) =>
    props.$width ? (typeof props.$width === "number" ? props.$width + "px" : props.$width + "%") : "600px"};
  max-width: 90vw;
  max-height: 90vh;
  height: ${(props) =>
    props.$height ? props.$height + "px" : "auto"};
  overflow: hidden;
`;

export const ModalTitBox = styled.div`
  display: flex;
  padding: 24px 28px;
  color: ${(props) => props.theme.colors.black100};
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.black12};
`;

export const CloseBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${(props) => props.theme.colors.black60};
  
  &:hover {
    background-color: ${(props) => props.theme.colors.black8};
    color: ${(props) => props.theme.colors.black100};
  }
  
  span {
    font-size: 24px;
    font-weight: 400;
    line-height: 1;
    user-select: none;
  }
`;

export const ModalContentBox = styled.div<ModalStyleProps>`
  display: flex;
  min-width: 300px;
  padding: ${(props) => (props.$padding ? props.$padding : "28px")};
  color: ${(props) => props.theme.colors.black80};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  flex-direction: column;
  gap: 0;
  flex: 1;
  overflow-y: auto;

  .status_txt {
    display: inline-block;
    margin-bottom: 10px;
    color: ${(props) => props.theme.colors.primary100};
  }

  .toastui-editor-main-container {
    text-align: left !important;
  }

  .toastui-editor-contents table th {
    background-color: #a0a0a0;
  }
`;

export const ModalFormBox = styled.form<{ $flexDirection: "row" | "column" }>`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection};
  gap: 0;
  width: 100%;
`;

export const ModalFormSection = styled.div<{
  $flexDirection?: "row" | "column";
}>`
  flex-direction: column;
  flex-direction: ${(props) => props.$flexDirection || "column"};
  gap: 12px;
  display: flex;
  padding: 0 24px;

  /* .toastui-editor-contents {
    height: 450px;
    overflow-y: auto;
    text-align: left;
  } */
`;

export const ModalFormDiv = styled.div<{
  $alignItems?: string;
  $gap?: string;
  $fullWidth?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$gap ? props.$gap : "0")};
  align-items: ${(props) => props.$alignItems || "stretch"};
  margin-bottom: 24px;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ModalGridBox = styled.div`
  min-width: 760px;
`;

export const ModalButtonBox = styled.div`
  display: flex;
  padding: 20px 28px;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid ${(props) => props.theme.colors.black12};
  background-color: ${(props) => props.theme.colors.white100};
`;
