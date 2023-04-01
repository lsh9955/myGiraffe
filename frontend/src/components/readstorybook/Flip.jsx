import React, { useEffect } from "react";
//mui아이콘 중 방향 버튼 아이콘을 가져오기
import one from "./1.jpg";
import * as R from "./ReadstorybookStyle";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const Flip = ({ isRendered, allContent, nowPage, picHandler }) => {
  useEffect(() => {
    console.log(allContent[nowPage]);
  }, []);

  return (
    <>
      {/* 커버 페이지 -이전 페이지와 동일*/}
      <R.Cover>
        <div></div>
      </R.Cover>
      <R.FlipBook className="flip-book">
        <R.Filp id="p1" pageIdx="1" isRendered={isRendered}>
          {/* 첫번째장 앞면 -이전 페이지와 동일*/}
          <R.Front>
            <div></div>
            <label htmlFor="c1">
              <KeyboardArrowRightIcon />
            </label>
          </R.Front>
          {/* 첫번째장 뒷면 -현재 랜더링된 페이지와 동일*/}

          <R.Back>
            <img src={allContent[nowPage - 1]?.bgImgUrl} alt="Cover" />
            {allContent[nowPage - 1]?.objData.isEvent && (
              <button
                onClick={() => {
                  picHandler();
                }}
              >
                그림 그려주기
              </button>
            )}
            <div>{allContent[nowPage - 1]?.script}</div>
            {allContent[nowPage - 1]?.pageId != 1 &&
              !allContent[nowPage - 1]?.objData.isEvent && (
                <label htmlFor="c1">
                  <KeyboardArrowLeftIcon />
                </label>
              )}
          </R.Back>
        </R.Filp>
        <R.Filp id="p2" pageIdx="2" isRendered={isRendered}>
          {/* 두번째장 뒷면 -다음 페이지와 동일*/}
          <R.Back>
            <img src={allContent[nowPage - 1]?.bgImgUrl} alt="Cover" />
            <div></div>

            <label htmlFor="c2">
              <KeyboardArrowLeftIcon />
            </label>
          </R.Back>
          {/* 두번째장 앞면 -현재 랜더링된 페이지와 동일*/}
          <R.Front>
            <div>{allContent[nowPage - 1]?.script}</div>
            {allContent[nowPage - 1]?.nextPage.length == 1 &&
              !allContent[nowPage - 1]?.objData.isEvent && (
                <label htmlFor="c2">
                  <KeyboardArrowRightIcon />
                </label>
              )}
          </R.Front>
        </R.Filp>
        <R.Filp id="p3" pageIdx="3" isRendered={isRendered}>
          {/* 첫번째장 앞면 -이전 페이지와 동일*/}
          <R.Front>
            <label htmlFor="c3">
              <KeyboardArrowRightIcon />
            </label>
          </R.Front>
          {/* 첫번째장 뒷면 -현재 랜더링된 페이지와 동일*/}
          <R.Back>
            <img src={allContent[nowPage - 1]?.bgImgUrl} alt="Cover" />
            <div></div>
            <label htmlFor="c3">
              <KeyboardArrowLeftIcon />
            </label>
          </R.Back>
        </R.Filp>
      </R.FlipBook>
    </>
  );
};

export default Flip;
