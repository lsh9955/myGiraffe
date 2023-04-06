import Readstorybook from "components/readstorybook/Readstorybook";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import html2canvas from "html2canvas";
import axios from "axios";

import { useSelector } from "react-redux";
import ghostHeartHandshake from "assets/icon/ghostHeartHandshake.gif";
/**동화책을 보는 페이지 */
const StorybookDetailPage = () => {
  const captureRef = useRef(null);
  const [getPageImg, setGetPageImg] = useState(null);
  const [capImg, setCapImg] = useState(null);
  const [capTxt, setCapTxt] = useState(null);
  const [pageInfo, setPageInfo] = useState([1]);
  const [nowPage, setNowPage] = useState(1);
  const [allContent, setAllContent] = useState([]);
  const [saveBookId, setSaveBookId] = useState(null);
  const userSeq = useSelector((state) => state.user);
  const thisTxt = useSelector((state) => state.book.lostItem);
  const drawSeq = useSelector((state) => state.draw);

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
          console.log(response);
          console.log("내 서재에 책 생성 완료");
        });
    };
    res();
  }, []);

  const handleCapImg = (e) => {
    setCapImg(e);
  };
  const handleCapTxt = (e) => {
    setCapTxt(e);
  };
  const pageChangeHandler = (e) => {
    //페이지 이동 전 페이지를 이미지로 저장
    console.log("페이지 이동합니다");
    const savePage = async () => {
      // formdata에 전송할 데이터 담기
      //이벤트 페이지가 아닌 경우에만 진행

      if (!allContent.filter((v) => v.pageId == nowPage)[0].objData.isEvent) {
        const formData = new FormData();

        // 파일

        console.log("####################################################");
        console.log(allContent.filter((v) => v.pageId == nowPage));
        console.log("####################################################");
        let nowPageContent = allContent.filter((v) => v.pageId == nowPage)[0];
        let nowPageTxt = allContent.filter((v) => v.pageId == nowPage)[0]
          .script;
        if (thisTxt) {
          nowPageTxt = nowPageTxt.replaceAll("(태깅 결과)", thisTxt);
        }

        const changeJSON = JSON.stringify({
          bookId: saveBookId,
          pageNo: nowPageContent.pageNo,
          objUserData: {
            // 사용자가 본 페이지 순서, 해당 페이지의 이미지, 해당 페이지의 텍스트, 해당 페이지에 유저 그림이 들어가는 경우
            pageIdx: pageInfo.length,
            pageImg: nowPageContent.bgImgUrl,
            pageTxt: nowPageTxt,
            userDraw:
              //유저가 그린 이미지가 들어가야 하는 경우
              nowPageContent.pageId === 35 || nowPageContent.pageId === 36
                ? drawSeq.drawImg
                : null,
          },
        });
        const blob = new Blob([changeJSON], { type: "application/json" });

        formData.append("myBookPage", blob);

        console.log("###########################################", formData);
        axios
          .post("https://j8b201.p.ssafy.io/api/members/pages", formData, {
            headers: {
              "Content-Type": "multipart/form-data",

              Authorization: userSeq.accessToken,
            },
          })
          .then((res) => {
            console.log(res);
            console.log("성공했어요 제발!!!!!!!!!!!!!!!!!!!!!!!!!");
            //페이지 저장 후 페이지 이동
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
          })
          .catch((err) => console.log(err));
      } else {
        // 이벤트 페이지인 경우
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
      }
    };
    savePage();
  };

  return (
    <>
      <div>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Readstorybook
            pageChangeHandler={pageChangeHandler}
            getPageImg={getPageImg}
            handleCapTxt={handleCapTxt}
            handleCapImg={handleCapImg}
            nowPage={nowPage}
            allContent={allContent}
            pageInfo={pageInfo}
            saveBookId={saveBookId}
          />
        </div>
      </div>
    </>
  );
};

export default StorybookDetailPage;
