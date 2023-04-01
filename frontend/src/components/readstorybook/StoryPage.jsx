import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import * as R from "./ReadstorybookStyle";

import ClassifierMl from "utils/mlEvent/ClassifierMl";
import Flip from "./Flip";
import FindPasswordMl from "utils/mlEvent/FindPasswordMl";

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

  //경우의 수가 한 가지일떄, 다음 페이지로 넘어가기
  const nextOnlyPage = () => {
    setSecPageflip(true);
  };
  const choiceNextPage = (e) => {};
  return (
    <R.Book>
      {/* 소중한 그림 그려주기 */}
      {eventPicPageOpen && nowPage === 3 && (
        <ClassifierMl nextOnlyPage={nextOnlyPage} />
      )}
      {/* 자물쇠 비밀번호 그려주기 */}
      {eventPicPageOpen && nowPage === 9 && (
        <FindPasswordMl choiceNextPage={choiceNextPage} />
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
      {!eventPicPageOpen && (
        <Flip
          nowPage={nowPage}
          allContent={allContent}
          isRendered={isRendered}
          picHandler={picHandler}
        />
      )}
    </R.Book>
  );
};

export default StoryPage;
