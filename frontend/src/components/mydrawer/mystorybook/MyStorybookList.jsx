import React, { useEffect, useState } from "react";
/**내 동화책 리스트 컴포넌트 */
import axios from "axios";
import Slider from "react-slick";
import {
  MydrawerListContainer,
  Mydraweritemimage,
} from "components/mydrawer/MydrawerStyle";

// Slick Carousel 스타일을 가져옵니다.
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import bookimage1 from "assets/bookimage/1.png";

const MyStorybookList = () => {
  // axios로 내 동화책 데이터 불러오기
  useEffect(() => {
    const fetchBooks = async () => {
      await axios
        .get(
          "https://port-0-nodebook-1b5xkk2fldhlzqkd.gksl2.cloudtype.app/mybook"
        )
        .then((response) => {
          console.log(response.data);
          setDatas(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchBooks();
  }, []);

  // 내 동화책 item 컴포넌트로 내려줄 데이터
  const [datas, setDatas] = useState([]);

  // Slick Carousel 설정을 정의
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
  };

  return (
    <div>
      <Slider {...settings}>
        {datas.map((data) => (
          <div key={data.id}>
            <img src={bookimage1} alt="bookimage1" />
            <h3>{data.title}</h3>
            <p>{data.date}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MyStorybookList;
