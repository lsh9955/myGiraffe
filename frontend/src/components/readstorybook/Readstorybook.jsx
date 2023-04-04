import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import StoryPage from "./StoryPage";
import axios from "axios";
import { useSelector } from "react-redux";

/**읽고 있는 동화책 컴포넌트 */
const Readstorybook = ({ handleCapture, getPageImg }) => {
  const [pageInfo, setPageInfo] = useState([1]);
  const [nowPage, setNowPage] = useState(1);
  const [allContent, setAllContent] = useState([]);
  const [saveBookId, setSaveBookId] = useState(null);
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
  //책 내용 가져오기
  useEffect(() => {
    const res = async () => {
      console.log(userSeq.accessToken);
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

      axios
        .post(
          "https://j8b201.p.ssafy.io/api/members/books",
          {
            // 현재는 동화책이 하나밖에 없음
            scenarioId: 1,
          },
          {
            headers: {
              Authorization: userSeq.accessToken,
            },
          }
        )
        .then((response) => {
          let saveBookId = response.data.content;
          saveBookId = response.data.content.slice(
            saveBookId.indexOf("=") + 1,
            saveBookId.length - 1
          );
          setSaveBookId(saveBookId);
          console.log("내 서재에 책 생성 완료");
        });
    };
    res();
  }, []);

  //base64를 파일 객체로 만들기
  function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  const savePage = async (saveBookId) => {
    // const pagePayload = {
    //   myBookPage: { bookId: saveBookId, pageNo: nowPage },
    //   bgImg: "",
    //   interUserImg: "",
    // };

    // formdata에 전송할 데이터 담기
    const formData = new FormData();

    urltoFile(getPageImg, "bgImg.png", "image/png").then(function (file) {
      // 파일
      formData.append("bgImg", file);
      formData.append("interUserImg", file);
      console.log(file);
    });
    formData.append("myBookPage", { bookId: saveBookId, pageNo: nowPage });
    console.log(formData);
    axios
      .post("https://j8b201.p.ssafy.io/api/members/pages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",

          "Content-Type": "application/json",
          Authorization: userSeq.accessToken,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    savePage(saveBookId);
  }, [nowPage]);

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
