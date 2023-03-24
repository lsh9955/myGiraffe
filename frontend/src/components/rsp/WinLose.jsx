import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
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
/**타이머 후 가위바위보 결과 판단 함수 */
const WinLose = ({
  ghostHandFi,
  userHand,
  timer,
  resetTimer,
  endGameHandler,
}) => {
  const [open, setOpen] = useState(false);
  const [winLose, setWinLose] = useState(null);
  const history = useHistory();
  const handleClose = () => {
    setOpen(false);
    if (winLose === "비겼습니다!") {
      //다시 타이머 초기화
      resetTimer();
    } else {
      endGameHandler();
      //임시로 메인으로 돌아가게 함. 책 만든 이후엔 다음 페이지로 이동할 수 있도록 조정
      // history.push("/");
    }
  };
  useEffect(() => {
    if (timer === 0) {
      if (ghostHandFi === "rock" && userHand === "rock") {
        setWinLose("비겼습니다!");
      } else if (ghostHandFi === "scissors" && userHand === "scissors") {
        setWinLose("비겼습니다!");
      } else if (ghostHandFi === "paper" && userHand === "paper") {
        setWinLose("비겼습니다!");
      } else if (ghostHandFi === "rock" && userHand === "scissors") {
        setWinLose("졌습니다!");
      } else if (ghostHandFi === "scissors" && userHand === "paper") {
        setWinLose("졌습니다!");
      } else if (ghostHandFi === "paper" && userHand === "rock") {
        setWinLose("졌습니다!");
      } else if (ghostHandFi === "rock" && userHand === "paper") {
        setWinLose("이겼습니다!");
      } else if (ghostHandFi === "scissors" && userHand === "rock") {
        setWinLose("이겼습니다!");
      } else if (ghostHandFi === "paper" && userHand === "scissors") {
        setWinLose("이겼습니다!");
      }
      setOpen(true);
    }
  }, [timer]);

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
            {winLose}
          </Typography>
          {winLose === "비겼습니다!" && (
            <ButtonOne onClick={handleClose}>다시하기</ButtonOne>
          )}
          {winLose === "이겼습니다!" && (
            <ButtonOne onClick={handleClose}>확인</ButtonOne>
          )}
          {winLose === "졌습니다!" && (
            <ButtonOne onClick={handleClose}>확인</ButtonOne>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default WinLose;
