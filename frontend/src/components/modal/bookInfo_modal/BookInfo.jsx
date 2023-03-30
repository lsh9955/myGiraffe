import React, { useState, useEffect } from "react";
import { Box, Typography, Modal } from "@mui/material/";
import axios from "axios";
import * as B from "./bookInfoStyle";
import { useHistory } from "react-router-dom";
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
  fontSize: "18px",
  p: 2,
  borderRadius: 10,
};
// 책 정보 모달창 (결제 필요시 결제버튼 포함)
const BookInfo = ({ title, isOpen, openCheck }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const history = useHistory();
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    }
  }, [isOpen]);
  useEffect(() => {
    openCheck(open);
  }, [open]);

  useEffect(() => {
    const getBookInfo = async () => {
      await axios
        .get(
          "https://port-0-nodebook-1b5xkk2fldhlzqkd.gksl2.cloudtype.app/sketchbook"
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getBookInfo();
  }, []);
  const handleBookOpen = () => {
    handleClose();
    history.push("/bookdetail/1");
  };
  return (
    <div>
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
            {data && data[0].title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <B.BookInfoImg src={data && data[0].img} alt="책 소개 이미지" />
          </Box>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 1,
              mb: 1,
              fontSize: 22,
              display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
            }}
          >
            동화 줄거리
          </Typography>
          소녀가 나와서 성냥개비를 강매함
          <Typography
            sx={{
              mt: 1,
              mb: 1,
              fontSize: 22,
              display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
            }}
          >
            인터렉션 요소
          </Typography>
          가위바위보 게임 그림 그리기ff가위바위보 게임 그림 그리기ff가위바위보
          게임 그림 그리기ff가위바위보 게임 그림 그리기ff가위바위보 게임 그림
          그리기ff가위바위보 게임 그림 그리기ff가위바위보 게임 그림
          그리기ff가위바위보 게임 그림 그리기ff가위바위보 게임 그림
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 1,
              mb: 1,
              fontSize: 22,
              display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
            }}
          >
            필요한 열쇠 개수
          </Typography>
          430개
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <B.Buttonone
              onClick={() => {
                //들어갈 책의 idx
                handleBookOpen(2);
              }}
            >
              책 읽기
            </B.Buttonone>
            <B.Buttontwo onClick={handleClose}>취소</B.Buttontwo>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BookInfo;
