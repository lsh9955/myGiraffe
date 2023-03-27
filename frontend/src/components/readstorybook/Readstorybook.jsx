import React, { useState, useEffect } from "react";
import "./test.css";
import * as R from "./ReadstorybookStyle";
import one from "./1.jpg";

/**읽고 있는 동화책 컴포넌트 */
const Readstorybook = () => {
  const [pageInfo, SetPageInfo] = useState(["a", "b", "c"]);
  return (
    <R.Book>
      {pageInfo.map((page, pageIdx) => {
        return (
          <R.PageInput
            type="checkbox"
            id={"c" + (pageIdx + 1)}
            targetLabel={"p" + (pageIdx + 1)}
            pageIdx={pageIdx + 1}
          />
        );
      })}
      {/* 커버 페이지 -어차피 다음장을 가져 와야함*/}
      <R.Cover>
        <img src={one} alt="Cover" />
        <div>
          안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세
        </div>
      </R.Cover>
      <R.FlipBook className="flip-book">
        <R.Filp id="p1" pageIdx="1">
          <R.Back>
            <img src={one} alt="Cover" />
            <label htmlFor="c1">이전 페이지</label>
          </R.Back>
          <R.Front>
            <img src={one} alt="Cover" />
            <div>
              안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세
            </div>
            <R.NextBtn htmlFor="c1">다음 페이지</R.NextBtn>
          </R.Front>
        </R.Filp>
        <R.Filp id="p2" pageIdx="2">
          <R.Front>
            <img src={one} alt="Cover" />
            <div>
              안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세
            </div>
            <R.NextBtn htmlFor="c2">다음 페이지</R.NextBtn>
          </R.Front>
        </R.Filp>
      </R.FlipBook>
    </R.Book>
  );
};

export default Readstorybook;
