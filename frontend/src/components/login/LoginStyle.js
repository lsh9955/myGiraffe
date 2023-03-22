/**로그인 컴포넌트 style */
import styled from "styled-components";
import loginBg from "../../assets/image/loginBackground.gif";
import loginSpeechBackground from "../../assets/image/loginSpeechBackground.png";

export const LoginBackBackground = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${loginBg});
`;
export const LoginBackground = styled.div`
  width: ${(props) => (props.width / props.height <= 1.78 ? "auto" : "100vw")};
  height: ${(props) => (props.width / props.height > 1.78 ? "auto" : "100vh")};
  padding-left: 5vw;
  padding-top: 10vh;

  background-position: center;
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
