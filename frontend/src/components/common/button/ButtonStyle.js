/**기본 버튼 컴포넌트 style */
import styled from "styled-components";

export const ButtonOne = styled.button`
  border: none;
  border-radius: 10px;
  padding: 15px;
  min-height: 50px;
  min-width: 150px;
  background-color: #fce76c;

  &:hover {
    background-color: #ffda00;
    cursor: pointer;
  }
`;

export const Buttontwo = styled.button`
  border: none;
  border-radius: 20px;
  padding: 15px;
  margin: 15px;
  min-height: 50px;
  min-width: 150px;
  background-color: #ff8f5c;
  color: #ffffff;
  font-size: large;
  font-weight: bold;

  &:hover {
    background-color: #f64d00;
    cursor: pointer;
  }
`;
