import styled, { css } from "styled-components";

interface MainBoxProps {
  $asideOpen: boolean;
}

export const MainTemplate = styled.div<MainBoxProps>`
  display: grid;
  width: 100vw;
  height: 100svh;
  grid-template-areas:
    "MN CT"
    "MN CT";
  grid-template-columns: ${({ $asideOpen }) =>
    $asideOpen ? "220px auto" : "80px auto"};
  grid-template-rows: 52px auto;
  transition: grid-template-columns 0.2s ease;

  // 화면크기(1200px 미만) 설정 - 모바일/태블릿
  @media (max-width: 1199px) {
    grid-template-columns: ${({ $asideOpen }) =>
      $asideOpen ? "220px auto" : "0 auto"};
  }
`;

export const ContentSection = styled.section`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  grid-area: CT;
  height: calc(100svh);
  background: ${(props) => props.theme.colors.gray50};
  display: flex;
  flex-direction: column;
`;
