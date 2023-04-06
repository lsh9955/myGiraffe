/**가위바위보 컴포넌트 style*/
import styled from "styled-components";
import ghostNormal from "assets/icon/ghostNormal.gif";
// 가위바위보 상단
export const Container = styled.div`
  width: 97vw;
  height: 10vh;
  background: #fce76c;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 가위바위보 서비스명
export const ServiceName = styled.p`
  margin-left: 1vw;
  width: auto;
  font-size: 8vh;
  height: 8vh;
  color: #8bd0fc;
`;

// 게임의 전체 컨테이너
export const GameContainer = styled.div`
  width: 97vw;
  height: 90vh;

  display: ${(props) => (props.showSpinner ? "none" : "flex")};
  justify-content: space-around;
  align-items: center;
`;

// 사용자 게임 컨테이너에 들어가는 스크린
export const GameScreen = styled.div`
  width: 45%;
  height: 90%;
  background-color: #ffffff;
  border: 3px solid #ff8f5c;
`;

// 컴퓨터 게임 컨테이너에 들어가는 스크린
export const GhostGameScreen = styled.div`
  width: 45%;
  height: 90%;
  border: 3px solid #ff8f5c;
  background-size: 90%;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-image: url(${ghostNormal});
`;

// 타이머
export const TimerScreen = styled.div`
  width: 2%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 타이머 글자 크기
export const TimerTime = styled.p`
  width: auto;
  font-size: 8vh;
  height: 8vh;
  color: #8bd0fc;
`;

// 가위바위보 이미지 크기
export const RspImg = styled.img`
  width: auto;
  height: 30%;
`;

