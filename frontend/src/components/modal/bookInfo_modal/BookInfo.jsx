import React, { useState, useEffect } from "react";
import { Box, Typography, Modal } from "@mui/material/";
import axios from "axios";
import * as B from "./bookInfoStyle";
import { useHistory } from "react-router-dom";
import PayModal from "../pay_modal/PayModal";
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
const BookInfo = ({ data, isOpen, openCheck, userBook, buyHandler }) => {
  const [open, setOpen] = useState(false);
  const [isBuy, setIsBuy] = useState(false);

  const history = useHistory();
  const handleClose = () => {
    setOpen(false);
    setIsBuy(false);
  };
  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    }
  }, [isOpen]);
  useEffect(() => {
    openCheck(open);
  }, [open]);

  const handleBookOpen = () => {
    handleClose();
    history.push(`/bookdetail/${data.scenarioId}`);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {!isBuy ? (
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
              {data?.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <B.BookInfoImg src={data?.introImgUrl} alt="책 소개 이미지" />
            </Box>
            <Typography
              id="modal-modal-description"
              sx={{
                mt: 2,
                mb: 1,
                ml: 2,
                fontSize: 22,
                display: "flex",
                whiteSpace: "pre-wrap",
                //   justifyContent: "center",
                //   alignItems: "center",
              }}
            >
              동화 줄거리
            </Typography>
            <p
              style={{
                whiteSpace: "pre-wrap",
                paddingLeft: "20px",
                paddingRight: "20px",
                fontSize: "18px",
              }}
            >
              {data?.introScript}
            </p>

            <Typography
              sx={{
                mt: 1,
                mb: 1,
                ml: 2,
                fontSize: 22,
                display: "flex",
                //   justifyContent: "center",
                //   alignItems: "center",
              }}
            >
              인터렉션 요소
            </Typography>
            <p
              style={{
                whiteSpace: "pre-wrap",
                paddingLeft: "20px",
                fontSize: "18px",
              }}
            >
              {data?.interContents}
            </p>

            <Typography
              id="modal-modal-description"
              sx={{
                mt: 1,
                mb: 1,
                ml: 2,
                fontSize: 22,
                display: "flex",
                //   justifyContent: "center",
                //   alignItems: "center",
              }}
            >
              필요한 열쇠 개수
            </Typography>
            <p style={{ paddingLeft: "20px", fontSize: "24px" }}>
              {data?.price}
            </p>
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
                  if (userBook && userBook.indexOf(data.scenarioId) === -1) {
                    setIsBuy(true);
                  } else {
                    handleBookOpen(data.scenarioId);
                  }
                }}
              >
                책 읽기
              </B.Buttonone>
              <B.Buttontwo onClick={handleClose}>취소</B.Buttontwo>
            </Box>
          </Box>
        ) : (
          <div>
            <PayModal
              data={data}
              buyHandler={buyHandler}
              handleClose={handleClose}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BookInfo;
