import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as L from "./LoginStyle";

/**로그인 컴포넌트 */
const Login = () => {
  const history = useHistory();
  const isLogin = useSelector((state) => state.user.userId);

  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }
  }, [isLogin]);

  return (
    <L.LoginBackBackground>
      <L.LoginSpeechBackground>
        <L.LoginTxt>어서와요!</L.LoginTxt>
        <L.KakaoLogin
          href={"http://j8b201.p.ssafy.io:9001/oauth2/authorization/kakao"}
        ></L.KakaoLogin>

        <L.LoginSpeechArrow />
      </L.LoginSpeechBackground>
    </L.LoginBackBackground>
  );
};

export default Login;
