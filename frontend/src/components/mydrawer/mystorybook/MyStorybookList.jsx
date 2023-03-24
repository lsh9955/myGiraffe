import React, { useEffect, useState } from "react";
/**내 동화책 리스트 컴포넌트 */
import axios from "axios";
import MyStorybookItem from "./MyStorybookItem";
import { MydrawerListContainer } from "components/mydrawer/MydrawerStyle";

const MyStorybookList = () => {
  // axios로 내 동화책 데이터 불러오기
  useEffect(() => {
    axios
      .get(
        "https://port-0-nodebook-1b5xkk2fldhlzqkd.gksl2.cloudtype.app/mybook"
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 내 동화책 item 컴포넌트로 내려줄 데이터
  const [data, setData] = useState([]);

  return (
    <MydrawerListContainer>
      {data.map((item) => (
        <MyStorybookItem key={item.id} data={item} />
      ))}
    </MydrawerListContainer>
  );
};

export default MyStorybookList;
