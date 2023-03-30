import React from "react";
import ClassifierMl from "utils/mlEvent/ClassifierMl";
import NumberMl from "utils/mlEvent/NumberMl";
/**동화에서 AI 필요한 그림 그리는 페이지 */
const StorybookMLDrawPage = () => {
  return (
    <div>
      <NumberMl />
      {/* <ClassifierMl /> */}
    </div>
  );
};

export default StorybookMLDrawPage;
