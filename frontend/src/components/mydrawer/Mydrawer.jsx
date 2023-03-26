import React from "react";
/**책장 메인화면 컴포넌트 */

import { MydrawerContainer } from "components/mydrawer/MydrawerStyle";
import MydrawerListContainer from "components/mydrawer/mystorybook/MyStorybookList";

const Mydrawer = () => {
  return (
    <div>
      Mydrawer
      <MydrawerListContainer></MydrawerListContainer>
    </div>
  );
};

export default Mydrawer;
