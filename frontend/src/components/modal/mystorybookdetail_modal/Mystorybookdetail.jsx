import React, { useState, useEffect } from "react";
import { Box, Typography, Modal } from "@mui/material/";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import * as B from "./MystorybookdetailStyle";
import { ImgP } from "components/mydrawer/MydrawerStyle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "82vw",
  height: "80vh",
  bgcolor: "background.paper",

  boxShadow: 24,
  outline: "none",
  fontSize: "18px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};
/**내 동화책 컴포넌트 */
const Mystorybookdetail = ({ isOpen, openCheck, clickPage, userDraw }) => {
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {clickPage && (
          <img
            src={JSON.parse(clickPage.objUserData).pageImg}
            style={{ width: "40vw", height: "80vh" }}
          />
        )}

        {userDraw && (
          <img
            src={userDraw}
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              zIndex: "4",
              width: "40vw",
              height: "80vh",
            }}
          />
        )}

        <div
          style={{
            width: "2vw",
            height: "80vh",
          }}
        ></div>
        {clickPage && (
          <div
            style={{
              width: "40vw",
              height: "80vh",
              display: "flex",
              alignItems: "center",
              fontSize: "120%",
              whiteSpace: "pre-wrap",
            }}
          >
            {JSON.parse(clickPage.objUserData).pageTxt}
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default Mystorybookdetail;
