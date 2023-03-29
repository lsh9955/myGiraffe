import React, { useState, useEffect } from "react";
import axios from "axios";
import CanvasTool from "utils/canvas/CanvasTool";
import {
  SketchWriteContainer,
  SketchTitle,
} from "components/common/sketchbook/SketchBookStyle";

const NumberMl = () => {
  const [getImg, setGetImg] = useState(null);
  const getImgHandler = (e) => {
    setGetImg(e);
  };
  useEffect(() => {
    const NumMl = async () => {
      await axios
        .post("https://j8b201.p.ssafy.io/api/numbers", {
          base64_drawing: getImg,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    NumMl();
    console.log(NumMl());
  }, [getImg]);

  return (
    <SketchWriteContainer>
      <SketchTitle>재미있는 숫자 퀴즈! 3*5-6 = ?</SketchTitle>
      <CanvasTool getImgHandler={getImgHandler} />
    </SketchWriteContainer>
  );
};

export default NumberMl;
