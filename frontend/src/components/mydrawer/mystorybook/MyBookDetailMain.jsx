import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const MyBookDetailMain = () => {
  const userSeq = useSelector((state) => state.user);
  const [bookPageArr, setBookPageArr] = useState([]);
  const params = useParams();
  useEffect(() => {
    console.log(params.mybookId);
    axios
      .get(
        `http://j8b201.p.ssafy.io:9011/api/members/books/${params.mybookId}`,
        {
          headers: {
            Authorization: userSeq.accessToken,
          },
        }
      )
      .then((res) => {
        setBookPageArr(res.data.content);
        console.log(res);
      });
  }, []);
  return (
    <>
      <div>{bookPageArr.bookName}</div>
      <div>
        {bookPageArr.myBookPageList.map((v, i) => {
          return <img src={JSON.parse(v.objUserData).pageImg} />;
        })}
      </div>
    </>
  );
};

export default MyBookDetailMain;
