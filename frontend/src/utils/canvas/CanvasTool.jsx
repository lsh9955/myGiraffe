import { useRef, useState, useCallback, useEffect } from "react";
import { CirclePicker, TwitterPicker } from "react-color";
import CanvasDraw from "@win11react/react-canvas-draw";
import Palette from "./Palette";
import * as C from "./CanvasToolStyle";

const CanvasTool = () => {
  const canvasRef = useRef(null);
  const secCanvasRef = useRef(null);

  const [drawing, setDrawing] = useState();
  const [canvas, setBrush] = useState("#000000");
  const [brush, setThick] = useState(1);
  const [modify, setModify] = useState(null);
  const [picData, setPicData] = useState(null);

  const handleExport = () => {
    const data = canvasRef.current.getSaveData();
    secCanvasRef.current.loadSaveData(data);
    const base64 = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
    setDrawing(base64);
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
          canvasHeight="100%"
          hideGrid={true}
          lazyRadius={0}
          canvasWidth="100%"
        />
      </C.DrawWrap>
      {/* <CanvasDraw
        loadTimeOffset={20}
        brushRadius={1}
        hideGrid={true}
        disabled={true}
        style={{ borderRadius: 1, border: "1px solid  black", margin: "auto" }}
        ref={secCanvasRef}
        canvasHeight="500px"
        canvasWidth="800px"
      /> */}

      {/* <button
        onClick={() => {
          canvasRef.current.clear();
        }}
      >
        지우기
      </button> */}
    </C.Container>
  );
};

export default CanvasTool;
