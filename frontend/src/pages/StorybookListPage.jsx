import React, { useEffect, useState } from "react";
import axios from "axios";
import Storybookmain from "components/storybookmain/Storybookmain";
/**읽을 동화 선택 페이지 */
const StorybookListPage = () => {
  const [bookData, setBookData] = useState(null);
  useEffect(() => {
    const sketchBooks = async () => {
      await axios
        .get(
          "https://port-0-nodebook-1b5xkk2fldhlzqkd.gksl2.cloudtype.app/sketchbook",
          {
            headers: {
              Authorization: process.env.REACT_APP_TOKEN,
            },
          }
        )
        .then((response) => {
          setBookData(response.data);
        })
        .catch((error) => {
          console.log(error);
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
