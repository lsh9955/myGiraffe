import React, { useState, useEffect } from "react";
import { Box, Typography, Modal } from "@mui/material/";
import { ButtonOne } from "components/common/button/ButtonStyle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "3px solid #ff8f5c",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const RspStart = ({ startHandler, isLoad }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    startHandler();
  };
  useEffect(() => {
    if (isLoad) {
      setOpen(true);
    }
  }, [isLoad]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            가위, 바위, 보 게임 설명
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            카메라를 정면으로 바라보고 손을 들어 가위, 바위, 보 동작을 취한다.
          </Typography>
          <ButtonOne onClick={handleClose}>확인</ButtonOne>
        </Box>
      </Modal>
    </div>
  );
};

export default RspStart;
