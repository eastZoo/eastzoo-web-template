import styled from "styled-components";

export const SamplePage1_1Container = styled.div`
  padding: 24px 32px;
  background-color: ${(props) => props.theme.colors.white100};
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black100};
  margin: 0;
  letter-spacing: -0.3px;
`;
