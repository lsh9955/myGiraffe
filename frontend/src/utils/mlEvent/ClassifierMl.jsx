import React, { useState, useEffect } from "react";
import axios from "axios";
import CanvasTool from "utils/canvas/CanvasTool";
import {
  SketchWriteContainer,
  SketchTitle,
} from "components/common/sketchbook/SketchBookStyle";

const ClassifierMl = () => {
  const [getImg, setGetImg] = useState(null);
  const getImgHandler = (e) => {
    setGetImg(e.split(",")[1]);
  };
  useEffect(() => {
    const NumMl = async () => {
      await axios
        .post(
          // "https://j8b201.p.ssafy.io/api/classifier",
          "http://192.168.31.87:5000/api/classifier",
          {
            base64_drawing: String(getImg),
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    NumMl();
  }, [getImg]);
  return (
    <SketchWriteContainer>
      <SketchTitle>
        소중한 물건을 그려주세요. (축구공, 닌텐도 스위치, 로봇 장난감, 인형,
        일기장, 스마트폰 중 1개만 선택해서 그려주세요.)
      </SketchTitle>
      <CanvasTool getImgHandler={getImgHandler} />
    </SketchWriteContainer>
  );
};

export default ClassifierMl;
