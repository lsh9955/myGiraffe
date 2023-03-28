import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import StoryPage from "./StoryPage";
import axios from "axios";
/**읽고 있는 동화책 컴포넌트 */
const Readstorybook = () => {
  const [pageInfo, SetPageInfo] = useState([1]);
  const [nowPage, setNowPage] = useState(1);
  const pageChangeHandler = (e) => {
    setNowPage(e);
    if (pageInfo.indexOf(e) === -1) {
      SetPageInfo([...pageInfo, e]);
    }
  };

  useEffect(() => {
    const res = async () => {
      const books = await axios.get(
        "https://port-0-nodebook-1b5xkk2fldhlzqkd.gksl2.cloudtype.app/diary"
      );
      console.log(books);
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
                nowPage={nowPage}
                pageChangeHandler={pageChangeHandler}
              />
            )}
          </>
        );
      })}
    </>
  );
};

export default Readstorybook;
