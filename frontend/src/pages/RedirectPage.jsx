import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { login } from "store/AuthSlice";
const RedirectPage = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const getUserInfo = async () => {
      await axios
        .get("http://j8b201.p.ssafy.io/api/members", {
          headers: {
            Authorization: location.search.split("?Authorization=")[1],
          },
        })
        .then((response) => {
          dispatch(
            login({
              accessToken: location.search.split("?Authorization=")[1],
              userId: response.data.content.userId,
              userName: response.data.content.userName,
              profileImg: response.data.content.profileImg,
              coinAmount: response.data.content.coinAmount,
              accessToken: response.data.content.accessToken,
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
      getUserInfo();
      history.push("/");
    };
  }, []);

  return <div>RedirectPage</div>;
};

export default RedirectPage;
