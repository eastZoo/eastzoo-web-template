import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html, body {
    font-size: 10px;
    font-family: 'NanumSquareNeo', sans-serif;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  p {
    margin: 0;
  }
`;
