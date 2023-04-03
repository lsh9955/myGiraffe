import React, { useState } from "react";
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
import GifNumber from "assets/image/tutorialnumber.gif";

// 숫자 인식 ml

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

const NumberMl = () => {
  // 모달 오픈시 필요한 변수
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [getImg, setGetImg] = useState(null);
  const getImgHandler = (e) => {
    setGetImg(e);
  };
  useEffect(() => {
    const NumMl = async () => {
      await axios
        .post(
          // "https://j8b201.p.ssafy.io/api/numbers",
          "http://192.168.31.87:5000/api/numbers",
          {
            base64_drawing: String(getImg),
          },
          {
            headers: {
              Authorization: process.env.REACT_APP_TOKEN,
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
            수학 문제를 풀어보자
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TutorialNumberGif src={GifNumber} alt="GifNumber" />
          </Box>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 1,
              mb: 1,
              fontSize: 18,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            유령이 낸 문제를 보고
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
            정답을 펜으로 적어보세요.
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
            답을 적었다면, 완료 버튼을 눌러주세요.
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
        <SketchTitle>재미있는 숫자 퀴즈! 3*5-6 = ?</SketchTitle>
        <CanvasTool getImgHandler={getImgHandler} />
      </SketchWriteContainer>
    </>
  );
};

export default NumberMl;
