//캔버스 스타일
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 90%;
  position: absolute;
  z-index: 10;
  top: 10%;
  left: 0px;
  display: flex;
  background-color: white;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

export const CanTitle = styled.div`
  position: absolute;
  background-color: white;
  z-index: 12;
  height: 10%;
  left: 0px;
  width: 100vw;
  display: flex;
  padding: 4% 0 0 0;
  justify-content: center;
  align-items: center;
  font-size: 300%;
  white-space: pre-wrap;
`;

export const DrawWrap = styled.div`
  width: 899px;
  height: 476px;
  border-radius: ${(props) => (props.bgImg ? "0px" : "20px")};
  & > div {
    border: ${(props) =>
      props.bgImg ? "2px solid #ffffff" : "2px solid #fce76c"};
    border-radius: ${(props) => (props.bgImg ? "0px" : "20px")};
    & > canvas {
      border-radius: ${(props) => (props.bgImg ? "0px" : "20px")};
    }
  }
`;
