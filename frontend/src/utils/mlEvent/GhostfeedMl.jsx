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
import GifGhostFeed from "assets/image/ghost_feed.gif";

// 과일인지, 곤충인지 확인하는 ml

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

const GhostfeedMl = () => {
  // 모달 오픈시 필요한 변수
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  // ml서버에 넘겨줄 이미지
  const [getImg, setGetImg] = useState(null);
  const getImgHandler = (e) => {
    setGetImg(e);

    const NumMl = async () => {
      await axios
        .post(
          "https://j8b201.p.ssafy.io/api/visionapi",
          // "http://192.168.31.87:5000/api/visionapi",
          {
            criteria_1: String("Insect,Insects,Bug,Bugs"),
            criteria_2: String("Fruits,Fruit,Plant,Plants"),
            base64_drawing: String(e.slice(22)),
          },
          {
            headers: {
              Authorization: process.env.REACT_APP_TOKEN,
            },
          }
        )
        .then((response) => {
          //   let fruit = ["Fruits","Fruit",Plant,Plants"]
          //   console.log(response);
          //   if(response.data===)
        })
        .catch((error) => {
          console.log(error);
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
            유령에게 먹을 것을 그려주자
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TutorialNumberGif src={GifGhostFeed} alt="GifGhostFeed" />
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
            배고픈 유령에게 먹을 것을 그려주세요.
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
            싫어하는 것을 주면, 어떤 일이 일어날까요?
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
            그리기를 끝내면 완료 버튼을 눌러주세요.
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
        <SketchTitle>배고픈 유령에게 맛있는 과일을 그려주세요.</SketchTitle>
        <CanvasTool getImgHandler={getImgHandler} />
      </SketchWriteContainer>
    </>
  );
};

export default GhostfeedMl;
