import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import * as R from "./ReadstorybookStyle";
import one from "./1.jpg";

//mui아이콘 중 방향 버튼 아이콘을 가져오기
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

/**읽고 있는 동화책 컴포넌트 */
const StoryPage = ({ nowPage, pageChangeHandler }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [firPageflip, setFirPageflip] = useState(false);
  const [secPageflip, setSecPageflip] = useState(false);

  //첫 페이지 넘김 여부
  const checkRef1 = useRef(null);
  //두 번째 페이지 넘김 여부
  const checkRef2 = useRef(null);
  //처음 화면이 랜더링 될 때, 두 페이지가 같이 있는데 한 페이지는 뒤로 넘어간 상태여야 함
  //해당 페이지가 넘어간 것을 useEffect로 처리하면 처음 랜더링이 될 때 페이지가 넘어가는 애니메이션이 실행됨
  //이를 방지하기 위해 useLayoutEffect를 사용해 랜더링 이전에 페이지가 넘어간 것으로 처리함
  useLayoutEffect(() => {
    checkRef1.current.checked = true;
  }, []);
  useEffect(() => {
    setIsRendered(true);
  }, []);
  //배열에 현재 페이지 수를 적어놓고, 추가될 때 마다 전체를 다시 리랜더링하는 방식은?

  useEffect(() => {
    if (firPageflip || secPageflip) {
      setTimeout(() => {
        pageChangeHandler(nowPage + 1);
      }, 700);
    }
  }, [firPageflip, secPageflip]);

  return (
    <R.Book>
      <R.PageInput
        type="checkbox"
        ref={checkRef1}
        id={"c1"}
        targetLabel={"p1"}
        pageIdx={1}
        onChange={(e) => {
          setFirPageflip(!firPageflip);
        }}
      />
      <R.PageInput
        type="checkbox"
        ref={checkRef2}
        id={"c2"}
        targetLabel={"p2"}
        pageIdx={2}
        onChange={(e) => {
          setSecPageflip(!secPageflip);
        }}
      />
      {/* 커버 페이지 -이전 페이지와 동일*/}
      <R.Cover>
        <img src={one} alt="Cover" />
        <div>
          안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세안녕하세
        </div>
      </R.Cover>

      <R.FlipBook className="flip-book">
        <R.Filp id="p1" pageIdx="1" isRendered={isRendered}>
          {/* 첫번째장 앞면 -이전 페이지와 동일*/}
          <R.Front>
            <label htmlFor="c1">
              <KeyboardArrowRightIcon />
            </label>
          </R.Front>
          {/* 첫번째장 뒷면 -현재 랜더링된 페이지와 동일*/}
          <R.Back>
            <img src={one} alt="Cover" />
            <div>
              반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다
            </div>
            <label htmlFor="c1">
              <KeyboardArrowLeftIcon />
            </label>
          </R.Back>
        </R.Filp>
        <R.Filp id="p2" pageIdx="2" isRendered={isRendered}>
          {/* 두번째장 뒷면 -다음 페이지와 동일*/}
          <R.Back>
            <img src={one} alt="Cover" />
            <div>
              반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다
            </div>
            <label htmlFor="c2">
              <KeyboardArrowLeftIcon />
            </label>
          </R.Back>
          {/* 두번째장 앞면 -현재 랜더링된 페이지와 동일*/}
          <R.Front>
            <img src={one} alt="Cover" />
            <div>
              반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다
            </div>
            <label htmlFor="c2">
              <KeyboardArrowRightIcon />
            </label>
          </R.Front>
        </R.Filp>
      </R.FlipBook>
    </R.Book>
  );
};

export default StoryPage;
