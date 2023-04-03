import React, { useEffect } from "react";
//mui아이콘 중 방향 버튼 아이콘을 가져오기
import one from "./1.jpg";
import * as R from "./ReadstorybookStyle";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import BookText from "./BookText";
const Flip = ({
  isRendered,
  allContent,
  nowPage,
  picHandler,
  lost,
  pageChangeHandler,
  handleCapture,
}) => {
  console.log(allContent.filter((v) => v.pageId == nowPage));
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
              <R.EndButton onClick={() => {}}>이야기 끝내기</R.EndButton>
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
