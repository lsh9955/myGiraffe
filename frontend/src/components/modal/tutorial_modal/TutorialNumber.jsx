import React, { useState, useEffect } from "react";
import { Box, Typography, Modal } from "@mui/material/";
import { Buttontwo } from "components/common/button/ButtonStyle";
import { TutorialNumberGif } from "components/modal/tutorial_modal/TutorialStyle";
import GifNumber from "assets/image/tutorialnumber.gif";

/**튜토리얼 컴포넌트 */

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

const TutorialNumber = () => {
  const [open, setOpen] = useState(true);
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
            유령이 낸 문제를 보고 답을
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
            펜으로 적어보세요.
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
            답을 적고, 완료 버튼을 눌러주세요.
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
    </div>
  );
};

export default TutorialNumber;
