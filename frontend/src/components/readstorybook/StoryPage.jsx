import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import * as R from "./ReadstorybookStyle";
import one from "./1.jpg";

//mui아이콘 중 방향 버튼 아이콘을 가져오기
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CanvasTool from "./canvas/CanvasTool";

/**읽고 있는 동화책 컴포넌트 (현재 페이지, 페이지 바뀔 때 이벤트, 모든 페이지 정보, 현재까지 읽은 페이지 정보)*/
const StoryPage = ({
  nowPage,
  pageChangeHandler,
  allContent,
  alreadyReadPage,
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [firPageflip, setFirPageflip] = useState(false);
  const [secPageflip, setSecPageflip] = useState(false);
  const [nowPageInfo, setNowPageInfo] = useState(allContent[nowPage - 1]);
  //그림 그리는 이벤트 페이지, 숫자 그리는 이벤트 페이지를 여는 경우 설정
  const [eventPicPageOpen, setEventPicPageOpen] = useState(false);
  const [eventNumPageOpen, setEventNumPageOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState(null);
  //!현재 이미지가 로딩되지 않기 떄문에, 이미지를 제외하고 설정

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
  //배열에 현재 페이지 수를 적어놓고, 추가될 때 마다 페이지 전체의 컴포넌트가 바뀜

  //다음 불러올 페이지를 찾는 함수
  const findBeforePage = (targetPage) => {
    for (let i = 0; i < allContent.length; i++) {
      if (allContent[i].pageNo === targetPage) {
        return allContent[i].pageId;
      }
    }
  };

  useEffect(() => {
    if (firPageflip) {
      setTimeout(() => {
        if (alreadyReadPage.length <= 1) {
          alert("첫 페이지에요");
        } else {
          pageChangeHandler(alreadyReadPage[alreadyReadPage.length - 1]);
        }
      }, 500);
    } else if (secPageflip) {
      setTimeout(() => {
        if (allContent[nowPage - 1].nextPage.length === 1) {
          pageChangeHandler(
            findBeforePage(allContent[nowPage - 1].nextPage[0])
          );
        }
      }, 500);
    }
  }, [firPageflip, secPageflip]);

  //그림 페이지 열고 닫음
  const picHandler = (titleInput) => {
    setEventPicPageOpen(!eventPicPageOpen);
    setEventTitle(titleInput);
  };
  return (
    <R.Book>
      {eventPicPageOpen && <CanvasTool title={eventTitle} />}
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
            <div></div>
            <label htmlFor="c1">
              <KeyboardArrowRightIcon />
            </label>
          </R.Front>
          {/* 첫번째장 뒷면 -현재 랜더링된 페이지와 동일*/}

          <R.Back>
            <img src={one} alt="Cover" />
            {allContent[nowPage - 1]?.objData.isEvent && (
              <button
                onClick={() => {
                  picHandler(
                    "잃어버린 물건을 찾아주세요! \n(힌트: 축구공, 닌텐도 스위치, 로봇 장난감, 인형, 일기장, 스마트폰 중에 하나랍니다!)"
                  );
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
            <img src={one} alt="Cover" />
            <div>
              반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다
            </div>
            <label htmlFor="c3">
              <KeyboardArrowLeftIcon />
            </label>
          </R.Back>
        </R.Filp>
      </R.FlipBook>
    </R.Book>
  );
};

export default StoryPage;
