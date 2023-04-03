import { useRef, useState, useCallback, useEffect } from "react";
import { CirclePicker, TwitterPicker } from "react-color";
import CanvasDraw from "@win11react/react-canvas-draw";
import Palette from "./Palette";
import * as C from "./CanvasToolStyle";
//그림 그리는 캔버스
const CanvasTool = ({ title, nextPage }) => {
  const canvasRef = useRef(null);

  const [drawing, setDrawing] = useState();
  const [canvas, setBrush] = useState("#000000");
  const [brush, setThick] = useState(10);

  const handleExport = () => {
    const data = canvasRef.current.getSaveData();
    console.log(data);
    const base64 = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
    setDrawing(base64);
    // NumberMl
    getImgHandler(base64);
    console.log(base64);
  };

  const handleChangeComplete = (color) => {
    setBrush(color);
  };

  const handleRevert = () => {
    canvasRef.current.undo();
  };

  const handleThick = (event) => {
    setThick(event);
  };

  return (
    <>
      <C.CanTitle>{title}</C.CanTitle>
      <C.Container>
        <Palette
          handleChangeComplete={handleChangeComplete}
          handleExport={handleExport}
          handleRevert={handleRevert}
          handleThick={handleThick}
          brush={brush}
          canvas={canvas}
          colors={[
            "#FCFCFC",
            "#DDC836",
            "#209758",
            "#FFB402",
            "#00A9E6",
            "#FF5028",
            "#3B29CB",
            "#F52380",
            "#903AB5",
            "#CE023C",
            "#000000",
            "#FFC998",
          ]}
        />
        <C.DrawWrap>
          <CanvasDraw
            catenaryColor={canvas}
            ref={canvasRef}
            brushColor={canvas}
            brushRadius={brush}
            canvasHeight="476px"
            hideGrid={true}
            lazyRadius={0}
            canvasWidth="899px"
          />
        </C.DrawWrap>
      </C.Container>
    </>
  );
};

export default CanvasTool;
