import styled, { css } from "styled-components";

interface ButtonProps {
  $size: "xsm" | "sm" | "md" | "md-icon" | "lg";
  $layout:
    | "primary"
    | "secondary"
    | "highlight"
    | "warn"
    | "destructive"
    | "ghost"
    | "icon"
    | "find"
    | "cancelModal"
    | "outline"
    | "selectCondition"
    | "selectCondition active"
    | "disabled";
}

interface TooltipProps {
  $tooltipPosition?: "left" | "center" | "right";
}

export const Buttons = styled.button<ButtonProps>`
  position: relative;
  display: flex;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  // SIZE
  ${(props) =>
    props.$size === "xsm" &&
    css`
      min-width: 26px;
      height: 26px;
      font-size: 1.2rem;
    `}

  // SIZE
  ${(props) =>
    props.$size === "sm" &&
    css`
      min-width: 28px;
      height: 28px;
      padding: 0 10px;
      font-size: 1.2rem;
      font-weight: 500;
    `}

  ${(props) =>
    props.$size === "md" &&
    css`
      min-width: 32px;
      height: 32px;
      padding: 0 16px;
      font-size: 1.4rem;
      font-weight: 500;
      flex-grow: 0;
    `}


  ${(props) =>
    props.$size === "md-icon" &&
    css`
      width: 32px;
      height: 32px;
      flex-grow: 0;
    `}

  ${(props) =>
    props.$size === "lg" &&
    css`
      width: 100%;
      height: 48px;
      font-size: 1.6rem;
      font-weight: 600;
    `}

  // LAYOUT
  ${(props) =>
    props.$layout === "primary" &&
    css`
      color: ${(props) => props.theme.colors.white100};
      border: none;
      background: ${(props) => props.theme.colors.primary100};

      &:hover {
        background: ${(props) => props.theme.colors.primaryHover};
      }
    `}

     ${(props) =>
    props.$layout === "disabled" &&
    css`
      color: ${(props) => props.theme.colors.white100};
      border: none;
      background: ${(props) => props.theme.colors.black12};
    `}

  ${(props) =>
    props.$layout === "secondary" &&
    css`
      color: ${(props) => props.theme.colors.white100};
      border: none;
      background: ${(props) => props.theme.colors.black60};

      &:hover {
        background: ${(props) => props.theme.colors.black70};
      }
    `}


  ${(props) =>
    props.$layout === "warn" &&
    css`
      color: ${(props) => props.theme.colors.white100};
      background: ${(props) => props.theme.colors.redStatus};
      border: none;

      &:hover {
        background: ${(props) => props.theme.colors.redStatusHover};
      }
    `}

  ${(props) =>
    props.$layout === "destructive" &&
    css`
      color: ${(props) => props.theme.colors.redStatus};
      border: 1px solid ${(props) => props.theme.colors.redStatus};
      background: ${(props) => props.theme.colors.white100};

      &:hover {
        background: ${(props) => props.theme.colors.redStatus5};
      }
    `}

  ${(props) =>
    props.$layout === "ghost" &&
    css`
      color: ${(props) => props.theme.colors.primary100};
      border: 1px solid ${(props) => props.theme.colors.primary100};
      background: ${(props) => props.theme.colors.white100};

      &:hover {
        background: ${(props) => props.theme.colors.primary5};
      }
    `}

  ${(props) =>
    props.$layout === "cancelModal" &&
    css`
      border: none;
      color: ${(props) => props.theme.colors.white100};
      background: ${(props) => props.theme.colors.black60};
    `}

  ${(props) =>
    props.$layout === "find" &&
    css`
      display: flex;
      width: 32px;
      border: none;
      padding: 0 !important;
      background: ${(props) => props.theme.colors.black60};
      align-items: center;
      justify-content: center;

      svg {
        path {
          fill: ${(props) => props.theme.colors.white100};
        }
      }

      &:hover {
        background: ${(props) => props.theme.colors.black80};
      }
    `}

    ${(props) =>
    props.$layout === "highlight" &&
    css`
      color: ${(props) => props.theme.colors.white100};
      background: ${(props) => props.theme.colors.greenStatus};
      border: none;

      &:hover {
        background: ${(props) => props.theme.colors.greenStatusHover};
      }
    `}

  ${(props) =>
    props.$layout === "icon" &&
    css`
      padding: 0 6px;
      border: none;
      background: none;

      // 보고서 버튼에 아이콘 사용 시 검정색상 변경으로 인한 주석 처리
      svg {
        path {
          fill: ${(props) => props.theme.colors.black60};
        }
      }

      &:hover {
        background: ${(props) => props.theme.colors.black5};

        svg {
          path {
            fill: ${(props) => props.theme.colors.primary100};
            fill-opacity: 1;
          }
        }
      }
    `}


${(props) =>
    props.$layout === "outline" &&
    css`
      padding: 0 12px 0 6px;
      color: ${(props) => props.theme.colors.black80};
      border: 1px solid ${(props) => props.theme.colors.black12};
      background: none;

      svg {
        path {
          fill: ${(props) => props.theme.colors.black60};
          fill-opacity: 1;
        }
      }

      &:hover {
        color: ${(props) => props.theme.colors.primary100};
        background: ${(props) => props.theme.colors.black5};

        svg {
          path {
            fill: ${(props) => props.theme.colors.primary100};
            fill-opacity: 1;
          }
        }
      }
    `}

  ${(props) =>
    props.$layout.includes("selectCondition") &&
    css`
      color: ${props.$layout.includes("active")
        ? props.theme.colors.white100
        : props.theme.colors.primary100};
      border: 1px solid ${(props) => props.theme.colors.primary100};
      background: ${props.$layout.includes("active")
        ? props.theme.colors.primary100
        : "none"};

      &:hover {
        background: ${(props) => props.theme.colors.primaryHover};
        color: ${(props) => props.theme.colors.white100};
      }
    `}

  &:disabled {
    color: ${(props) => props.theme.colors.black38} !important;
    background: ${(props) => props.theme.colors.black8} !important;
    cursor: default;
  }
`;

export const ButtonTooltipBox = styled.div<TooltipProps>`
  position: absolute;
  width: 230px;

  padding: 10px 16px;
  font-size: 1.2rem;
  line-height: 16px;
  text-align: left;
  background: ${(props) => props.theme.colors.black80};
  border-radius: 6px;
  z-index: 10;

  ${(props) =>
    props.$tooltipPosition === "left" &&
    css`
      top: 36px;
      left: 0;
    `};

  ${(props) =>
    props.$tooltipPosition === "right" &&
    css`
      top: 36px;
      right: 0;
    `}
`;
