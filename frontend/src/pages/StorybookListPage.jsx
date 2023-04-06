import React, { useEffect, useState } from "react";
import axios from "axios";
import Storybookmain from "components/storybookmain/Storybookmain";
import BookInfo from "components/modal/bookInfo_modal/BookInfo";
import { useSelector } from "react-redux";

/**읽을 동화 선택 페이지 */
const StorybookListPage = () => {
  const [bookData, setBookData] = useState(null);
  const userSeq = useSelector((state) => state.user.accessToken);
  useEffect(() => {
    const sketchBooks = async () => {
      await axios
        .get("https://j8b201.p.ssafy.io/api/books/scenarios", {
          headers: {
            Authorization: userSeq,
          },
        })
        .then((response) => {
          setBookData(response.data.content);
        })
        .catch((error) => {
          alert("오류가 발생했습니다. 다시 시도해 주세요");
        });
    };
    sketchBooks();
  }, []);

  return (
    <>
      <Storybookmain bookData={bookData} />
    </>
  );
};

export default StorybookListPage;
