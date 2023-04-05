import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { login } from "store/AuthSlice";
import axios from "axios";
const RedirectPage = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const getUserInfo = async () => {
      console.log(location.search.split("?Authorization=")[1]);
      const infoRes = await axios.get("https://j8b201.p.ssafy.io/api/members", {
        headers: {
          Accept: "*/*",
          Authorization: location.search.split("?Authorization=")[1],
        },
      });

      dispatch(
        login({
          accessToken: location.search.split("?Authorization=")[1],
          userId: infoRes.data.content.userId,
          userName: infoRes.data.content.userName,
          profileImg: infoRes.data.content.profileImg,
          coinAmount: infoRes.data.content.coinAmount,
        })
      );
    };
    getUserInfo();
    history.push("/");
  }, []);

  return <div>RedirectPage</div>;
};

export default RedirectPage;
