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
  width: 899px;
  height: 476px;
  border-radius: ${(props) => (props.bgImg ? "0px" : "20px")};
  border: ${(props) => (props.bgImg ? "" : "2px solid #fce76c")};
  & > div {
    border-radius: ${(props) => (props.bgImg ? "0px" : "20px")};
    & > canvas {
      border-radius: ${(props) => (props.bgImg ? "0px" : "20px")};
    }
  }
`;
