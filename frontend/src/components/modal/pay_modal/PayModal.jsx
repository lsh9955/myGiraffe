import React, { useState, useEffect } from "react";
import { Box, Typography, Modal } from "@mui/material/";
import * as B from "./PayModalStyle";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
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

/**책 구입 컴포넌트*/
const PayModal = ({ data, handleClose, buyHandler }) => {
  const userSeq = useSelector((state) => state.user);
  // dispatch 변수
  const dispatch = useDispatch();

  const handleBuy = () => {
    const getUserInfo = async () => {
      const infoRes = await axios.get(
        "http://j8b201.p.ssafy.io:9011/api/members",
        {
          headers: {
            Accept: "*/*",
            Authorization: userSeq.accessToken,
          },
        }
      );
      const nowUserCoin = infoRes.data.content.coinAmount;
      //사용자에게 시나리오 추가
      axios
        .post(
          "http://j8b201.p.ssafy.io:9011/api/members",
          { scenarioId: data.scenarioId },
          {
            headers: {
              Authorization: userSeq.accessToken,
            },
          }
        )
        //시나리오 추가가 성공하면 해당 개수만큼의 열쇠를 제거함
        .then((res) => {
          axios
            .patch(
              "https://j8b201.p.ssafy.io/api/members",
              { keyAmount: nowUserCoin - data.price },
              {
                headers: {
                  Authorization: userSeq.accessToken,
                },
              }
            )
            .then((response) => {
              alert("결제가 완료되었습니다!");
              buyHandler();
              handleClose();
              // 열쇠 개수 dispatch로 기록해줌
              dispatch(
                login({
                  accessToken: userSeq.accessToken,
                  userId: userSeq.userId,
                  userName: userSeq.userName,
                  profileImg: userSeq.profileImg,
                  coinAmount: nowUserCoin - data.price,
                })
              );
            })
            .catch((err) => alert("오류가 발생했어요. 다시 결제해주세요"));
        })
        .catch((err) => alert("에러가 발생했어요. 다시 시도해 주세요"));
    };
    getUserInfo();
  };

  return (
    <Box sx={style}>
      <Typography
        sx={{
          mt: 3,
          mb: 1,
          fontSize: 30,
          color: "#000000",
          // color: "#FF8F5C",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "pre-wrap",
        }}
        id="modal-modal-title"
        variant="h6"
        component="h2"
      >
        {data.title} 은(는) {data.price}
        열쇠가 필요합니다.
      </Typography>
      <Typography
        sx={{
          mt: 1,
          mb: 4,
          fontSize: 30,
          color: "#000000",
          // color: "#FF8F5C",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "pre-wrap",
        }}
        id="modal-modal-title"
        variant="h6"
        component="h2"
      >
        구입하시겠어요?
      </Typography>
      <B.ModalFooter>
        {userSeq.coinAmount < data.price ? (
          <B.Buttonone style={{ backgroundColor: "gray" }}>
            열쇠가 부족해요
          </B.Buttonone>
        ) : (
          <B.Buttonone onClick={handleBuy}>구입</B.Buttonone>
        )}

        <B.Buttontwo onClick={handleClose}>취소</B.Buttontwo>
      </B.ModalFooter>
    </Box>
  );
};

export default PayModal;
