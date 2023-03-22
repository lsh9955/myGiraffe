import { useRef, useState, useCallback, useEffect } from "react";
import { CirclePicker, TwitterPicker } from "react-color";
import CanvasDraw from "@win11react/react-canvas-draw";

const CanvasTool = () => {
  const canvasRef = useRef(null);
  const secCanvasRef = useRef(null);

  const [drawing, setDrawing] = useState();

  const handleExport = () => {
    const data = canvasRef.current.getSaveData();
    secCanvasRef.current.loadSaveData(data);
    const base64 = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
    setDrawing(base64);
  };
  const [canvas, setBrush] = useState("#000000");
  const [brush, setThick] = useState(4);
  const [modify, setModify] = useState(null);
  const [picData, setPicData] = useState(null);
  const style = {
    width: brush + "px",
    background: canvas,
    marginLeft: "50%",
  };

  const changeMod = (ele) => {
    console.log(ele);
    canvasRef.current = ele;
    setModify(ele);
  };

  const handleChangeComplete = (color) => {
    console.log(color.hex);
    setBrush(color.hex);
  };

  return (
    <div className="container">
      <TwitterPicker
        onChangeComplete={handleChangeComplete}
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
      <CirclePicker
        onChangeComplete={handleChangeComplete}
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

      <hr />
      <button
        type="button"
        style={{ backgroundColor: "#0A71F1", color: "white" }}
        onClick={handleExport}
      >
        그린 그림 저장하기
      </button>
      <br />
      <img src={drawing} alt="exported drawing" />

      <CanvasDraw
        ref={canvasRef}
        brushColor={canvas}
        brushRadius={brush}
        canvasHeight="500px"
        hideGrid={true}
        lazyRadius={0}
        canvasWidth="800px"
      />
      <CanvasDraw
        loadTimeOffset={20}
        brushRadius={1}
        hideGrid={true}
        disabled={true}
        style={{ borderRadius: 1, border: "1px solid  black", margin: "auto" }}
        ref={secCanvasRef}
        canvasHeight="500px"
        canvasWidth="800px"
      />
      <button
        onClick={() => {
          canvasRef.current.undo();
          // setBrush()
          console.log(canvasRef.current.lines);
        }}
      >
        되돌리기
      </button>
      <button
        onClick={() => {
          canvasRef.current.clear();
        }}
      >
        지우기
      </button>
      <br />

      <br />
      <label>색연필 크기</label>

      <div className="thickness" style={style}></div>
      <input
        min="2"
        max="50"
        type="range"
        onChange={(event) => {
          setThick(event.target.value);
        }}
      />
    </div>
  );
};

export default CanvasTool;
