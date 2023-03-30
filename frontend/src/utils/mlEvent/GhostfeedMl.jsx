import React, { useState, useEffect } from "react";
import axios from "axios";
import CanvasTool from "utils/canvas/CanvasTool";
import {
  SketchWriteContainer,
  SketchTitle,
} from "components/common/sketchbook/SketchBookStyle";

// 과일인지, 곤충인지 확인하는 ml

const GhostfeedMl = () => {
  // ml서버에 넘겨줄 이미지
  const [getImg, setGetImg] = useState(null);
  const getImgHandler = (e) => {
    setGetImg(e.split(",")[1]);
  };
  useEffect(() => {
    const NumMl = async () => {
      await axios
        .post(
          // "https://j8b201.p.ssafy.io/api/visionapi",
          "http://192.168.31.87:5000/api/visionapi",
          {
            criteria_1: String("insect"),
            criteria_2: String("plant"),
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
      <SketchTitle>배고픈 유령에게 맛있는 과일을 그려주세요.</SketchTitle>
      <CanvasTool getImgHandler={getImgHandler} />
    </SketchWriteContainer>
  );
};

export default GhostfeedMl;
