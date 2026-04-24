import * as S from "./SidemenuTop.style";
import { Link } from "react-router-dom";

interface SidemenuTopProps {
  isCollapsed?: boolean;
  asideToggle?: () => void;
}

/** 사이드메뉴 상단 컴포넌트 - Figma design */
export const SidemenuTop = ({
  isCollapsed = false,
  asideToggle,
}: SidemenuTopProps) => {
  return (
    <S.SidemenuTop $isCollapsed={isCollapsed}>
      <S.LogoWrap $isCollapsed={isCollapsed}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Figma Logo SVG - Shield with checkmark */}
          <S.LogoIcon>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2L4 7V15C4 22.73 9.11 29.86 16 32C22.89 29.86 28 22.73 28 15V7L16 2Z"
                stroke="#2ec4a0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M11 16L14 19L21 12"
                stroke="#2ec4a0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </S.LogoIcon>
          <S.LogoText>
            <S.LogoTextWhite>Vectra</S.LogoTextWhite>
            <S.LogoTextAccent>Secure</S.LogoTextAccent>
          </S.LogoText>
        </Link>
      </S.LogoWrap>

      <S.SidemenuBtn onClick={asideToggle} aria-label="Toggle sidebar">
        {/* Figma: LayoutLeft icon - flipped horizontally */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: isCollapsed ? "scaleX(1)" : "scaleX(-1)" }}
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line
            x1="9"
            y1="3"
            x2="9"
            y2="21"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </S.SidemenuBtn>
    </S.SidemenuTop>
  );
};
