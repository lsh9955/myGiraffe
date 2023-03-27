import React from "react";
import CanvasTool from "utils/canvas/CanvasTool";
import diaryBackground from "assets/image/diaryBackground.svg";
import { DiaryTitle, DiaryWriteContainer } from "./DiaryWriteStyle";

/**그림일기 컴포넌트 */
const DiaryWrite = () => {
  return (
    <DiaryWriteContainer>
      <DiaryTitle>오늘 있었던 일을 일기로 작성해보자!</DiaryTitle>
      <CanvasTool bgImg={diaryBackground} />
    </DiaryWriteContainer>
  );
};

export default DiaryWrite;
