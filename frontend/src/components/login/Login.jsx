import React, { useEffect, useState } from "react";
import loginSpeechBackground from "../../assets/image/loginSpeechBackground.png";
import KakaoLogin from "../../assets/icon/kakaoLogin.png";
import * as L from "./LoginStyle";

/**로그인 컴포넌트 */
const Login = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newHeight = window.innerHeight;
      setHeight(newHeight);
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <L.LoginBackBackground>
      <L.LoginSpeechBackground>
        <L.LoginTxt>어서와요!</L.LoginTxt>
        <L.KakaoLogin src={KakaoLogin}></L.KakaoLogin>
        <L.LoginSpeechArrow />
      </L.LoginSpeechBackground>
    </L.LoginBackBackground>
  );
};

export default Login;
