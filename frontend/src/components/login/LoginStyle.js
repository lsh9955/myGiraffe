/**로그인 컴포넌트 style */
import styled from "styled-components";
import loginBg from "../../assets/image/loginBackground.gif";
import loginSpeechBackground from "../../assets/image/loginSpeechBackground.png";

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
  width: 55vw;
  height: 60vh;

  background-repeat: no-repeat;
  object-fit: contain;
  background-size: contain;
  background-image: url(${loginSpeechBackground});
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LoginTxt = styled.div`
  width: 50%;
  height: 30%;
  font-size: 4vw;
`;
