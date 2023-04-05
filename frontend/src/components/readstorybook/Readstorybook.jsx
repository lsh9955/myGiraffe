import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import StoryPage from "./StoryPage";
import axios from "axios";
import { useSelector } from "react-redux";

/**읽고 있는 동화책 컴포넌트 */
const Readstorybook = ({
  handleCapture,
  getPageImg,
  handleCapTxt,
  handleCapImg,
  pageChangeHandler,
  nowPage,
  allContent,
  pageInfo,
  saveBookId,
}) => {
  return (
    <>
      {pageInfo.map((k) => {
        return (
          <>
            {k === nowPage && (
              <StoryPage
                handleCapture={handleCapture}
                nowPage={nowPage}
                pageChangeHandler={pageChangeHandler}
                allContent={allContent}
                alreadyReadPage={pageInfo}
                saveBookId={saveBookId}
              />
            )}
          </>
        );
      })}
    </>
  );
};

export default Readstorybook;
