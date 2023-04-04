/**사이드바 컴포넌트 style*/
import styled from "styled-components";

export const Container = styled.div`
  height: 10vh;
  flex-direction: column;
  display: flex;
  background-color: #8bd0fc;
  justify-content: space-between;
  align-items: center;
`;

export const UserImg = styled.img`
  height: 10vh;
  margin-top: 5vh;
  width: 10vh;
  border-radius: 99px;
`;

export const MarginContainer = styled.div`
  height: 8vh;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
`;

export const UserName = styled.div`
  height: 5vh;
  flex-direction: column;
  display: flex;
  align-items: center;
  font-size: 250%;
  font-weight: lighter;
`;

export const KeyBackground = styled.div`
  height: 7vh;
  flex-direction: column;
  display: flex;
  align-items: center;
  font-size: 3vw;
  font-weight: lighter;
  & > button {
    margin-top: 1vh;
    width: 50%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #fce76c;
    & > p {
      & > span {
        margin-left: 0.5vw;
        font-size: 100%;
        color: #ff8f5c;
      }
    }
  }
`;
