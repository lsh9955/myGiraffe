import React from "react";
import {
  MydraweritemContainer,
  Mydraweritemimage,
} from "components/mydrawer/MydrawerStyle";

import bookimage1 from "assets/bookimage/1.png";

const MyStorybookItem = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <MydraweritemContainer>
      <Mydraweritemimage src={bookimage1} alt="bookimage1" />
      <h3>{data.title}</h3>
      <p>{data.date}</p>
    </MydraweritemContainer>
  );
};

export default MyStorybookItem;
