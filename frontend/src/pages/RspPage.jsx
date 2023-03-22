import React from "react";
import Rsp from "components/rsp/Rsp";
import { useSelector } from "react-redux";

/**가위바위보 게임 페이지 */
const RspPage = () => {
  const isLoad = useSelector((state) => state.game.isLoad);

  return <div>{isLoad ? <Rsp /> : <div>로딩중...</div>}</div>;
};

export default RspPage;
