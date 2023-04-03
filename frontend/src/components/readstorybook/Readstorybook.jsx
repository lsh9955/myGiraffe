import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import StoryPage from "./StoryPage";
import axios from "axios";
import { useSelector } from "react-redux";

/**읽고 있는 동화책 컴포넌트 */
const Readstorybook = ({ handleCapture }) => {
  const [pageInfo, setPageInfo] = useState([1]);
  const [nowPage, setNowPage] = useState(1);
  const [allContent, setAllContent] = useState([]);
  const userSeq = useSelector((state) => state.user);

  const pageChangeHandler = (e) => {
    setNowPage(e);
    //이야기를 진행하는 경우(순방향)
    if (pageInfo.indexOf(e) === -1) {
      setPageInfo([...pageInfo, e]);
      //이야기를 되돌아가는 경우(역방향)
    } else {
      let beforepageInfo = pageInfo.slice(0, pageInfo.length - 1);
      setPageInfo(beforepageInfo);
      setNowPage(beforepageInfo[beforepageInfo.length - 1]);
    }
  };

  useEffect(() => {
    const res = async () => {
      const book = await axios.get(
        "https://j8b201.p.ssafy.io/api/books/pages/1",
        {
          headers: {
            Authorization: userSeq.accessToken,
          },
        }
      );
      const bookContent = book;
      console.log(bookContent.data.content);
      setAllContent(bookContent.data.content);
    };
    res();
  }, []);
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
              />
            )}
          </>
        );
      })}
    </>
  );
};

export default Readstorybook;
