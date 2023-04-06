import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import CanvasDraw from "@win11react/react-canvas-draw";
import Palette from "./Palette";
import * as C from "./CanvasToolStyle";
//그림 그리는 캔버스
const CanvasToolSketchbook = ({ bgImg }) => {
  // 완료 버튼 누른 후 메인페이지로 라우팅
  const history = useHistory();
  // 리덕스에서 정보 가져오기
  const userSeq = useSelector((state) => state.user);
  const canvasRef = useRef(null);

  const [canvas, setBrush] = useState("#000000");
  const [brush, setThick] = useState(10);

  // base64를 파일 객체로 만들기
  function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  // 그림데이터가 저장
  const handleExport = () => {
    const data = canvasRef.current.getSaveData();

    const base64 = canvasRef.current.canvasContainer.childNodes[1].toDataURL();

    // form 데이터로 만듦
    const sketchData = new FormData();

    // urltoFile 함수로 이미지를 파일형태로 바꿈
    urltoFile(base64, "sketch.png", "image/png").then(function (file) {
      sketchData.append("sketchImg", file);
      const changeJSON = JSON.stringify({ sketchTraceData: data });
      const blob = new Blob([changeJSON], { type: "application/json" });
      sketchData.append("sketch", blob);

      axios
        .post("https://j8b201.p.ssafy.io/api/members/sketch", sketchData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: userSeq.accessToken,
          },
        })
        .then((response) => {
          // 메인으로 이동
          history.push("/");
        })
        .catch((error) => {
          alert("오류가 발생했습니다. 다시 시도해 주세요");
        });
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

export default CanvasToolSketchbook;
