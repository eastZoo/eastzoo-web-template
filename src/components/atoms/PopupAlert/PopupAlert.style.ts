import styled from "styled-components";

export const PopupAlertBox = styled.div`
  position: fixed;
  display: flex;
  width: 100vw;
  height: 100svh;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const PopupAlert = styled.div`
  display: flex;
  min-width: 300px;
  background: white;
  box-shadow: 0px 2px 10px -4px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  flex-direction: column;
`;

export const PopupTitle = styled.div`
  padding: 20px 20px 16px;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.8rem;
`;

export const PopupContent = styled.div`
  padding: 0 20px;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
`;

export const PopupButtons = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
  gap: 4px;

  button {
    height: 32px;
    padding: 0 16px;
    font-size: 1.2rem;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    transition: all 0.2s ease;
    cursor: pointer;

    &.confirm_btn {
      color: white;
      background: #4b45e7;

      &:hover {
        background: #3c36d4;
      }
    }

    &.cancel_btn {
      color: white;
      background: rgba(0, 0, 0, 0.6);

      &:hover {
        background: rgba(0, 0, 0, 0.7);
      }
    }
  }
`;
