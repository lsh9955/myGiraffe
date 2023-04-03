import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as L from "./LoginStyle";

/**로그인 컴포넌트 */
const Login = () => {
  const history = useHistory();
  const isLogin = useSelector((state) => state.user.authenticated);

  const KAKAO_AUTH_URL = process.env.REACT_APP_KAKAO_AUTH_URL;

  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }
  }, []);

  return (
    <L.LoginBackBackground>
      <L.LoginSpeechBackground>
        <L.LoginTxt>어서와요!</L.LoginTxt>
        <L.KakaoLogin href={KAKAO_AUTH_URL}></L.KakaoLogin>

        <L.LoginSpeechArrow />
      </L.LoginSpeechBackground>
    </L.LoginBackBackground>
  );
};

export default Login;
