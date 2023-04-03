import React from "react";
/**책장 메인화면 컴포넌트 */
import MyStorybookList from "components/mydrawer/mystorybook/MyStorybookList";
import MySketchbookList from "components/mydrawer/mysketchbook/MySketchbookList";
import MyDiaryList from "components/mydrawer/mydiary/MyDiaryList";

const Mydrawer = () => {
  return (
    <div>
      <MyStorybookList></MyStorybookList>
      <MyDiaryList></MyDiaryList>
      <MySketchbookList></MySketchbookList>
    </div>
  );
};

export default Mydrawer;
