import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LogoutIcon from "@mui/icons-material/Logout";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import defaultUserImg from "../../assets/icon/defaultUserImg.svg";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";

import * as S from "./SidebarStyle";
/**사이드바 컴포넌트 */
const Sidebar = () => {
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
          src={defaultUserImg}
          alt="기본유저이미지"
          style={{ height: "10vh", marginTop: "5vh" }}
        />
      </S.Container>

      <S.MarginContainer></S.MarginContainer>
      <S.UserName>유저 이름</S.UserName>
      <S.KeyBackground>
        <button>
          <p>
            5<span>열쇠</span>
          </p>
        </button>
      </S.KeyBackground>

      <List>
        <Divider sx={{ bgcolor: "#8BD0FC", height: 2, mt: "1vh" }} />
        {["내 책장", "충전하기", "로그아웃"].map((text, index) => (
          <>
            <Link to="/abcde">
              <ListItem key={text}>
                <ListItemButton fontSize={66}>
                  {text === "내 책장" && (
                    <AutoStoriesIcon
                      sx={{ width: 80, height: 30, color: "#FF8F5C" }}
                    />
                  )}
                  {text === "충전하기" && (
                    <VpnKeyIcon
                      sx={{ width: 80, height: 30, color: "#FF8F5C" }}
                    />
                  )}
                  {text === "로그아웃" && (
                    <LogoutIcon
                      sx={{ width: 80, height: 30, color: "#FF8F5C" }}
                    />
                  )}
                  <ListItemText
                    disableTypography={true}
                    sx={{ maxWidth: 70, fontSize: 20 }}
                    primary={text}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider sx={{ bgcolor: "#8BD0FC", height: 2 }} />
          </>
        ))}
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
    </div>
  );
};

export default Sidebar;
