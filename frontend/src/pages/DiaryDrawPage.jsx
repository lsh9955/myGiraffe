import React from "react";
import CanvasTool from "utils/canvas/CanvasTool";
import diaryBackground from "assets/image/diaryBackground.svg";
/**그림일기 작성 페이지 */
const DiaryDrawPage = () => {
  return (
    <>
      <CanvasTool bgImg={diaryBackground} />
    </>
  );
};

export default DiaryDrawPage;
