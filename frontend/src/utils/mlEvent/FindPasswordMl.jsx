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
import GifFindPassword from "assets/image/password_tutorial.gif";
import Repaint from "components/modal/repaint/Repaint";

// 소중한 물건인지 확인하는 ml

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

const FindPasswordMl = ({ pageChangeHandler }) => {
  // 모달 오픈시 필요한 변수
  const [open, setOpen] = useState(true);
  //다시 그리기 모달 창 컨트롤
  const [isOpen, setIsOpen] = useState(false);
  //틀린 횟수(3번 틀리면 집에 감)
  const [wrongCount, setWrongCount] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };
  //모달 창 열렸는지 확인
  const openCheck = (e) => {
    if (e != isOpen) {
      setIsOpen(e);
    }
  };

  const [getImg, setGetImg] = useState(null);
  const getImgHandler = (e) => {
    setGetImg(e);
    const NumMl = async () => {
      await axios
        .post(
          "https://j8b201.p.ssafy.io/api/numbers",
          // "http://192.168.31.87:5000/api/numbers",
          {
            base64_drawing: String(e.slice(22)),
          },
          {
            headers: {
              Authorization: process.env.REACT_APP_TOKEN,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data === Number("313")) {
            pageChangeHandler(11);
          } else {
            if (wrongCount + 1 === 3) {
              pageChangeHandler(10);
            } else {
              setWrongCount(wrongCount + 1);
              alert(`${wrongCount + 1}번 틀렸어요`);
            }
          }
        })
        .catch((error) => {
          //모달창 생성해주기
          setIsOpen(true);
        });
    };
    NumMl();
  };

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
            교실 비밀번호를 풀어보자
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TutorialNumberGif src={GifFindPassword} alt="GifClassifier" />
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
            선생님 자리에서 찾은 단서를 가지고,
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
            비밀번호를 캔버스에 적어보세요.
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
            3번 이상 틀린다면, 어떤 일이 일어날까요?
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
      <Repaint isOpen={isOpen} openCheck={openCheck} />
      <SketchWriteContainer>
        <SketchTitle>자물쇠 비밀번호를 적어주세요!</SketchTitle>
        <CanvasTool getImgHandler={getImgHandler} />
      </SketchWriteContainer>
    </>
  );
};

export default FindPasswordMl;
