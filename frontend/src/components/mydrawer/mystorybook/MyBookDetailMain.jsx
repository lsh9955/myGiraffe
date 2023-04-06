import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import * as M from "./MyBookDetailMainStyle";
import ReactFreezeframe from "react-freezeframe";
import "./MybookHover.css";
import Mystorybookdetail from "components/modal/mystorybookdetail_modal/Mystorybookdetail";
const MyBookDetailMain = () => {
  const userSeq = useSelector((state) => state.user);
  const [bookPageArr, setBookPageArr] = useState([]);
  const params = useParams();
  const [endOpen, setEndOpen] = useState(false);
  const [clickPage, setClickPage] = useState(null);
  const [userDraw, setUserDraw] = useState(null);
  const openCheck = (e) => {
    setEndOpen(e);
  };

  useEffect(() => {
    axios
      .get(`https://j8b201.p.ssafy.io/api/members/books/${params.mybookId}`, {
        headers: {
          Authorization: userSeq.accessToken,
        },
      })
      .then((res) => {
        setBookPageArr(res.data.content);
      });
  }, []);
  const clickPic = (e) => {
    setClickPage(e);
    setEndOpen(true);
    setUserDraw(JSON.parse(e.objUserData).userDraw);
  };
  return (
    <>
      <Mystorybookdetail
        openCheck={openCheck}
        isOpen={endOpen}
        clickPage={clickPage}
        userDraw={userDraw}
      />
      <M.BookName></M.BookName>
      <M.BookPageImg>
        {bookPageArr?.myBookPageList?.map((v, i) => {
          return JSON.parse(v.objUserData).userDraw ? (
            <M.GifBox
              onClick={() => {
                clickPic(v);
              }}
            >
              <img
                src={JSON.parse(v.objUserData).userDraw}
                style={{
                  position: "absolute",

                  zIndex: "4",
                  width: "20vw",
                  height: "20vw",
                }}
              />
              <ReactFreezeframe src={JSON.parse(v.objUserData).pageImg} />
            </M.GifBox>
          ) : (
            <M.GifBox
              onClick={() => {
                clickPic(v);
              }}
            >
              <ReactFreezeframe src={JSON.parse(v.objUserData).pageImg} />
            </M.GifBox>
          );
        })}
      </M.BookPageImg>
    </>
  );
};

export default MyBookDetailMain;
