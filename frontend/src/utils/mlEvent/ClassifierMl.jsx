import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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
import Repaint from "components/modal/repaint/Repaint";

// 소중한 물건인지 확인하는 ml

//물건 정보를 redux에 저장
import { item } from "store/BookSlice";
import { useDispatch } from "react-redux";
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

const ClassifierMl = ({ nextOnlyPage }) => {
  // 모달 오픈시 필요한 변수
  const [open, setOpen] = useState(true);
  //다시 그리기 모달 창 컨트롤
  const [isOpen, setIsOpen] = useState(false);
  const userSeq = useSelector((state) => state.user);
  const bookSeq = useSelector((state) => state.book);

  const handleClose = () => {
    setOpen(false);
  };
  //모달 창 열렸는지 확인
  const openCheck = (e) => {
    if (e != isOpen) {
      setIsOpen(e);
    }
  };
  const dispatch = useDispatch();
  const [getImg, setGetImg] = useState(null);
  const getImgHandler = (e) => {
    setGetImg(e);
    const NumMl = async () => {
      await axios
        .post(
          "https://j8b201.p.ssafy.io/api/classifier",
          // "http://192.168.31.87:5000/api/classifier",
          {
            criteria_1: String("Insect,Insects,Bug,Bugs"),
            criteria_2: String("Fruits,Fruit,Plant,Plants"),
            base64_drawing: String(e.slice(22)),
          },
          {
            headers: {
              Authorization: userSeq.accessToken,
            },
          }
        )
        .then((response) => {
          dispatch(item({ lostItem: response.data }));
          nextOnlyPage();
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
      <Repaint isOpen={isOpen} openCheck={openCheck} />
      <SketchWriteContainer>
        <SketchTitle>
          (닌텐도 스위치, 축구공, 인형, 일기장, 로봇, 스마트폰) 중에 1개를 골라
          그려주세요.
        </SketchTitle>
        <CanvasTool getImgHandler={getImgHandler} isBook={true} />
      </SketchWriteContainer>
    </>
  );
};

export default ClassifierMl;
