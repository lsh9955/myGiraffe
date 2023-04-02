import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { login } from "store/AuthSlice";
const RedirectPage = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      login({ accessToken: location.search.split("?Authorization=")[1] })
    );
    history.push("/");
  }, []);

  return <div>RedirectPage</div>;
};

export default RedirectPage;
