import styled from "styled-components";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 32px;
  background-color: #f5f5f7;
`;

export const NotFoundContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
`;

export const NotFoundIcon = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4B45E7 0%, #3832EA 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  box-shadow: 0px 8px 24px 0px rgba(75, 69, 231, 0.25);
  
  &::before {
    content: "404";
    font-size: 48px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -2px;
  }
`;

export const NotFoundTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px 0;
  letter-spacing: -1px;
`;

export const NotFoundDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 40px 0;
  line-height: 1.6;
  letter-spacing: -0.2px;
`;

export const NotFoundActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const HomeButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background-color: #4B45E7;
  color: #ffffff;
  transition: all 0.2s ease;
  letter-spacing: -0.2px;
  
  &:hover {
    background-color: #3C36D4;
    transform: translateY(-2px);
    box-shadow: 0px 4px 12px 0px rgba(75, 69, 231, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const BackButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background-color: #ffffff;
  color: #333;
  transition: all 0.2s ease;
  letter-spacing: -0.2px;
  
  &:hover {
    background-color: #fafafa;
    border-color: #d0d0d0;
    transform: translateY(-2px);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

