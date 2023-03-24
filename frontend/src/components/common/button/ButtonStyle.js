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
