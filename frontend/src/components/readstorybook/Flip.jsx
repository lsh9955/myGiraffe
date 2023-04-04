import React, { useEffect, useRef } from "react";
//mui아이콘 중 방향 버튼 아이콘을 가져오기
import one from "./1.jpg";
import axios from "axios";
import * as R from "./ReadstorybookStyle";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import BookText from "./BookText";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import html2canvas from "html2canvas";
const Flip = ({
  isRendered,
  allContent,
  nowPage,
  picHandler,
  lost,
  pageChangeHandler,

  saveBookId,
}) => {
  const captureRef = useRef(null);
  const handleCapture = () => {
    html2canvas(captureRef.current).then((canvas) => {
      const dataUrl = canvas.toDataURL();

      console.log(dataUrl);
      // 이미지 데이터를 사용하여 다른 작업을 수행합니다.
    });
  };

  const history = useHistory();
  const userSeq = useSelector((state) => state.user);
  const bookSaveHandler = () => {
    axios
      .put(
        "https://j8b201.p.ssafy.io/api/members/books",
        {
          bookId: saveBookId,
          bookName: "테스트99",
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
    <>
      {/* 커버 페이지 -이전 페이지와 동일*/}
      <R.Cover>
        <div></div>
      </R.Cover>
      <R.FlipBook className="flip-book">
        <R.Flip id="p1" pageIdx="1" isRendered={isRendered}>
          {/* 첫번째장 앞면 -이전 페이지와 동일*/}
          <R.Front>
            <div></div>
            <label htmlFor="c1">
              <KeyboardArrowRightIcon />
            </label>
          </R.Front>
          {/* 첫번째장 뒷면 -현재 랜더링된 페이지와 동일*/}

          <R.Back>
            <img
              src={allContent?.filter((v) => v.pageId == nowPage)[0]?.bgImgUrl}
              alt="Cover"
            />
            {allContent?.filter((v) => v.pageId == nowPage)[0]?.objData
              .isEvent && (
              <button
                onClick={() => {
                  picHandler();
                }}
              >
                그림 그려주기
              </button>
            )}
            <div>
              {allContent?.filter((v) => v.pageId == nowPage)[0]?.script}
            </div>
            {allContent?.filter((v) => v.pageId == nowPage)[0]?.pageId != 1 &&
              !allContent?.filter((v) => v.pageId == nowPage)[0]?.objData
                .isEvent && (
                <label htmlFor="c1">
                  <KeyboardArrowLeftIcon />
                </label>
              )}
          </R.Back>
        </R.Flip>
        <R.Flip id="p2" pageIdx="2" isRendered={isRendered}>
          {/* 두번째장 뒷면 -다음 페이지와 동일*/}
          <R.Back>
            <img
              src={allContent?.filter((v) => v.pageId == nowPage)[0]?.bgImgUrl}
              alt="Cover"
            />

            <label htmlFor="c2">
              <KeyboardArrowLeftIcon />
            </label>
          </R.Back>
          {/* 두번째장 앞면 -현재 랜더링된 페이지와 동일*/}
          <R.Front>
            {/* 이야기 끝날 때 저장하기 - 수정중 */}
            {allContent?.filter((v) => v.pageId == nowPage)[0]?.nextPage
              .length === 0 && (
              <R.EndButton onClick={bookSaveHandler}>이야기 끝내기</R.EndButton>
            )}
            <div>
              <BookText
                text={allContent?.filter((v) => v.pageId == nowPage)[0]?.script}
                lost={lost}
              />
            </div>
            {allContent?.filter((v) => v.pageId == nowPage)[0]?.nextPage
              .length == 1 &&
              !allContent?.filter((v) => v.pageId == nowPage)[0]?.objData
                .isEvent && (
                <label htmlFor="c2">
                  <KeyboardArrowRightIcon />
                </label>
              )}
          </R.Front>
        </R.Flip>
        <R.Flip id="p3" pageIdx="3" isRendered={isRendered}>
          {/* 첫번째장 앞면 -이전 페이지와 동일*/}
          <R.Front>
            <label htmlFor="c3">
              <KeyboardArrowRightIcon />
            </label>
          </R.Front>
          {/* 첫번째장 뒷면 -현재 랜더링된 페이지와 동일*/}
          <R.Back>
            <img
              src={allContent?.filter((v) => v.pageId == nowPage)[0]?.bgImgUrl}
              alt="Cover"
            />
            <div></div>
            <label htmlFor="c3">
              <KeyboardArrowLeftIcon />
            </label>
          </R.Back>
        </R.Flip>
      </R.FlipBook>
    </>
  );
};

export default Flip;
