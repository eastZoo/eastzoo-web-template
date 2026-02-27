import styled, { css } from "styled-components";

export const Textarea = styled.textarea<any>`
  resize: none;
  height: ${(props) => (props.height ? props.height + "px" : "auto")};
  padding: 12px 16px;
  font-size: 1rem;

  ${(props) =>
    props.size === "md" &&
    css`
      padding: 8px 10px;
      font-size: 1.2rem;
    `}

  ${(props) =>
    props.size === "lg" &&
    css`
      padding: 12px 16px;
      font-size: 1.4rem;
    `}

  &::-webkit-scrollbar {
    border: 4px solid transparent;
    outline: none;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border: 5px solid ${(props) => props.theme.colors.white100};
    border-radius: 8px;
    background-color: ${(props) => props.theme.colors.black38};
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
