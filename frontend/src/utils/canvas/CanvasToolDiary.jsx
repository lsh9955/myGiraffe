import { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CanvasDraw from "@win11react/react-canvas-draw";
import Palette from "./Palette";
import * as C from "./CanvasToolStyle";
//그림 일기 캔버스
const CanvasToolDiary = ({ bgImg }) => {
  // 리덕스에서 정보 가져오기
  const userSeq = useSelector((state) => state.user);
  const canvasRef = useRef(null);

  const [canvas, setBrush] = useState("#000000");
  const [brush, setThick] = useState(10);

  // 그림데이터가 저장
  const handleExport = () => {
    const data = canvasRef.current.getSaveData();
    console.log(data);
    const base64 = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
    console.log(base64);

    // form 데이터로 만듦
    const diaryData = new FormData();
    diaryData.append("diaryTraceData", data);
    diaryData.append("diaryImg", base64);

    axios
      .post(
        "https://j8b201.p.ssafy.io/api/members/diaries",
        { data: diaryData },
        {
          headers: {
            Authorization: userSeq.accessToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <C.DrawWrap bgImg={bgImg}>
        <CanvasDraw
          catenaryColor={canvas}
          ref={canvasRef}
          brushColor={canvas}
          brushRadius={brush}
          canvasHeight="476px"
          hideGrid={true}
          lazyRadius={0}
          canvasWidth="899px"
          imgSrc={bgImg}
        />
      </C.DrawWrap>
    </C.Container>
  );
};

export default CanvasToolDiary;
