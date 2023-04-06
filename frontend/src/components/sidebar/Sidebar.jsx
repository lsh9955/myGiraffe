import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Modal,
} from "@mui/material/";
import { useSelector, useDispatch } from "react-redux";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LogoutIcon from "@mui/icons-material/Logout";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import defaultUserImg from "../../assets/icon/defaultUserImg.svg";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import * as S from "./SidebarStyle";
import { login } from "store/AuthSlice";
import { logout } from "store/AuthSlice";
import { Buttontwo } from "components/common/button/ButtonStyle";
import axios from "axios";
/**사이드바 컴포넌트 */

// 결제 모달 스타일
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
  borderRadius: 10,
};

const Sidebar = () => {
  // dispatch 변수
  const dispatch = useDispatch();
  const history = useHistory();
  // 모달창 오픈할 때 필요한 변수
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setKeyCount(0);
    setTotalPayment(0);
  };
  const userSeq = useSelector((state) => state.user);
  // 열쇠 개수
  const [keyCount, setKeyCount] = useState(0);
  // 총 결제 금액
  const [totalPayment, setTotalPayment] = useState(0);

  // 열쇠 증가 함수
  const keyUp = () => {
    setKeyCount(keyCount + 1);
    setTotalPayment((keyCount + 1) * 1000);
  };

  // 열쇠 감소 함수
  const keyDown = () => {
    setKeyCount(keyCount - 1);
    if (keyCount <= 0) {
      setKeyCount(0);
    }
    setTotalPayment((keyCount - 1) * 1000);
    if (totalPayment <= 0) {
      setTotalPayment(0);
    }
  };

  // 결제 모듈
  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init(process.env.REACT_APP_KAKAOPAY_IMP); // 사용자 코드
    const data = {
      pg: "kakaopay.{TC0ONETIME}", // PG사 (필수항목)
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호(고유항목)
      name: "내가 기린 그림 열쇠 구매", // 주문명 (필수항목)
      amount: totalPayment, // 금액 (필수항목)
      buyer_postcode: "123-456",
      m_redirect_url: "{모바일에서 결제 완료 후 리디렉션 될 URL}",
    };
    IMP.request_pay(data, callback);
  };

  // 결제 모듈 성공시 axios patch로 열쇠 개수 변경
  const callback = (response) => {
    const { success, error_msg } = response;
    if (success) {
      alert("결제해주셔서 감사합니다!");
      handleClose();
      // 추후 dispatch에 추가할 것

      dispatch(
        login({
          accessToken: userSeq.accessToken,
          userId: userSeq.userId,
          userName: userSeq.userName,
          profileImg: userSeq.profileImg,
          coinAmount: userSeq.coinAmount + keyCount,
        })
      );
      axios
        .patch(
          "https://j8b201.p.ssafy.io/api/members",
          { keyAmount: userSeq.coinAmount + keyCount },
          {
            headers: {
              Authorization: userSeq.accessToken,
            },
          }
        )
        .then((response) => {})
        .catch((error) => {
          alert("오류가 발생했습니다. 다시 시도해 주세요");
        });
    } else {
      if (error_msg && error_msg.includes("결제요청금액이 0원입니다.")) {
        alert("결제요청금액이 0원입니다.");
      } else if (error_msg) {
        alert(`${error_msg}`);
      }
    }
  };

  // 사이드바 관련 변수
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <S.Container>
        <S.UserImg
          src={userSeq?.profileImg}
          alt="기본유저이미지"
          style={{ height: "10vh", marginTop: "5vh" }}
        />
      </S.Container>

      <S.MarginContainer></S.MarginContainer>
      <S.UserName>{userSeq?.userName}</S.UserName>
      <S.KeyBackground>
        <button>
          <p>
            {userSeq?.coinAmount}
            <span>열쇠</span>
          </p>
        </button>
      </S.KeyBackground>

      <List>
        <Divider sx={{ bgcolor: "#8BD0FC", height: 2, mt: "1vh" }} />

        <Link to="/mydrawer">
          <ListItem>
            <ListItemButton fontSize={66}>
              <AutoStoriesIcon
                sx={{ width: 80, height: 30, color: "#FF8F5C" }}
              />
              <ListItemText
                disableTypography={true}
                sx={{ maxWidth: 70, fontSize: 20 }}
                primary="내 책장"
              />
            </ListItemButton>
          </ListItem>
        </Link>

        <Divider sx={{ bgcolor: "#8BD0FC", height: 2 }} />

        <ListItem onClick={handleOpen}>
          <ListItemButton fontSize={66}>
            <VpnKeyIcon sx={{ width: 80, height: 30, color: "#FF8F5C" }} />
            <ListItemText
              disableTypography={true}
              sx={{ maxWidth: 70, fontSize: 20 }}
              primary="충전하기"
            />
          </ListItemButton>
        </ListItem>

        <Divider sx={{ bgcolor: "#8BD0FC", height: 2 }} />

        <ListItem>
          <ListItemButton
            fontSize={66}
            onClick={() => {
              dispatch(logout());
              history.push("/login");
            }}
          >
            <LogoutIcon sx={{ width: 80, height: 30, color: "#FF8F5C" }} />
            <ListItemText
              disableTypography={true}
              sx={{ maxWidth: 70, fontSize: 20 }}
              primary="로그아웃"
            />
          </ListItemButton>
        </ListItem>

        <Divider sx={{ bgcolor: "#8BD0FC", height: 2 }} />
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuSharpIcon
              sx={{ ml: "2vw", fontSize: "6vh", color: "#FF8F5C" }}
            />
          </Button>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{
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
            열쇠 충전하기
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              mb: 2,
            }}
          >
            <VpnKeyIcon sx={{ fontSize: 60, color: "#FF8F5C", mr: 2, ml: 2 }} />
            <Typography sx={{ mr: 2, ml: 2, fontSize: 30 }}>
              {keyCount} 개
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mr: 2,
                ml: 2,
              }}
            >
              <KeyboardDoubleArrowUpIcon
                onClick={keyUp}
                sx={{
                  fontSize: 40,
                  color: "#FCE76C",
                  "&:hover": { color: "#FFC700", cursor: "pointer" },
                }}
              />
              <KeyboardDoubleArrowDownIcon
                onClick={keyDown}
                sx={{
                  fontSize: 40,
                  color: "#8BD0FC",
                  "&:hover": { color: "#009CFF", cursor: "pointer" },
                }}
              />
            </Box>
          </Box>
          <Divider sx={{ height: "1px", backgroundColor: "#FF8F5C" }} />
          <Typography
            sx={{
              m: 2,
              fontSize: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            id="modal-modal-description"
          >
            열쇠 1개당 1,000원으로 결제됩니다.
          </Typography>
          <Divider sx={{ height: "1px", backgroundColor: "#FF8F5C" }} />
          <Typography
            sx={{
              m: 2,
              fontSize: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            결제 금액 {totalPayment} 원
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Buttontwo onClick={onClickPayment}>결제하기</Buttontwo>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Sidebar;
