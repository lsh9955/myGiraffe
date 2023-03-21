import { useRef, useState, useCallback, useEffect } from "react";
import { CirclePicker } from "react-color";
import CanvasDraw from "@win11react/react-canvas-draw";

const CanvasTool = () => {
  const canvasRef = useRef(null);
  const secCanvasRef = useRef(null);
  const contextRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
    console.log(contextRef);
  }, []);
  const [drawing, setDrawing] = useState();
  const handleExport = () => {
    const data = canvasRef.current.getSaveData();
    secCanvasRef.current.loadSaveData(data);
    const base64 = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
    setDrawing(base64);
  };
  const [canvas, setBrush] = useState("#FFFFF");
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
    setBrush(color.hex);
  };

  return (
    <div className="container">
      <CirclePicker
        onChangeComplete={handleChangeComplete}
        colors={[
          "#f44336",
          "#e91e63",
          "#9c27b0",
          "#673ab7",
          "#3f51b5",
          "#2196f3",
          "#00bcd4",
          "#009688",
          "#4caf50",
          "#8bc34a",
          "#cddc39",
          "#ffeb3b",
          "#ffc107",
          "#ff9800",
          "#ff5722",
          "#795548",
          "#FFFFFF",
          "#000000",
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
          console.log(canvasRef.current);
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
