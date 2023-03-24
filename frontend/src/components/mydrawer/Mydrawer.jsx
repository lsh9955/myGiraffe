import React from "react";
/**책장 메인화면 컴포넌트 */

import MyStorybookList from "./mystorybook/MyStorybookList";
import MyStorybookItem from "./mystorybook/MyStorybookItem";
import { MydrawerContainer } from "components/mydrawer/MydrawerStyle";

const Mydrawer = () => {
  return (
    <div>
      Mydrawer
      <MydrawerContainer>
        <MyStorybookList>
          <MyStorybookItem></MyStorybookItem>
        </MyStorybookList>
      </MydrawerContainer>
    </div>
  );
};

export default Mydrawer;
