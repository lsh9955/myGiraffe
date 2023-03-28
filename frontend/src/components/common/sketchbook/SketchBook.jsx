import React from "react";
import CanvasTool from "utils/canvas/CanvasTool";
import { SketchWriteContainer, SketchTitle } from "./SketchBookStyle";

/**스케치북 컴포넌트 */
const SketchBook = () => {
  return (
    <SketchWriteContainer>
      <SketchTitle>재미있는 그림을 그려봐요!</SketchTitle>
      <CanvasTool />
    </SketchWriteContainer>
  );
};

export default SketchBook;
