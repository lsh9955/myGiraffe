import React, { useState, useEffect } from "react";
import { Box, Typography, Modal } from "@mui/material/";
import * as B from "./RepaintStyle";

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
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  p: 2,
  borderRadius: 10,
};
// 그림 인식 오류 시 다시 요청 모달창
const Repaint = ({ isOpen, openCheck }) => {
  const [open, setOpen] = useState(false);
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
  return (
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
            whiteSpace: "pre-wrap",
          }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          어떤 그림인지 모르겠어요 ㅠㅠ 다시 그려줄래요?
        </Typography>
        <B.Buttontwo onClick={handleClose}>다시 그리기</B.Buttontwo>
      </Box>
    </Modal>
  );
};

export default Repaint;
