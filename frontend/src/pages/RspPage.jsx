import React from "react";
import Rsp from "components/rsp/Rsp";

/**가위바위보 게임 페이지 */
const RspPage = ({ pageChangeHandler }) => {
  return (
    <div>
      <Rsp pageChangeHandler={pageChangeHandler} />
    </div>
  );
};

export default RspPage;
