import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { SpinnerPosition, SpinnerStyle } from "components/rsp/RspSpinnerStyle";

const RspSpinner = ({ showSpinner }) => {
  return (
    <div>
      <SpinnerPosition showSpinner={showSpinner}>
        <SpinnerStyle>
          <SyncLoader color="#36d7b7" />
        </SpinnerStyle>
      </SpinnerPosition>
    </div>
  );
};

export default RspSpinner;
