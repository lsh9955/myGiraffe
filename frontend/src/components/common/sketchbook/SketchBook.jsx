import React from "react";
import CanvasToolSketchbook from "utils/canvas/CanvasToolSketchbook";
import { SketchWriteContainer, SketchTitle } from "./SketchBookStyle";

/**스케치북 컴포넌트 */
const SketchBook = () => {
  return (
    <SketchWriteContainer>
      <SketchTitle>재미있는 그림을 그려봐요!</SketchTitle>
      <CanvasToolSketchbook />
    </SketchWriteContainer>
  );
};

export default SketchBook;
