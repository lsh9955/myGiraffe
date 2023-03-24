/**로그인 컴포넌트 style */
import styled from "styled-components";
import loginBg from "../../assets/image/loginBackground.gif";
import loginSpeechBackground from "../../assets/image/loginSpeechBackground.png";
import loginSpeechArrow from "../../assets/image/loginSpeechArrow.png";

export const LoginBackBackground = styled.div`
  width: 100vw;
  height: 100vh;
  padding-left: 10vw;
  padding-top: 5vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${loginBg});
`;

export const LoginSpeechBackground = styled.div`
  width: 40vw;
  height: 55vh;
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 100% 100%;
  background-image: url(${loginSpeechBackground});

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LoginSpeechArrow = styled.div`
  position: absolute;

  width: 15vw;
  height: 10vh;
  top: 30%;
  left: 45%;
  background-repeat: no-repeat;

  background-size: 100% 100%;
  background-image: url(${loginSpeechArrow});
`;

export const LoginTxt = styled.div`
  height: 30%;
  font-size: 4vw;
`;

export const KakaoLogin = styled.img`
  height: auto;
  width: 60%;
`;
