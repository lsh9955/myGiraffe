import React, { useState, useEffect } from "react";
import { Box, Typography, Modal } from "@mui/material/";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import * as B from "./StoryendStyle";
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
  alignItems: "center",
  p: 2,
  borderRadius: 10,
};
/**동화 완료 후 저장 */
const Storyend = ({ isOpen, openCheck, saveBookId }) => {
  const [open, setOpen] = useState(false);
  const [bookName, setBookName] = useState("");
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

  const history = useHistory();
  const userSeq = useSelector((state) => state.user);
  const bookNameHandler = (e) => {
    setBookName(e.target.value);
  };
  const bookSaveHandler = () => {
    axios
      .put(
        "https://j8b201.p.ssafy.io/api/members/books",
        {
          bookId: saveBookId,
          bookName: bookName,
        },
        {
          headers: {
            // "Content-Type": "application/json; multipart/form-data;",

            Authorization: userSeq.accessToken,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log("책을 정상적으로 저장하였습니다");
        history.push("/");
      });
  };

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
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            whiteSpace: "pre-wrap",
          }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          책 이름을 정해주세요!
        </Typography>
        <input
          onChange={bookNameHandler}
          style={{ width: "80%", fontSize: "300%", border: "1px solid black" }}
        ></input>
        <B.Buttontwo onClick={bookSaveHandler}>저장하기</B.Buttontwo>
      </Box>
    </Modal>
  );
};

export default Storyend;
