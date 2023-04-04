import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import * as R from "./ReadstorybookStyle";

import ClassifierMl from "utils/mlEvent/ClassifierMl";
import Flip from "./Flip";
import FindPasswordMl from "utils/mlEvent/FindPasswordMl";
import RspPage from "pages/RspPage";
import GhostfeedMl from "utils/mlEvent/GhostfeedMl";
//화살표 아이콘
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
/**읽고 있는 동화책 컴포넌트 (현재 페이지, 페이지 바뀔 때 이벤트, 모든 페이지 정보, 현재까지 읽은 페이지 정보)*/
const StoryPage = ({
  nowPage,
  pageChangeHandler,
  allContent,
  alreadyReadPage,
  handleCapture,
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [firPageflip, setFirPageflip] = useState(false);
  const [secPageflip, setSecPageflip] = useState(false);
  const [nowPageInfo, setNowPageInfo] = useState(allContent[nowPage - 1]);
  //그림 그리는 이벤트 페이지, 숫자 그리는 이벤트 페이지를 여는 경우 설정
  const [eventPicPageOpen, setEventPicPageOpen] = useState(false);
  const [eventNumPageOpen, setEventNumPageOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState(null);
  //!현재 이미지가 로딩되지 않기 때문에, 이미지를 제외하고 설정
  //잃어버린 물건
  const [lost, setLost] = useState(null);
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
    if (isRendered) {
      handleCapture();
      console.log("캡쳐했어요");
    }
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

  //경우의 수가 한 가지일때, 다음 페이지로 넘어가기
  const nextOnlyPage = () => {
    setSecPageflip(true);
  };
  //잃어버린 물건 state에 저장
  const lostHandler = (item) => {
    setLost(item);
  };
  //이벤트 페이지 분류
  const eventPage = [3, 9, 21, 24];
  return (
    <R.Book>
      {/* 소중한 그림 그려주기 */}
      {nowPage === 3 && (
        <ClassifierMl nextOnlyPage={nextOnlyPage} lostHandler={lostHandler} />
      )}
      {/* 자물쇠 비밀번호 그려주기 */}
      {nowPage === 9 && (
        <FindPasswordMl pageChangeHandler={pageChangeHandler} />
      )}
      {/* 열쇠 찾기 */}
      {nowPage === 11 && (
        <R.FindKey>
          <button
            onClick={() => {
              pageChangeHandler(13);
            }}
          >
            책상서랍
          </button>
          <button
            onClick={() => {
              pageChangeHandler(14);
            }}
          >
            청소도구
          </button>
          <button
            onClick={() => {
              pageChangeHandler(15);
            }}
          >
            창문
          </button>
        </R.FindKey>
      )}
      {/* 유령 찾기 */}
      {nowPage === 14 && (
        <>
          <R.TrashClick>
            <ArrowDownwardIcon sx={{ color: "white", fontSize: "500%" }} />
            <div>눌러보세요!</div>
          </R.TrashClick>
          {/* 쓰레기봉투 */}
          <R.TrashBox
            onClick={() => {
              pageChangeHandler(17);
            }}
          ></R.TrashBox>
        </>
      )}
      {/* 유령과 가위바위보 */}
      {nowPage === 21 && <RspPage pageChangeHandler={pageChangeHandler} />}
      {/* 유령이 먹을 그림 그려주기 */}
      {nowPage === 24 && (
        <GhostfeedMl nextOnlyPage={nextOnlyPage} lostHandler={lostHandler} />
      )}
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
      {/* 이벤트 페이지가 아닌 일반 이야기 페이지 */}
      {!eventPicPageOpen && eventPage.indexOf(nowPage) === -1 && (
        <Flip
          nowPage={nowPage}
          allContent={allContent}
          isRendered={isRendered}
          picHandler={picHandler}
          lost={lost}
          pageChangeHandler={pageChangeHandler}
        />
      )}
    </R.Book>
  );
};

export default StoryPage;
