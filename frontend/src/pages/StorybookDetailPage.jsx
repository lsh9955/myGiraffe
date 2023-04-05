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

  const handleCapture = () => {
    html2canvas(captureRef.current, { allowTaint: true, useCORS: true }).then(
      (canvas) => {
        const dataUrl = canvas.toDataURL();
        setGetPageImg(dataUrl);
        console.log(dataUrl);
        // 이미지 데이터를 사용하여 다른 작업을 수행합니다.
      }
    );
  };
  const handleCapImg = (e) => {
    setCapImg(e);
  };
  const handleCapTxt = (e) => {
    setCapTxt(e);
  };
  const pageChangeHandler = (e) => {
    //페이지 이동 전 페이지를 이미지로 저장
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

    const savePage = async () => {
      // formdata에 전송할 데이터 담기
      const formData = new FormData();

      urltoFile(getPageImg, "bgImg.png", "image/png").then(function (file) {
        // 파일
        formData.append("bgImg", file);
        formData.append("interUserImg", file);
        console.log("####################################################");
        console.log(allContent.filter((v) => v.pageId == nowPage));
        console.log("####################################################");

        const changeJSON = JSON.stringify({
          bookId: saveBookId,
          pageNo: allContent.filter((v) => v.pageId == nowPage)[0].pageNo,
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
      });
    };
    savePage();
  };

  return (
    <>
      <div>
        <button onClick={handleCapture}>캡쳐하기</button>
        <div
          ref={captureRef}
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              backgroundImage: `${
                allContent?.filter((v) => v.pageId == nowPage)[0]?.bgImgUrl
              }`,
              width: "100%",
              height: "100%",
            }}
          ></div>

          {/* <div style={{ width: "50%", height: "100%" }}>
            {allContent?.filter((v) => v.pageId == nowPage)[0]?.script}
          </div> */}
        </div>

        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            zIndex: 3,
            position: "absolute",
            top: "0px",
            left: "0px",
          }}
        >
          <Readstorybook
            pageChangeHandler={pageChangeHandler}
            handleCapture={handleCapture}
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
