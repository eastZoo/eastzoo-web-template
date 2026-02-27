import styled from "styled-components";
import ImgCheckbox from "../../../../styles/assets/img/icon_checkbox_checked.png";

export const InputCheckbox = styled.div`
  label {
    display: flex;
    color: ${(props) => props.theme.colors.black80};
    font-size: 1.4rem;
    font-weight: 500;
    white-space: nowrap;
    align-items: center;
    gap: 6px;
    cursor: pointer;

    &::before {
      display: flex;
      content: "";
      width: 20px;
      height: 20px;
      background: ${(props) => props.theme.colors.white100};
      border: 2px solid ${(props) => props.theme.colors.black12};
      box-sizing: border-box;
      border-radius: 2px;
      align-items: center;
      justify-content: center;
    }
  }

  input {
    display: none;

    &:checked {
      + label::before {
        border: none;
        background: url(${ImgCheckbox});
        background-size: cover;
      }
    }
  }
`;
