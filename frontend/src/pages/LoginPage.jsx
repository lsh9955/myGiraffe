import React from "react";
import loginBackground from "../assets/image/loginBackground.gif";
import loginSpeechBackground from "../assets/image/loginSpeechBackground.png";
/**로그인 페이지 */
const LoginPage = () => {
  return (
    <>
      <img src={loginSpeechBackground} style={{ position: "absolute" }} />
      <img src={loginBackground} />
    </>
  );
};

export default LoginPage;
