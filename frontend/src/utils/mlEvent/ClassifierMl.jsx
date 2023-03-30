import React, { useState, useEffect } from "react";
import axios from "axios";
import CanvasTool from "utils/canvas/CanvasTool";
import {
  SketchWriteContainer,
  SketchTitle,
} from "components/common/sketchbook/SketchBookStyle";
// 모달에 필요한 컴포넌트 import
import { Box, Typography, Modal } from "@mui/material/";
import { Buttontwo } from "components/common/button/ButtonStyle";
import { TutorialNumberGif } from "components/modal/tutorial_modal/TutorialStyle";
import GifClassifier from "assets/image/tutorialclassifier.gif";

// 모달 mui 스타일
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "3px solid #ff8f5c",
  boxShadow: 24,
  outline: "none",
  p: 4,
  borderRadius: 10,
};

const ClassifierMl = () => {
  // 모달 오픈시 필요한 변수
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

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
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{
              m: 2,
              fontSize: 30,
              color: "#FF8F5C",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            소중한 물건을 그려보자
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TutorialNumberGif src={GifClassifier} alt="GifClassifier" />
          </Box>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 3,
              mb: 1,
              fontSize: 18,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            가방 안에 들어있던 물건은 뭐였을까?
          </Typography>
          <Typography
            sx={{
              mt: 1,
              mb: 1,
              fontSize: 17,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            (닌텐도 스위치, 축구공, 인형, 일기장, 로봇, 스마트폰)
          </Typography>
          <Typography
            sx={{
              mt: 1,
              mb: 1,
              fontSize: 18,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            중에 하나를 골라 그려주세요.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Buttontwo onClick={handleClose}>확인</Buttontwo>
          </Box>
        </Box>
      </Modal>
      <SketchWriteContainer>
        <SketchTitle>
          (닌텐도 스위치, 축구공, 인형, 일기장, 로봇, 스마트폰) 중에 1개를 골라
          그려주세요.
        </SketchTitle>
        <CanvasTool getImgHandler={getImgHandler} />
      </SketchWriteContainer>
    </>
  );
};

export default ClassifierMl;
