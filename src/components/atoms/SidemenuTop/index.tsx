import * as S from "./SidemenuTop.style";
// import IconMenu from "@/styles/assets/svg/icon_sidemenu.svg";
import { Link } from "react-router-dom";
import ImgCheckbox from "../../../styles/assets/img/logo.png";

interface SidemenuTopProps {
  asideToggle?: any;
}

/** 사이드메뉴 상단 컴포넌트 */
export const SidemenuTop = ({ asideToggle }: SidemenuTopProps) => {
  return (
    <S.SidemenuTop style={{ justifyContent: "center" }}>
      <S.SidemenuTopSpan
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src={ImgCheckbox}
            alt="logo"
            style={{
              width: "165px",
              height: "72px",
              marginRight: "10px",
              objectFit: "contain",
              display: "block",
            }}
          />
        </Link>
      </S.SidemenuTopSpan>
    </S.SidemenuTop>
  );
};
