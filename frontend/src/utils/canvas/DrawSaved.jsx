import { useRef, useEffect } from "react";
import CanvasDraw from "@win11react/react-canvas-draw";
import * as C from "./CanvasToolStyle";
//그린 그림 애니메이션으로 불러오기
const DrawSaved = (props) => {
  const secCanvasRef = useRef(null);
  // const eventH = () => {
  //   secCanvasRef.current.loadSaveData(props.sketchDraw);
  // };
  useEffect(() => {
    if (typeof props.sketchDraw === "string") {
      secCanvasRef.current.loadSaveData(props.sketchDraw);
    }
  }, [props.sketchDraw]);
  return (
    <C.Container>
      {/* <button
        onClick={() => {
          eventH();
        }}
      >
        그리기
      </button> */}
      <C.DrawWrap>
        <CanvasDraw
          loadTimeOffset={7}
          brushRadius={1}
          hideGrid={true}
          disabled={true}
          style={{
            borderRadius: 1,
            border: "1px solid  black",
            margin: "auto",
          }}
          ref={secCanvasRef}
          canvasHeight="476px"
          canvasWidth="899px"
          imgSrc={props.bgImg ? props.bgImg : ""}
        />
      </C.DrawWrap>
    </C.Container>
  );
};

export default DrawSaved;
