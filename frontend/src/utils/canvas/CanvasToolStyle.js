//캔버스 스타일
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 80vh;

  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

export const DrawWrap = styled.div`
  width: 70%;
  height: 90%;
  border-radius: 20px;
  border: 2px solid #fce76c;
  & > div {
    border-radius: 20px;
    & > canvas {
      border-radius: 20px;
    }
  }
`;
