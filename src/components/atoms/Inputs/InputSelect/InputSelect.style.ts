import styled from "styled-components";
import ImgArrow from "../../../../styles/assets/img/img_icon_arrow_down.png";

export const SelectBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  height: 100%;
  
  &::after {
    content: "";
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background-image: url(${ImgArrow});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    pointer-events: none;
    z-index: 1;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 100%;
  padding: 0 30px 0 10px;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-sizing: border-box;
  background: transparent;
  cursor: pointer;
  position: relative;
  z-index: 0;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  line-height: 1;

  &::-ms-expand {
    display: none;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus {
    outline: none;
  }
`;

export const Placeholder = styled.option`
  color: ${(props) => props.theme.colors.black38};

  &[value=""][disabled] {
    display: none;
  }
`;
